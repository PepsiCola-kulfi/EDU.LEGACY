"use client"

import { ArrowRightIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black to-black flex flex-col items-center justify-center text-center px-4 py-16">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute pointer-events-none inset-0 bg-gradient-radial from-transparent via-black/50 to-black"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl mx-auto space-y-8"
      >
        <div className="flex justify-center">
          <motion.div
            className={cn(
              "group rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-white/10",
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

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full filter blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary rounded-full" />
      <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-accent rounded-full" />
    </div>
  )
}
