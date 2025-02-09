// "use client"

// import { motion } from "framer-motion"
// import { Card, CardContent } from "@/components/ui/card"
// import { Shield, Clock, DollarSign, Code, Leaf } from "lucide-react"

// const features = [
//   {
//     title: "Fast Transactions",
//     description: "Execute wills and distribute assets with EDU' lightning-fast 0.5 second block time.",
//     icon: Clock,
//   },
//   {
//     title: "Low-Cost Operations",
//     description: "Benefit from EDU' minimal transaction fees for cost-effective legacy management.",
//     icon: DollarSign,
//   },
//   {
//     title: "EVM Compatibility",
//     description: "Leverage Ethereum-compatible smart contracts for flexible and powerful will creation.",
//     icon: Code,
//   },
//   {
//     title: "Eco-Friendly",
//     description: "Rest easy knowing your digital legacy has a minimal environmental impact on EDU.",
//     icon: Leaf,
//   },
// ]

// export default function Features() {
//   return (
//     <section className="py-20 relative">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-display mb-4">Comprehensive Legacy Planning</h2>
//           <p className="text-muted-foreground">Advanced features for complete control over your digital legacy</p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <Card className="bg-card border-border overflow-hidden">
//                 <CardContent className="p-6">
//                   <feature.icon className="w-12 h-12 mb-4 text-primary" />
//                   <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
//                   <p className="text-muted-foreground">{feature.description}</p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import { HelpCircle, BookOpen, FileText, FileSearch } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BentoGridCustomDemo() {
  return (
    <BentoGrid className="max-w-7xl pb-20 mx-auto md:auto-rows-[20rem] grid gap-5">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg] p-6", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const SkeletonOne = () => {
  const variants = {
    initial: { x: 0 },
    animate: {
      x: 10,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  };

  const variantsSecond = {
    initial: { x: 0 },
    animate: {
      x: -10,
      rotate: -5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
    initial="initial"
    whileHover="animate"
    className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
  >
    <motion.div
      variants={variants}
      className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
    >
      <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
      <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
    </motion.div>
    <motion.div
      variants={variantsSecond}
      className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
    >
      <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
    </motion.div>
    <motion.div
      variants={variants}
      className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
    >
      <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
      <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
    </motion.div>
  </motion.div>
);
};

const SkeletonTwo = () => (
  // Previously rendered a Lottie animation; now replaced with a placeholder.
  <Image
    src="https://i.pinimg.com/736x/e3/23/ba/e323ba68e40ab4245b2a5a1d2578d3a0.jpg"
    alt="avatar"
    height="2000"
    width="2000"
    className="max-h-44 w-full"      
  />
);

const SkeletonThree = () => (
  <Image
    src="https://i.pinimg.com/736x/65/cc/20/65cc2068aea4a5d05f656dafc1bdeb63.jpg"
    alt="avatar"
    height="2000"
    width="2000"
    className="max-h-44 w-full"      
  />
);

const SkeletonFour = () => (
  <Image
    src="https://i.pinimg.com/736x/90/0d/e7/900de7fdbe43aa2a8092d2a6245144fe.jpg"
    alt="avatar"
    height="5000"
    width="2000"
    className="max-h-44 w-full"      
  />
);

const SkeletonFive = () => (
  <div className="">
    <div className="w-full h-full relative max-w-xs">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-500 to-blue-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
      <div className="relative shadow-xl bg-black border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
        <h1 className="font-bold text-xl text-white mb-12 relative z-50">
          Meteors because they&apos;re cool
        </h1>
        {/* Removed the Meteors component and replaced it with a placeholder */}
        <div className="w-full text-center text-white">
          Meteors Animation Placeholder
        </div>
      </div>
    </div>
  </div>
);

const items = [
  {
    title: "Fast Transactions",
    description: "Execute wills and distribute assets with EDU' lightning-fast 0.5 second block time.",
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <HelpCircle className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />,
  },
  {
    title: "Low-Cost Operations",
    description:   "Benefit from EDU' minimal transaction fees for cost-effective legacy management.",
    header: <SkeletonTwo />,
    className: "md:col-span-1 p-6",
    icon: <BookOpen className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />,
  },
  {
    title: "EVM Compatibility",
    description: "Leverage Ethereum-compatible smart contracts for flexible and powerful will creation.",
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <FileText className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />,
  },
  {
    title: "Eco-Friendly",
    description: "Rest easy knowing your digital legacy has a minimal environmental impact on EDU.",
    header: <SkeletonFour />,
    className: "md:col-span-2 p-6",
    icon: <FileSearch className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />,
  },
  {
    title: "Data Transparency",
    description:
      "Every transaction is added on blockchain",
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <FileText className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />,
  },
];
