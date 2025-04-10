import React, { useState, useRef } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mic, SendHorizonal, Volume2 } from 'lucide-react'

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "farmer", text: "Hello, anyone there?" },
    { sender: "agent", text: "Yes, how can I help you today?" }
  ])
  const [input, setInput] = useState("")
  const recognitionRef = useRef(null)

  const sendMessage = () => {
    if (input.trim() === "") return
    setMessages([...messages, { sender: "farmer", text: input }])
    setInput("")
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

  return (
    <div className='w-full h-full p-2'>
      <Card className="h-full flex flex-col border shadow-xl">
      <CardHeader className="sticky top-0 z-10 bg-white border-b shadow-sm rounded-t-lg">
  <div className="flex items-center justify-center w-full">
    <CardTitle className="text-xl font-semibold text-green-700">
      Chat Title
    </CardTitle>
  </div>
</CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-2 px-2 py-1">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] flex items-center gap-2 px-4 py-2 rounded-xl text-white ${
                msg.sender === "farmer"
                  ? "bg-green-600 self-end ml-auto"
                  : "bg-gray-700 self-start mr-auto"
              }`}
            >
              <span>{msg.text}</span>
              {msg.sender === "agent" && (
                <button
                  onClick={() => speak(msg.text)}
                  className="text-white hover:text-yellow-400"
                  title="Listen"
                >
                  <Volume2 size={18} />
                </button>
              )}
            </div>
          ))}
        </CardContent>

        <CardFooter className="flex gap-2 px-4 py-3 border-t">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1"
          />
          <Button onClick={handleMicClick} variant="outline" title="Speak">
            <Mic size={18} />
          </Button>
          <Button onClick={sendMessage} title="Send">
            <SendHorizonal size={18} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Chat
