"use client"

import { useEffect, useState } from "react"
import { isAddress } from "ethers"
import { useSmartWill } from "@/context/SmartWillContext"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScrollText, AlertCircle, Info, Clock, GraduationCap, BookOpen, Loader2, Wallet } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

export default function CreateSimpleWill() {
  const [formData, setFormData] = useState({
    beneficiary: "",
    assets: "",
    amount: "",
    claimWaitTime: "",
  })
  const [validationError, setValidationError] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [confirmationChecks, setConfirmationChecks] = useState({
    termsAccepted: false,
    understandInactivity: false,
    understandFees: false,
    confirmBeneficiary: false,
    createBackup: false,
    allowDistribution: false,
    understandLock: false,
    acceptRisks: false
  })

  const { 
    account, 
    balance,
    connectWallet, 
    createNormalWill, 
    loading, 
    error, 
    isConnected 
  } = useSmartWill()

  useEffect(() => {
    if (!isConnected) {
      connectWallet()
    }
  }, [isConnected, connectWallet])

  // Loading Card Component
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary stroke-[3px]" /> {/* Increased size and stroke for visual impact */}
              <p className="text-lg font-medium text-center">
                Switching your network to EDU Chain Testnet and connecting EDU Legacy with it. Please accept the connection request in your wallet.
              </p>
              <p className="text-sm text-muted-foreground text-center">
                This process may take a few seconds. Please be patient.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Wallet Info Component
  const WalletInfo = () => {
    if (!account) return null
    
    return (
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Wallet className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Connected Wallet</p>
                <p className="font-medium">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className="font-medium">{Number(balance).toFixed(4)} EDU</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const validateForm = () => {
    if (formData.assets.length < 50) {
      setValidationError("Description must be at least 50 characters long")
      return false
    }
    if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
      setValidationError("Initial deposit amount is required")
      return false
    }
    if (!isAddress(formData.beneficiary)) {
      setValidationError("Invalid beneficiary address")
      return false
    }

    if (!formData.claimWaitTime || Number.parseInt(formData.claimWaitTime) < 60) {
      setValidationError("Claim wait time must be at least 60 seconds")
      return false
    }

    if (!Object.values(confirmationChecks).every(Boolean)) {
      setValidationError("Please confirm all conditions before proceeding")
      return false
    }
    setValidationError("")
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isConnected) {
      await connectWallet()
      return
    }
    if (!validateForm()) return

    try {
      const success = await createNormalWill(
        formData.beneficiary,
        formData.assets,
        formData.amount,
        formData.claimWaitTime
      )
      
      if (success) {
        setFormData({ beneficiary: "", assets: "", amount: "", claimWaitTime: "" })
        setOpenDialog(false)
        setConfirmationChecks(Object.keys(confirmationChecks).reduce((acc, key) => ({...acc, [key]: false}), {}))
      }
    } catch (err) {
      console.error("Error submitting will:", err)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setValidationError("")
  }

  const handleCheckboxChange = (name) => {
    setConfirmationChecks(prev => ({...prev, [name]: !prev[name]}))
  }

  const ConfirmationCheckboxes = () => (
    <div className="space-y-4">
      <div className="flex items-start space-x-3">
        <Checkbox
          id="termsAccepted"
          checked={confirmationChecks.termsAccepted}
          onCheckedChange={() => handleCheckboxChange("termsAccepted")}
        />
        <Label htmlFor="termsAccepted" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          I accept the terms and conditions of the Educational Smart Will service
        </Label>
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox
          id="understandInactivity"
          checked={confirmationChecks.understandInactivity}
          onCheckedChange={() => handleCheckboxChange("understandInactivity")}
        />
        <Label htmlFor="understandInactivity" className="text-sm leading-none">
          I understand that my academic beneficiary can only claim after 10 years of account inactivity
        </Label>
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox
          id="understandFees"
          checked={confirmationChecks.understandFees}
          onCheckedChange={() => handleCheckboxChange("understandFees")}
        />
        <Label htmlFor="understandFees" className="text-sm leading-none">
          I understand that a 2% service fee in EDU tokens will support the Open Campus ecosystem
        </Label>
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox
          id="confirmBeneficiary"
          checked={confirmationChecks.confirmBeneficiary}
          onCheckedChange={() => handleCheckboxChange("confirmBeneficiary")}
        />
        <Label htmlFor="confirmBeneficiary" className="text-sm leading-none">
          I confirm that the beneficiary address belongs to my chosen academic successor
        </Label>
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox
          id="createBackup"
          checked={confirmationChecks.createBackup}
          onCheckedChange={() => handleCheckboxChange("createBackup")}
        />
        <Label htmlFor="createBackup" className="text-sm leading-none">
          I have securely backed up my wallet credentials and academic documentation
        </Label>
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox
          id="allowDistribution"
          checked={confirmationChecks.allowDistribution}
          onCheckedChange={() => handleCheckboxChange("allowDistribution")}
        />
        <Label htmlFor="allowDistribution" className="text-sm leading-none">
          If unclaimed, I allow distribution to the Open Campus scholarship fund
        </Label>
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox
          id="understandLock"
          checked={confirmationChecks.understandLock}
          onCheckedChange={() => handleCheckboxChange("understandLock")}
        />
        <Label htmlFor="understandLock" className="text-sm leading-none">
          I understand that academic assets will be locked for minimum 1 year after creation
        </Label>
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox
          id="acceptRisks"
          checked={confirmationChecks.acceptRisks}
          onCheckedChange={() => handleCheckboxChange("acceptRisks")}
        />
        <Label htmlFor="acceptRisks" className="text-sm leading-none">
          I understand and accept all risks associated with blockchain-based academic asset transfer
        </Label>
      </div>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <WalletInfo />
      
      {(error || validationError) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || validationError}</AlertDescription>
        </Alert>
      )}

      <Card className="border-primary/20 bg-card/60 backdrop-blur-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-display text-center text-primary">Create Your Academic Legacy</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Secure your educational assets and intellectual property on Open Campus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Label htmlFor="beneficiary" className="text-lg text-foreground flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> Academic Beneficiary Address
                </Label>
                <Input
                  type="text"
                  id="beneficiary"
                  name="beneficiary"
                  value={formData.beneficiary}
                  onChange={handleChange}
                  className="bg-input border-input text-foreground focus:ring-2 focus:ring-ring focus:border-ring placeholder:text-muted-foreground mt-2"
                  placeholder="0x..."
                  required
                />
              </div>

              <div className="relative">
                <Label htmlFor="amount" className="text-lg text-foreground flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Initial EDU Token Deposit
                </Label>
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="bg-input border-input text-foreground focus:ring-2 focus:ring-ring focus:border-ring placeholder:text-muted-foreground mt-2"
                  placeholder="100"
                  step="0.000001"
                  min="0"
                  required
                />
                {formData.amount && (
                  <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Final deposit: {(Number(formData.amount) * 0.98).toFixed(6)} EDU (2% supports Open Campus)
                  </div>
                )}
              </div>

              <div className="relative">
                <Label htmlFor="assets" className="text-lg text-foreground flex items-center gap-2">
                  <ScrollText className="w-4 h-4" /> Academic Assets Description
                </Label>
                <Textarea
                  id="assets"
                  name="assets"
                  value={formData.assets}
                  onChange={handleChange}
                  className="bg-input border-input text-foreground focus:ring-2 focus:ring-ring focus:border-ring placeholder:text-muted-foreground mt-2 min-h-[120px]"
                  placeholder="Describe your academic assets (research papers, intellectual property, educational resources)..."
                  required
                />
                <div className="mt-1 text-sm text-muted-foreground">{formData.assets.length}/50 characters</div>
              </div>

              <div className="relative">
                <Label htmlFor="claimWaitTime" className="text-lg text-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Claim Wait Time (seconds)
                </Label>
                <Input
                  type="number"
                  id="claimWaitTime"
                  name="claimWaitTime"
                  value={formData.claimWaitTime}
                  onChange={handleChange}
                  className="bg-input border-input text-foreground focus:ring-2 focus:ring-ring focus:border-ring placeholder:text-muted-foreground mt-2"
                  placeholder="60"
                  min="60"
                  required
                />
                <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Minimum wait time: 60 seconds
                </div>
              </div>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  className="w-full bg-primary text-primary-foreground border border-primary/30 rounded-xl px-6 py-6"
                >
                  Review Academic Will
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogTitle>Confirm Academic Will Creation</DialogTitle>
                <DialogDescription>
                  Please review the following conditions for your educational legacy
                </DialogDescription>

                <ConfirmationCheckboxes />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenDialog(false)}
                    className="mr-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={loading || !Object.values(confirmationChecks).every(Boolean)}
                    className="bg-primary text-primary-foreground"
                  >
                    {loading ? "Creating..." : "Secure Academic Legacy"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}