// "use client"

// import { motion } from "framer-motion"
// import { Card } from "@/components/ui/card"
// import { CheckCircle } from "lucide-react"

// const steps = [
//   {
//     title: "Create Your Will",
//     description: "Set up your digital will on Telos blockchain, specifying beneficiaries and asset distribution.",
//   },
//   {
//     title: "Define Conditions",
//     description: "Establish time-based or event-triggered conditions for asset release using smart contracts.",
//   },
//   {
//     title: "Secure with Telos",
//     description: "Your will is securely stored and executed on the fast and eco-friendly Telos blockchain.",
//   },
//   {
//     title: "Easy Management",
//     description: "Update your will anytime with our user-friendly interface, reflecting life changes instantly.",
//   },
// ]

// export default function WillInfo() {
//   return (
//     <section className="py-20 relative">
//       <div className="container mx-auto px-4">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
//             <h2 className="text-4xl font-display mb-6">
//               Creating Your Will
//               <br />
//               on Telos Blockchain
//             </h2>
//             <p className="text-gray-400 mb-8">
//               Secure your legacy with ease using our Telos-powered digital will platform. Our smart contract technology
//               ensures your wishes are executed exactly as you intend, with the speed and efficiency of Telos blockchain.
//             </p>
//             <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full text-sm transition-colors">
//               Start Your Will
//             </button>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <Card className="bg-black/50 border-gray-800">
//               <div className="p-6">
//                 <ul className="space-y-4">
//                   {steps.map((step, index) => (
//                     <li key={index} className="flex items-start">
//                       <CheckCircle className="w-6 h-6 text-emerald-400 mr-2 flex-shrink-0" />
//                       <div>
//                         <h3 className="font-medium mb-1">{step.title}</h3>
//                         <p className="text-sm text-gray-400">{step.description}</p>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </Card>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }

"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";

const steps = [
  {
    title: "Create Your Will",
    description:
      "Set up your digital will on EDU blockchain, specifying beneficiaries and asset distribution.",
  },
  {
    title: "Define Conditions",
    description:
      "Establish time-based or event-triggered conditions for asset release using smart contracts.",
  },
  {
    title: "Secure with EDU",
    description:
      "Your will is securely stored and executed on the fast and eco-friendly EDU blockchain.",
  },
  {
    title: "Easy Management",
    description:
      "Update your will anytime with our user-friendly interface, reflecting life changes instantly.",
  },
];

export default function WillInfo() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-3">
        <div className="grid md:grid-cols-2 gap-72 ">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
              Creating Your  Will  on EDU Blockchain
            </h2>
            <p className="text-gray-400 mb-8">
              Secure your legacy with ease using our EDU-powered digital will platform.
              Our smart contract technology ensures your wishes are executed exactly as you
              intend, with the speed and efficiency of EDU blockchain.
            </p>
          </motion.div>

          {/* Right Column - Terminal */}
          <div className="w-full">
            <Terminal className="w-full text-left ">
              <div className="space-y-2 pb-7 overflow-hidden ">
                <TypingAnimation className="block">&gt; Create Your Will</TypingAnimation>

                <AnimatedSpan delay={1500} className="block text-green-500">
                  <span>
                    ✔ Set up your digital will on EDU blockchain, specifying beneficiaries and asset distribution.
                  </span>
                </AnimatedSpan>

                <AnimatedSpan delay={2000} className="block text-green-500">
                  <span>✔ Define Conditions</span>
                </AnimatedSpan>

                <AnimatedSpan delay={2500} className="block text-green-500">
                  <span>
                    ✔ Establish time-based or event-triggered conditions for asset release using smart contracts.
                  </span>
                </AnimatedSpan>

                <AnimatedSpan delay={3000} className="block text-green-500">
                  <span>✔ Secure with Blockchain</span>
                </AnimatedSpan>

                <AnimatedSpan delay={3500} className="block text-green-500">
                  <span>
                    ✔ Your will is securely stored and executed on the fast and eco-friendly EDU blockchain.
                  </span>
                </AnimatedSpan>

                <AnimatedSpan delay={4000} className="block text-green-500">
                  <span>✔ Easy Management.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={4500} className="block text-green-500">
                  <span>
                    ✔ Update your will anytime with our user-friendly interface, reflecting life changes instantly.
                  </span>
                </AnimatedSpan>

                <TypingAnimation delay={6500} className="block text-muted-foreground">
                  Digital will setup completed successfully.
                </TypingAnimation>

                <TypingAnimation delay={7000} className="block text-muted-foreground">
                  Check your will
                </TypingAnimation>
              </div>
            </Terminal>
          </div>
        </div>
      </div>
    </section>
  );
}

