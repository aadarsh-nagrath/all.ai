"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  useEffect(() => {
    // Optional: Add any initialization logic here
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="max-w-2xl w-full text-center relative">
        {/* Animated floating elements */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute -top-16 left-1/4 w-16 h-16 rounded-full bg-primary/10 blur-xl"
        />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-secondary/10 blur-xl"
        />

        {/* Main content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="relative z-10"
        >
          {/* Glowing 404 text */}
          <div className="relative inline-block">
            <h1 className="text-9xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
              404
            </h1>
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl -z-10" />
          </div>

          <p className="text-2xl mt-6 mb-8">
            Whoops! This page got lost in the{" "}
            <span className="relative inline-block">
              <span className="relative z-10">digital void</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-primary/20 -z-0" />
            </span>
            .
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8"
          >
            <Link href="/">
              <div className="px-8 py-4 text-lg font-semibold rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg hover:shadow-primary/30 transition-all duration-300 inline-flex items-center gap-2">
                <span>Beam me home</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
            </Link>
          </motion.div>

          {/* Optional: Add a fun ASCII art or decorative element */}
          <div className="mt-16 opacity-60 dark:opacity-40 text-xs font-mono">
            {`// TODO: Find this page`}
          </div>
        </motion.div>
      </div>
    </div>
  );
}