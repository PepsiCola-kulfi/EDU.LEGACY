"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-background to-black" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-3 py-1 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm text-primary-foreground">Secure Legacy Planning</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-medium tracking-tight mb-6">
            Secure Your Legacy
            <br />
            On Telos Blockchain
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create smart wills, set milestone-based distributions, and ensure your legacy lives on through Telos
            blockchain. Fast, secure, and eco-friendly.
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8">
            Start Your Will
          </Button>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
    </section>
  )
}

