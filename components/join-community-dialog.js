'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function JoinCommunityDialog({ open, onOpenChange }) {
  const [code, setCode] = useState(['', '', '', '', '', '', '', ''])

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return // Prevent pasting multiple characters
    const newCode = [...code]
    newCode[index] = value.toUpperCase()
    setCode(newCode)

    // Move to next input if current one is filled
    if (value && index < 7) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      if (nextInput) (nextInput).focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      if (prevInput) (prevInput).focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const joinCode = code.join('')
    console.log('Joining community with code:', joinCode)
    // Here you would typically send the code to your backend
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Join Community</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="code-0">Community Code</Label>
            <div className="flex justify-center space-x-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 h-12 text-center text-2xl border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  pattern="[a-zA-Z0-9]"
                  required
                />
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={code.some(digit => !digit)}>
              Join Community
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

