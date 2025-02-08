"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, DollarSign, Code, Leaf } from "lucide-react"

const features = [
  {
    title: "Fast Transactions",
    description: "Execute wills and distribute assets with Telos' lightning-fast 0.5 second block time.",
    icon: Clock,
  },
  {
    title: "Low-Cost Operations",
    description: "Benefit from Telos' minimal transaction fees for cost-effective legacy management.",
    icon: DollarSign,
  },
  {
    title: "EVM Compatibility",
    description: "Leverage Ethereum-compatible smart contracts for flexible and powerful will creation.",
    icon: Code,
  },
  {
    title: "Eco-Friendly",
    description: "Rest easy knowing your digital legacy has a minimal environmental impact on Telos.",
    icon: Leaf,
  },
]

export default function Features() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display mb-4">Comprehensive Legacy Planning</h2>
          <p className="text-muted-foreground">Advanced features for complete control over your digital legacy</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card border-border overflow-hidden">
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

