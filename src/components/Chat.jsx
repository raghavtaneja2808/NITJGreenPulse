import React, { useState, useRef } from 'react'
import {
  Card, CardContent, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mic, SendHorizonal, Volume2, Image as ImageIcon } from 'lucide-react'

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [chatTitle, setChatTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const recognitionRef = useRef(null)
  const fileInputRef = useRef(null)

  const sendMessage = async () => {
    if (input.trim() === "") return

    const newMessage = { sender: "farmer", text: input }
    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("http://localhost:5000/msg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages })
      })

      const data = await res.json()

      if (data.title && !chatTitle) setChatTitle(data.title)
      setMessages(prev => [...prev, { sender: "agent", text: data.reply }])
    } catch (err) {
      console.error("Error sending message:", err)
    } finally {
      setLoading(false)
    }
  }

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utterance)
  }

  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported')
      return
    }

    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = 'en-IN'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
    }

    recognition.start()
    recognitionRef.current = recognition
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      const url = URL.createObjectURL(file)
      const imageMessage = {
        sender: "farmer",
        image: url
      }
      setMessages(prev => [...prev, imageMessage])
    })
  }

  return (
    <div className='w-full h-full p-4'>
      <Card className="h-full flex flex-col border shadow-2xl">
        <CardHeader className="sticky top-0 z-10 bg-white border-b shadow-md rounded-t-lg">
          <div className="flex items-center justify-center w-full">
            <CardTitle className="text-xl font-bold text-green-600">
              Let's Talk  - - - powered by Green Pulse
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto space-y-3 px-0 py-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] px-4 py-2 transition-all bg-gray-200 ${
                msg.sender === "farmer" ? "self-end ml-auto" : "self-start mr-auto"
              }`}
            >
              {msg.text && (
                <div className="flex items-center gap-2">
                  <span className="break-words">{msg.text}</span>
                  {msg.sender === "agent" && (
                    <button
                      onClick={() => speak(msg.text)}
                      className="text-gray-600 hover:text-yellow-500"
                      title="Listen"
                    >
                      <Volume2 size={18} />
                    </button>
                  )}
                </div>
              )}
              {msg.image && (
                <img
                  src={msg.image}
                  alt={`upload-${index}`}
                  className="w-32 h-32 object-cover mt-2 rounded-lg border"
                />
              )}
            </div>
          ))}

          {loading && (
            <div className="text-sm text-gray-500 px-4">Agent is typing...</div>
          )}
        </CardContent>

        <CardFooter className="flex gap-2 px-4 py-3 border-t bg-white">
          <Button onClick={handleMicClick} variant="outline" title="Speak">
            <Mic size={18} />
          </Button>
          <Button variant="outline" title="Upload image" onClick={() => fileInputRef.current.click()}>
            <ImageIcon size={18} />
          </Button>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1"
          />
          <Button onClick={sendMessage} title="Send">
            <SendHorizonal size={18} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Chat
