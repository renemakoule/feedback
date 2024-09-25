'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle, Loader2, MessageSquare } from "lucide-react"
import ShineBorder from './magicui/shine-border'
import { useTheme } from "next-themes";

export default function FeedbackCard() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [feedback, setFeedback] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate API call with random success/failure
    try {
      await new Promise((resolve, reject) => 
        setTimeout(() => Math.random() > 0.5 ? resolve(null) : reject(), 1500)
      )
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const resetForm = () => {
    setName('')
    setEmail('')
    setFeedback('')
    setStatus('idle')
  }
  const theme = useTheme();

  return (
    
    <Card className="w-full max-w-md mx-auto overflow-hidden mt-10">
        <ShineBorder
      className="w-full"
      color={theme.theme === "dark" ? "red" : "black"}
    >
      <div className="absolute w-full inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-yellow-700  opacity-50" />
      <CardHeader className="relative z-10">
        <CardTitle className="text-2xl font-semibold text-center text-white">Receive Feedback</CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 w-full">
        {status === 'idle' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name (optional)
              </Label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/10 border-white/20 placeholder-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email (optional)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 placeholder-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback" className="text-sm font-medium">
                Your Feedback
              </Label>
              <Textarea
                id="feedback"
                placeholder="Your feedback matters to us..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[100px] bg-white/10 border-white/20 placeholder-white/50"
                required
              />
            </div>
          </form>
        )}
        {status === 'loading' && (
          <div className="text-center text-white">
            <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-semibold mb-2">Sending Feedback...</h3>
            <p>Please wait while we process your feedback.</p>
          </div>
        )}
        {status === 'success' && (
          <div className="text-center text-white">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
            <p>We appreciate your feedback and will review it shortly.</p>
          </div>
        )}
        {status === 'error' && (
          <div className="text-center text-white">
            <AlertCircle className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Oops!</h3>
            <p>Something went wrong. Please try again later.</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="relative z-10 flex flex-col w-full">
        {status === 'idle' && (
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-black text-white hover:bg-blue-50 hover:text-black transition-colors duration-300"
          >
            Send Feedback
          </Button>
        )}
        {(status === 'success' || status === 'error') && (
          <Button
            onClick={resetForm}
            className="w-full bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-300"
          >
            Close
          </Button>
        )}
        <div className="text-[13px] mt-4 text-[#3f0858] text-center font-semibold cursor-pointer z-10">Powered by Minato.ai</div>
      </CardFooter>
      </ShineBorder>
    </Card>
    
  )
}
