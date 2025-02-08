"use client"

import { motion } from "framer-motion"

const faqs = [
  {
    question: "How does Telos blockchain ensure my will's security?",
    answer:
      "Telos blockchain provides immutable, transparent records of your will. Its high-speed performance and EVM compatibility ensure your wishes are securely stored and executed exactly as intended, with minimal risk of tampering or fraud.",
  },
  {
    question: "What are the advantages of creating a will on Telos?",
    answer:
      "Telos offers fast transaction speeds, low costs, and eco-friendly operations. This means your will can be created, updated, and executed quickly and efficiently, with minimal environmental impact and transaction fees.",
  },
  {
    question: "Can I update my will after it's been created on Telos?",
    answer:
      "Yes, our platform allows you to update your will at any time. Changes are recorded on the Telos blockchain, ensuring a clear audit trail while maintaining the flexibility to adapt to life changes.",
  },
  {
    question: "How does asset distribution work with a Telos-based will?",
    answer:
      "Assets are distributed according to the conditions set in your will's smart contract. This can include time-based releases, specific event triggers, or instant distribution upon verification of certain conditions.",
  },
]

export default function FAQ() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display mb-4">
            Frequently Asked Questions
            <br />
            About Telos Wills
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-medium mb-4">{faq.question}</h3>
              <p className="text-gray-400">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

