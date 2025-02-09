"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSmartWill } from '@/context/SmartWillContext'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ScrollText, AlertCircle, Clock, Check, Lock, Loader2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ethers } from 'ethers' // Import ethers

interface Claimable {
  owner: string; // Owner is the testator in your context
  amount: string; // Amount is the asset amount
}

export default function Claimables() {
  const router = useRouter()
  const { account, connectWallet, loading: walletLoading, error: walletError, isConnected, getNormalWillsAsBeneficiary, claimNormalWill } = useSmartWill()
  const [claimables, setClaimables] = useState<Claimable[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadClaimables = async () => {
      setLoading(true);
      setError(null); // Reset error
      try {
        if (!isConnected) {
          await connectWallet(); // Wait for connection
          if (!account) return; // Stop if still no account after connecting
        }

        if (account) {
          const wills = await getNormalWillsAsBeneficiary();
          console.log("Fetched wills:", wills);
          setClaimables(wills || []); // Ensure wills is an array
        } else {
          setError("No account connected.");
        }
      } catch (err: any) {  // Use "any" type to avoid strict type checking issues
        console.error("Error fetching claimables:", err);
        setError(err.message || "Failed to fetch claimables.");
      } finally {
        setLoading(false);
      }
    };

    loadClaimables();

  }, [isConnected, account, getNormalWillsAsBeneficiary, connectWallet]);

  const handleWillClick = (owner: string) => {
        // Check if owner is a valid address
        if (!ethers.isAddress(owner)) {
            console.error("Invalid address:", owner);
            setError("Invalid owner address.  Please check your data."); // Correctly sets the error message.
            return; // prevent navigation
        }
        router.push(`/will/${owner}`);
  }

  const handleClaim = async (owner: string) => {
    if (!owner || !ethers.isAddress(owner)) {
      setError("Invalid owner address.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const success = await claimNormalWill(owner);
      if (success) {
        // Refresh claimables after successful claim
        await loadClaimables();
      } else {
        // Error is already set within claimNormalWill
      }
    } catch (err: any) {
      console.error("Error during claim:", err);
      setError(err.message || "Failed to claim.");
    } finally {
      setLoading(false);
    }
  };

  const isClaimable = (createdAt: number, claimWaitTime: number) => {
    const waitTimeMs = claimWaitTime * 1000
    return Date.now() - createdAt >= waitTimeMs
  }

  const getTimeRemaining = (createdAt: number, claimWaitTime: number) => {
    const waitTimeMs = claimWaitTime * 1000
    const endTime = createdAt + waitTimeMs
    return formatDistanceToNow(endTime, { addSuffix: true })
  }

  if (!isConnected) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Connect Wallet</CardTitle>
            <CardDescription>Please connect your wallet to view claimables</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={connectWallet} disabled={walletLoading}>
              {walletLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect Wallet'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardContent className="flex items-center justify-center p-6">
            <Loader2 className="h-8 w-8 animate-spin" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      {(error || walletError) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || walletError}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-display">Your Claimable Assets</CardTitle>
          <CardDescription>
            View and manage academic assets designated to you
          </CardDescription>
        </CardHeader>
      </Card>

      {claimables.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No claimable assets found for your address
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {claimables.map((claimable, index) => (
            <Card
              key={index} // Use index as key since owner might not be unique
              className="hover:border-primary/50 transition-colors"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">Academic Legacy from {claimable.owner}</CardTitle>
                    <CardDescription className="mt-2">
                      <div className="flex items-center gap-2">
                        <ScrollText className="h-4 w-4" />
                         Assets Description Here {claimable.owner}

                      </div>
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{claimable.amount} EDU</div>
                    <CardDescription>Token Amount</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  Created {formatDistanceToNow(claimable.createdAt, { addSuffix: true })}
                </div> */}
              </CardContent>
              <CardFooter className="bg-muted/50 flex justify-between">
                <Button variant="outline" onClick={() => handleWillClick(claimable.owner)}>
                  View Details
                </Button>
                <Button onClick={() => handleClaim(claimable.owner)} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Claiming...
                    </>
                  ) : (
                    'Claim'
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}