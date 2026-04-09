"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "border-b transition-all duration-300",
        isOpen 
          ? "border-blue-300 dark:border-blue-700" 
          : "border-blue-200/50 dark:border-blue-900/50"
      )}
    >
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-5 text-left hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
      >
        <span className="font-medium pr-4">{question}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 flex-shrink-0 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted-foreground leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface FAQSectionProps {
  className?: string;
}

export default function FAQSection({ className }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is GridMind AI?",
      answer: "GridMind AI is an autonomous AI decision engine designed for smart energy networks. It predicts energy demand, optimizes grid operations, and explains AI reasoning in real-time to help utility companies maximize renewable integration and reduce costs.",
    },
    {
      question: "How does the AI forecasting work?",
      answer: "Our AI uses advanced machine learning models trained on historical grid data, weather patterns, and demand trends to predict energy needs with 95%+ accuracy. The system continuously learns and adapts to improve predictions over time.",
    },
    {
      question: "Can it integrate with existing grid infrastructure?",
      answer: "Yes! GridMind AI is designed with a cloud-native architecture that integrates seamlessly with existing SCADA systems, smart meters, and grid management platforms through standard APIs and protocols.",
    },
    {
      question: "Is the platform secure?",
      answer: "Security is our top priority. We implement enterprise-grade encryption, role-based access control, and continuous monitoring for anomalies. Our system complies with NERC CIP and other grid security standards.",
    },
    {
      question: "What kind of renewable energy sources are supported?",
      answer: "GridMind AI supports all major renewable sources including solar, wind, hydro, and battery storage systems. The AI optimizes the balance between renewable generation, storage dispatch, and traditional power sources in real-time.",
    },
    {
      question: "How do I get started?",
      answer: "Simply sign up for a free account and connect your grid data sources. Our onboarding team will help you configure the system to match your specific grid requirements and operational goals.",
    },
  ];

  return (
    <Section className={cn("bg-background", className)} id="faq">
      <div className="max-w-container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about GridMind AI and how it can transform your energy grid operations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-muted/30 rounded-2xl p-6 md:p-8 border border-blue-200/50 dark:border-blue-800/30 shadow-sm shadow-blue-500/5">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
