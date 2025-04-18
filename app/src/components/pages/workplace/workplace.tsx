"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Headline from "./headline";
import SearchInput from "./searchbox";
import Subheadline from "./subheadline";
import { ThemeBadge } from "@/components/theme-badge"
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function AnimatedThemeButton() {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ThemeBadge />
      </motion.div>
    </div>
  );
}

export default function Workplace() {
  const [showHeadings, setShowHeadings] = useState(true);

  const handleMessageSent = () => {
    setShowHeadings(false);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <AnimatedThemeButton />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <AnimatePresence>
        {showHeadings && (
          <>
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Headline />
            </motion.div>
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Subheadline />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <SearchInput onMessageSent={handleMessageSent} />
    </div>
  );
}


// what are things in the chat ui -
// what can i help you with headline
// message input - web search , reason, voice typing
// miscellaneous task performing button templates


// gemini {hello name of person}
// no need to di1play model version as it is not much required; can be exception
// upload image feature

// perplexity better chat box and [auto button to change model close to chat]
// try pro modal pop up in corner of screen
