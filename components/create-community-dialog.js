'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function CreateCommunityDialog({ open, onOpenChange }) {
  const [formData, setFormData] = useState({
    communityName: '',
    organizationName: '',
    tokenName: '',
    tokenSymbol: '',
    newMemberReward: '',
    referralReward: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Create Community</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="communityName">Community Name</Label>
              <Input
                id="communityName"
                name="communityName"
                value={formData.organizationName}
                onChange={handleInputChange}
                placeholder="Enter community name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organizationName">Affiliated Organization</Label>
              <Input
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
                placeholder="Enter organization name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tokenName">Token Name</Label>
              <Input
                id="tokenName"
                name="tokenName"
                value={formData.tokenName}
                onChange={handleInputChange}
                placeholder="Enter token name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tokenSymbol">Token Symbol</Label>
              <Input
                id="tokenSymbol"
                name="tokenSymbol"
                value={formData.tokenSymbol}
                onChange={handleInputChange}
                placeholder="Enter token symbol"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newMemberReward">New Member Reward</Label>
              <Input
                id="newMemberReward"
                name="newMemberReward"
                type="number"
                value={formData.newMemberReward}
                onChange={handleInputChange}
                placeholder="Enter new member reward"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="referralReward">Referral Reward</Label>
              <Input
                id="referralReward"
                name="referralReward"
                type="number"
                value={formData.referralReward}
                onChange={handleInputChange}
                placeholder="Enter referral reward"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">Create Community</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

