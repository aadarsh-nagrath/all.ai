"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function NotFoundPage() {
  const [hover, setHover] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7f5f2] text-gray-800">
      {/* Doodle animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <motion.img
          src="/images/notfound.jpg"
          alt="Doodle"
          className="absolute -top-12 left-6 w-20 h-20"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
        {/* <motion.img
          src="/doodle2.svg"
          alt="Doodle"
          className="absolute -bottom-12 right-6 w-24 h-24"
          animate={{ rotate: [-10, 0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
        /> */}
      </motion.div>

      {/* 404 Text */}
      <motion.h1
        className="text-8xl font-bold text-black"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        404
      </motion.h1>

      {/* Oops Text */}
      <motion.p
        className="text-2xl font-handwritten mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>

      {/* Animated button */}
      <motion.div
        className="mt-6"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Link href="/">
          <motion.button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="px-6 py-3 text-lg font-semibold text-white bg-black rounded-lg shadow-lg"
            animate={{ scale: hover ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Go Home 🏠
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
