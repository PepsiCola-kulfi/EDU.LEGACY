"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useSmartWill } from "@/context/SmartWillContext"
import { Loader2, PlusCircle, Clock, Wallet, AlertCircle, User, FileText, Calendar, Coins, ArrowLeft } from "lucide-react" // Add ArrowLeft icon
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import { DotBackground } from "@/components/animateddots"

interface Will {
  beneficiary: string
  amount: bigint
  lastPingTime: bigint
  tenYears: bigint
  description: string
  isClaimed: boolean
  creationTime: bigint
}

const CheckMyWill = () => {
  const [willDetails, setWillDetails] = useState<Will | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [depositAmount, setDepositAmount] = useState("")
  const [timeRemaining, setTimeRemaining] = useState("")
  const [isDepositing, setIsDepositing] = useState(false)
  const [isPinging, setIsPinging] = useState(false)

  const { account, connectWallet, getNormalWill, ping, depositNormalWill } = useSmartWill()
  const router = useRouter()

  useEffect(() => {
    if (!account) {
      connectWallet()
    } else {
      fetchWillDetails()
    }
  }, [account, connectWallet])

  const fetchWillDetails = async () => {
    setLoading(true)
    try {
      const details = await getNormalWill(account)
      setWillDetails(details)
      updateTimeRemaining(details.lastPingTime)
    } catch (err) {
      setError("Error fetching will details.")
    } finally {
      setLoading(false)
    }
  }

  const updateTimeRemaining = (lastPingTimestamp: bigint) => {
    const updateCounter = () => {
      const now = BigInt(Math.floor(Date.now() / 1000))
      const lastPing = lastPingTimestamp
      const timeLimit = BigInt(10 * 365 * 24 * 60 * 60) // 10 years in seconds
      const remainingTime = lastPing + timeLimit - now

      if (remainingTime <= BigInt(0)) {
        setTimeRemaining("Beneficiary can claim")
      } else {
        const days = Number(remainingTime / BigInt(24 * 60 * 60))
        const hours = Number((remainingTime % BigInt(24 * 60 * 60)) / BigInt(60 * 60))
        const minutes = Number((remainingTime % BigInt(60 * 60)) / BigInt(60))
        const seconds = Number(remainingTime % BigInt(60))
        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      }
    }

    updateCounter()
    const interval = setInterval(updateCounter, 1000) // Update every second
    return () => clearInterval(interval)
  }

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDepositing(true)
    try {
      await depositNormalWill(depositAmount)
      await fetchWillDetails()
      setDepositAmount("")
    } catch (err) {
      setError("Error depositing funds.")
    } finally {
      setIsDepositing(false)
    }
  }

  const handlePing = async () => {
    setIsPinging(true)
    try {
      await ping()
      await fetchWillDetails()
    } catch (err) {
      setError("Error pinging contract.")
    } finally {
      setIsPinging(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-white" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!willDetails) {
    return (
      <DotBackground>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md text-center bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-gray-600/40 rounded-lg p-4">
          <CardHeader>
            <CardTitle>No Will Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">You haven't created a will yet.</p>
            <Button
              onClick={() => router.push("/create-will")}
              className="w-full flex items-center justify-center gap-2  bg-white/30 dark:bg-black/30 border border-white/40 dark:border-gray-600/40 backdrop-blur-md rounded-xl p-3 dark:hover:text-black dark:text-gray-100 hover:bg-white/40 dark:hover:bg-white transition"
            >
              <PlusCircle className="w-4 h-4" />
              Create Will
            </Button>
          </CardContent>
        </Card>
      </div>
      </DotBackground>
    )
  }

  return (
    <DotBackground>
      <div className="h-screen flex items-center justify-center relative">
        
        {/* Back Button at the top-left corner */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 left-4 z-10"
        >
          <Button
            variant="outline"
            onClick={() => router.push("/")}  // Navigate to Home
            className="flex items-center gap-2 text-white bg-black/30  border border-white/40 rounded-xl p-3 backdrop-blur-md hover:bg-black/40"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </motion.div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              className="max-w-4xl mx-auto overflow-hidden dark:bg-transparent backdrop-blur-[1px] border border-white/30 dark:border-gray-600/40 rounded-xl transition-transform transform"
            >
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="text-3xl font-bold">Your Digital Will</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <InfoCard icon={User} title="Beneficiary" content={willDetails.beneficiary} />
                  <InfoCard
                    icon={Coins}
                    title="Amount Deposited"
                    content={`${Number(willDetails.amount) / 1e18} TELOS`}
                  />
                  <InfoCard
                    icon={Calendar}
                    title="Created Time"
                    content={new Date(Number(willDetails.creationTime) * 1000).toLocaleString()}
                  />
                  <InfoCard icon={Clock} title="Time Until Claim" content={timeRemaining} highlight />
                  <InfoCard
                    icon={Clock}
                    title="Last Pinged Time"
                    content={new Date(Number(willDetails.lastPingTime) * 1000).toLocaleString()}
                  />
                </div>

                <div className="bg-secondary rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Description
                  </h3>
                  <p className="text-sm">{willDetails.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <form onSubmit={handleDeposit} className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Amount in TELOS"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="flex-grow transition-transform transform hover:scale-105"
                      />
                      <Button
                        type="submit"
                        disabled={isDepositing || !depositAmount}
                        className="whitespace-nowrap bg-white/30 dark:bg-black/30 border border-white/40 dark:border-gray-600/40 backdrop-blur-md rounded-lg p-3 text-white dark:text-gray-300 hover:bg-white/40 dark:hover:bg-black/40 transition-all transform hover:scale-105"
                      >
                        {isDepositing ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Wallet className="w-4 h-4 mr-2" />
                            Deposit More
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                  <Button
                    onClick={handlePing}
                    disabled={isPinging}
                    variant="secondary"
                    className=" bg-white/30 dark:bg-black/30 border border-white/40 dark:border-gray-600/40 backdrop-blur-md rounded-lg p-3 text-white dark:text-gray-300 hover:bg-white/40 dark:hover:bg-black/40 transition-all transform hover:scale-105"
                  >
                    {isPinging ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Clock className="w-4 h-4 mr-2" />
                        Ping Contract
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </DotBackground>
  )
}

interface InfoCardProps {
  icon: React.ElementType; // This ensures the icon prop is a component (e.g., from `lucide-react`)
  title: string;
  content: string;
  highlight?: boolean; // Optional prop
}

const InfoCard = ({ icon: Icon, title, content, highlight = false }: InfoCardProps) => (
  <div className={`p-4 rounded-lg ${highlight ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
    <h3 className="font-semibold mb-2 flex items-center gap-2">
      <Icon className="w-5 h-5" />
      {title}
    </h3>
    <p className={`${highlight ? "text-4xl font-mono" : "text-sm"} break-all`}>{content}</p>
  </div>
)

export default CheckMyWill
