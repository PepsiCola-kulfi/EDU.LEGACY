"use client"

import { ArrowRightIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden from-black to-black flex flex-col items-center justify-center text-center px-4 py-16">
    
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-5xl mx-auto space-y-8"
        >
          <div className="flex justify-center">
            <motion.div
              className={cn(
                "group rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-white/10"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-6 py-2 transition ease-out">
                <span className="font-semibold">✨ Secure legacy planning</span>
                <ArrowRightIcon className="ml-2 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </motion.div>
          </div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
              Secure Your Legacy
              <br />
              On Telos Blockchain
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Create smart wills, set milestone-based distributions, and ensure your legacy lives on through Telos
            blockchain. Fast, secure, and eco-friendly.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/50"
            >
              Start Your Will
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-lg font-semibold border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 ease-in-out"
            >
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
    </div>
  )
}
