'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Footer from '../components/footer'

export default function Home() {
  const [bgIndex, setBgIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const parallaxRef = useRef(null);
  
  // Indian landscapes for background rotation
  const indiaBackgrounds = [
    'url("/api/placeholder/1920/1080")', // Taj Mahal placeholder
    'url("/api/placeholder/1920/1080")', // Kerala Backwaters placeholder
    'url("/api/placeholder/1920/1080")'  // Himalayan Mountains placeholder
  ];
  
  // Rotate backgrounds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % indiaBackgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Decorative Indian cultural symbols
  const culturalElements = [
    { emoji: "🪔", size: "text-4xl", initialPosition: { x: "15%", y: "20%" } },
    { emoji: "🕉️", size: "text-5xl", initialPosition: { x: "85%", y: "15%" } },
    { emoji: "🧘", size: "text-3xl", initialPosition: { x: "75%", y: "75%" } },
    { emoji: "🏰", size: "text-4xl", initialPosition: { x: "25%", y: "80%" } },
    { emoji: "🐘", size: "text-3xl", initialPosition: { x: "10%", y: "60%" } },
    { emoji: "☮️", size: "text-4xl", initialPosition: { x: "90%", y: "60%" } }
  ];
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Full screen background container that extends behind header */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-black">
        {/* Dynamic background with smooth transitions */}
        {indiaBackgrounds.map((bg, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: bg }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === bgIndex ? 1 : 0,
              scale: index === bgIndex ? 1.05 : 1
            }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        ))}
        
        {/* Color overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-purple-900/40 to-orange-900/60" />
        
        {/* Floating particles with Indian colors */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(40)].map((_, i) => {
            const size = Math.random() * 6 + 2;
            const colors = ['#FF9933', '#FFFFFF', '#138808', '#000080', '#FF5733', '#FFC300']; // Indian flag colors + extras
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  filter: 'blur(1px)'
                }}
                animate={{
                  y: [0, Math.random() * -400 - 100],
                  x: [0, (Math.random() - 0.5) * 200],
                  opacity: [0.7, 0]
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              />
            );
          })}
        </div>
        
        {/* Decorative cultural elements with parallax */}
        <div className="absolute inset-0 overflow-hidden">
          {culturalElements.map((item, index) => (
            <motion.div
              key={index}
              className={`absolute ${item.size} opacity-40`}
              style={{
                left: item.initialPosition.x,
                top: item.initialPosition.y
              }}
              animate={{
                x: (mousePosition.x - window.innerWidth / 2) / (index + 10) * -1,
                y: (mousePosition.y - window.innerHeight / 2) / (index + 10) * -1,
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                x: { duration: 0.5, ease: "easeOut" },
                y: { duration: 0.5, ease: "easeOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </div>
        
        {/* Indian mandala animation - moved outside content for full page coverage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-[600px] h-[600px] border-2 border-white/20 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[400px] h-[400px] border-2 border-white/15 rounded-full"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[200px] h-[200px] border-2 border-white/10 rounded-full"
          />
        </motion.div>
        
        {/* Animated wave footer background - this is just the decorative waves, not the footer itself */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-24">
            <motion.path 
              initial={{ d: "M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,192C672,192,768,224,864,224C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
              animate={{ 
                d: [
                  "M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,192C672,192,768,224,864,224C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,165.3C672,171,768,213,864,229.3C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,192C672,192,768,224,864,224C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ]
              }}
              transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
              fill="rgba(255,153,51,0.3)" 
            />
            <motion.path 
              initial={{ d: "M0,224L48,229.3C96,235,192,245,288,240C384,235,480,213,576,202.7C672,192,768,192,864,202.7C960,213,1056,235,1152,245.3C1248,256,1344,256,1392,256L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
              animate={{ 
                d: [
                  "M0,224L48,229.3C96,235,192,245,288,240C384,235,480,213,576,202.7C672,192,768,192,864,202.7C960,213,1056,235,1152,245.3C1248,256,1344,256,1392,256L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,288L48,282.7C96,277,192,267,288,250.7C384,235,480,213,576,213.3C672,213,768,235,864,250.7C960,267,1056,277,1152,266.7C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,224L48,229.3C96,235,192,245,288,240C384,235,480,213,576,202.7C672,192,768,192,864,202.7C960,213,1056,235,1152,245.3C1248,256,1344,256,1392,256L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ]
              }}
              transition={{ repeat: Infinity, duration: 15, ease: "easeInOut", delay: 1 }}
              fill="rgba(255,255,255,0.2)" 
            />
            <motion.path 
              initial={{ d: "M0,256L48,261.3C96,267,192,277,288,282.7C384,288,480,288,576,277.3C672,267,768,245,864,250.7C960,256,1056,288,1152,282.7C1248,277,1344,235,1392,213.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
              animate={{ 
                d: [
                  "M0,256L48,261.3C96,267,192,277,288,282.7C384,288,480,288,576,277.3C672,267,768,245,864,250.7C960,256,1056,288,1152,282.7C1248,277,1344,235,1392,213.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,224L48,234.7C96,245,192,267,288,261.3C384,256,480,224,576,213.3C672,203,768,213,864,224C960,235,1056,245,1152,261.3C1248,277,1344,299,1392,309.3L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,256L48,261.3C96,267,192,277,288,282.7C384,288,480,288,576,277.3C672,267,768,245,864,250.7C960,256,1056,288,1152,282.7C1248,277,1344,235,1392,213.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ]
              }}
              transition={{ repeat: Infinity, duration: 18, ease: "easeInOut", delay: 2 }}
              fill="rgba(19,136,8,0.3)" 
            />
          </svg>
        </div>
      </div>
      
      {/* Main page structure with flex to push footer to bottom */}
      <div className="flex flex-col min-h-screen relative z-10">
        {/* Main content section */}
        <div 
          ref={parallaxRef}
          className="flex-grow flex flex-col items-center justify-center px-6 pb-20" 
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3
                }
              }
            }}
            className="text-center max-w-3xl"
          >
            {/* Dancing Namaste animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                rotate: [0, -10, 10, 0] 
              }}
              transition={{ duration: 1.5 }}
              className="mb-6 text-6xl mx-auto"
            >
              🙏
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-orange-400 via-white to-green-500 bg-clip-text text-transparent">
                Discover Incredible India
              </span>
            </motion.h1>
            
            <motion.div
              variants={fadeInUp}
              className="h-1 w-32 mx-auto bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-full mb-6"
            />
            
            <motion.p
              variants={fadeInUp}
              className="text-xl text-blue-50/90 mb-10"
            >
              Embark on a journey through ancient traditions, breathtaking landscapes, and rich cultural heritage
            </motion.p>
            
            {/* Floating button container with hover effect */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link href="/login">
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 0 25px rgba(255, 153, 51, 0.7)",
                    textShadow: "0 0 8px rgba(255, 255, 255, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden group bg-gradient-to-r from-orange-500 to-red-600 text-white px-10 py-4 rounded-full font-medium shadow-lg"
                >
                  <motion.span
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ mixBlendMode: "overlay" }}
                  />
                  <motion.span 
                    animate={{ y: [0, -2, 0, 2, 0] }} 
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative z-10 flex items-center gap-2"
                  >
                    <span>Begin Your Journey</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.span>
                </motion.button>
              </Link>
              
              <Link href="/signup">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(19, 136, 8, 0.7)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden group bg-transparent border-2 border-green-500 text-white px-10 py-4 rounded-full font-medium"
                >
                  <motion.span
                    className="absolute inset-0 w-0 bg-gradient-to-r from-green-500 to-emerald-600 group-hover:w-full transition-all duration-300"
                  />
                  <motion.span 
                    animate={{ 
                      textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 10px rgba(255,255,255,0.5)", "0 0 0px rgba(255,255,255,0)"]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="relative z-10"
                  >
                    Create Account
                  </motion.span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      
    </div>
  )
}