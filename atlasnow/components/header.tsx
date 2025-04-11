'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Travel-specific navigation items
  const navItems = [
    { name: 'Destinations', path: '/destinations' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <motion.header 
      // Make sure header is transparent initially
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className={`${
        scrolled 
          ? 'bg-white/30 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'  // Explicitly transparent
      } p-4 sticky top-0 z-50 transition-all duration-500`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Animated Travel Logo */}
        <Link href="/" className="relative z-10 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <div className="relative w-10 h-10 mr-2">
              <motion.div 
                className="absolute inset-0 bg-blue-600/80 rounded-full"
                animate={{ 
                  scale: [1, 1.05, 1, 0.95, 1],
                }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute inset-1 bg-cyan-400/80 rounded-full"
                animate={{ 
                  scale: [1, 0.95, 1, 1.05, 1],
                }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div
                className="absolute inset-2 bg-white/90 rounded-full flex items-center justify-center font-black text-blue-700"
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
              >
                A
              </motion.div>
            </div>
            <div>
              <motion.span 
                className="text-2xl font-extrabold tracking-tight"
                initial={{ opacity: 1, x: 0 }} // Show immediately
                animate={{ opacity: 1, x: 0 }}
              >
                <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-400 bg-clip-text text-transparent">
                  AtlasNow
                </span>
              </motion.span>
              <motion.div 
                className="h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 mt-0.5 w-0 group-hover:w-full transition-all duration-300"
              />
            </div>
          </motion.div>
        </Link>

        {/* Main Nav Items - Hidden on mobile */}
        <motion.nav 
          className="hidden md:flex gap-6 items-center"
          initial={{ opacity: 1 }} // Show immediately
          animate={{ opacity: 1 }}
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 1, y: 0 }} // Show immediately
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
            >
              <Link
                href={item.path}
                className="relative text-white font-medium group px-2 py-1"
              >
                <span>{item.name}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-400 transition-all group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Auth Buttons with travel-themed styling */}
        <div className="flex gap-3 items-center">
          {['login', 'signup'].map((route, index) => (
            <motion.div
              key={route}
              initial={{ opacity: 1, scale: 1 }} // Show immediately
              animate={{ opacity: 1, scale: 1 }}
            >
              <Link href={`/${route}`}>
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: route === 'signup' ? '0 0 15px rgba(56, 189, 248, 0.5)' : 'none'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full font-medium transition duration-300 ${
                    route === 'login'
                      ? 'text-white border border-white/70 hover:bg-white/10'
                      : 'bg-gradient-to-r from-blue-600/90 to-cyan-400/90 text-white'
                  }`}
                >
                  {route === 'login' ? 'Log In' : 'Sign Up'}
                </motion.button>
              </Link>
            </motion.div>
          ))}

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden ml-2 p-1 rounded-md focus:outline-none"
          >
            <motion.div
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white mb-1.5"
            />
            <motion.div
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-white mb-1.5"
            />
            <motion.div
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white"
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Travel themed */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: menuOpen ? 'auto' : 0,
          opacity: menuOpen ? 1 : 0
        }}
        className="md:hidden overflow-hidden"
      >
        <div className="pt-4 pb-2 px-4 space-y-2 bg-black/50 backdrop-blur-sm mt-2 rounded-lg">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              whileTap={{ scale: 0.95 }}
              className="block"
            >
              <Link
                href={item.path}
                className="block py-2 text-white font-medium hover:text-cyan-300"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.header>
  )
}