import React from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Settings, Plus, HelpCircle, Lightbulb, History } from "lucide-react"

const Sidebar = () => {
  return (
<aside className="w-64 h-full bg-white shadow-md border-r hidden md:flex flex-col p-4">
{/* New Chat */}
      <Button variant="outline" className="flex gap-2 mb-4">
        <Plus className="w-4 h-4" />
        New Chat
      </Button>

      {/* Chat History */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
          <History className="w-4 h-4" />
          Previous Chats
        </h2>
        <ScrollArea className="h-40 pr-2">
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="hover:text-green-700 cursor-pointer">Wheat Issue - Apr 7</li>
            <li className="hover:text-green-700 cursor-pointer">Tomato Yellowing - Apr 6</li>
            <li className="hover:text-green-700 cursor-pointer">Fertilizer Tips - Apr 4</li>
          </ul>
        </ScrollArea>
      </div>

      <Separator />

      {/* Ask Tips */}
      <div className="my-6">
        <h2 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          Ask Tips
        </h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="hover:text-green-700 cursor-pointer">Why is my plant yellow?</li>
          <li className="hover:text-green-700 cursor-pointer">Which fertilizer is best now?</li>
          <li className="hover:text-green-700 cursor-pointer">How to protect from pests?</li>
        </ul>
      </div>

      <Separator />

      {/* Settings and Help */}
      <div className="mt-auto space-y-3">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2">
          <HelpCircle className="w-4 h-4" />
          Help
        </Button>
      </div>
    </aside>
  )
}

export default Sidebar
