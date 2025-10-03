/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Navy Blue Brand Colors (Dark Theme)
        brand: {
          50: "#e6f0ff",
          100: "#cce0ff",
          200: "#99c2ff",
          300: "#66a3ff",
          400: "#3385ff",
          500: "#1a5fb4",  // Primary navy blue
          600: "#164d91",
          700: "#123b6e",
          800: "#0e2a4b",
          900: "#0a1828",  // Deep navy for dark backgrounds
        },
        // Surface colors
        surface: {
          DEFAULT: "#0a1828",  // Deep navy
          800: "#0e2a4b",
          900: "#0a1828",
          light: "#f8f9fa",  // Light theme background
          cream: "#faf8f5",  // Cream/skin tone for light theme
        },
        // Accent color (subtle blue)
        accent: {
          DEFAULT: "#3385ff",
          light: "#66a3ff",
          dark: "#1a5fb4",
        },
        // Text colors
        text: {
          dark: "#0a1828",
          light: "#f8f9fa",
          muted: "#64748b",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Inter", "sans-serif"],
      },
      animation: {
        // Micro-interactions
        "fade-up": "fade-up 420ms cubic-bezier(.2,.9,.3,1) both",
        "pop-fast": "pop 300ms cubic-bezier(.2,.9,.3,1) both",
        "pop": "pop 400ms cubic-bezier(.2,.9,.3,1) both",
        
        // Floating & Levitation
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "levitate": "levitate 3s ease-in-out infinite",
        
        // Glowing & Pulsing
        "glow": "glow 2s ease-in-out infinite",
        "glow-intense": "glow-intense 1.5s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        
        // Shimmering & Sparkle
        "shimmer": "shimmer 2.5s linear infinite",
        "shimmer-slow": "shimmer 4s linear infinite",
        "sparkle": "sparkle 1.5s ease-in-out infinite",
        "twinkle": "twinkle 2s ease-in-out infinite",
        
        // Gradient & Color Shifts
        "gradient": "gradient 8s linear infinite",
        "gradient-fast": "gradient 4s linear infinite",
        "gradient-xy": "gradient-xy 10s ease infinite",
        "hue-rotate": "hue-rotate 10s linear infinite",
        "color-shift": "color-shift 5s ease infinite",
        
        // Rotation & Spin
        "spin-slow": "spin 6s linear infinite",
        "spin-reverse": "spin-reverse 3s linear infinite",
        "rotate-3d": "rotate-3d 10s linear infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
        "wobble": "wobble 2s ease-in-out infinite",
        
        // Bouncing & Elastic
        "bounce-slow": "bounce 2s infinite",
        "bounce-elastic": "bounce-elastic 2s ease-in-out infinite",
        "rubber-band": "rubber-band 1s ease-in-out",
        
        // Sliding & Scrolling
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
        "slide-left": "slide-left 0.5s ease-out",
        "slide-right": "slide-right 0.5s ease-out",
        "scroll": "scroll 40s linear infinite",
        "scroll-fast": "scroll 20s linear infinite",
        
        // Fading & Appearing
        "fade-in": "fade-in 0.6s ease-out",
        "fade-out": "fade-out 0.6s ease-out",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "fade-in-down": "fade-in-down 0.8s ease-out",
        "reveal": "reveal 1s ease-out forwards",
        
        // Scaling & Zooming
        "scale-in": "scale-in 0.5s ease-out",
        "scale-out": "scale-out 0.5s ease-out",
        "zoom-pulse": "zoom-pulse 2s ease-in-out infinite",
        "breathe": "breathe 4s ease-in-out infinite",
        
        // Flipping & Rotating
        "flip": "flip 0.6s ease-in-out",
        "flip-in": "flip-in 0.8s ease-out",
        "rotate-in": "rotate-in 0.6s ease-out",
        
        // Glitching & Digital
        "glitch": "glitch 1s linear infinite",
        "glitch-intense": "glitch-intense 0.5s linear infinite",
        "digital-rain": "digital-rain 2s ease-in-out infinite",
        "static": "static 0.3s steps(4) infinite",
        
        // Morphing & Blob
        "blob": "blob 7s ease-in-out infinite",
        "morph": "morph 8s ease-in-out infinite",
        "wave": "wave 3s ease-in-out infinite",
        
        // Text Effects
        "text-shimmer": "text-shimmer 3s ease-in-out infinite",
        "text-glow": "text-glow 2s ease-in-out infinite",
        "typing": "typing 3.5s steps(40) forwards",
        
        // Special Effects
        "aurora": "aurora 20s ease infinite",
        "meteor": "meteor 3s ease-in-out infinite",
        "ripple": "ripple 1s ease-out",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "spotlight": "spotlight 4s ease-in-out infinite",
      },
      keyframes: {
        // Micro-interactions
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.995)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "pop": {
          "0%": { transform: "scale(.98)", opacity: "0" },
          "60%": { transform: "scale(1.02)", opacity: "1" },
          "100%": { transform: "scale(1)" },
        },
        
        // Floating
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        levitate: {
          "0%, 100%": { transform: "translateY(0px) rotateZ(0deg)" },
          "50%": { transform: "translateY(-15px) rotateZ(2deg)" },
        },
        
        // Glowing - Subtle Navy Blue
        glow: {
          "0%, 100%": { 
            boxShadow: "0 0 15px rgba(26, 95, 180, 0.4), 0 0 30px rgba(26, 95, 180, 0.2)",
          },
          "50%": { 
            boxShadow: "0 0 25px rgba(26, 95, 180, 0.6), 0 0 50px rgba(26, 95, 180, 0.3)",
          },
        },
        "glow-intense": {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(51, 133, 255, 0.5), 0 0 40px rgba(51, 133, 255, 0.3), 0 0 60px rgba(51, 133, 255, 0.15)",
          },
          "50%": { 
            boxShadow: "0 0 30px rgba(51, 133, 255, 0.8), 0 0 60px rgba(51, 133, 255, 0.5), 0 0 90px rgba(51, 133, 255, 0.25)",
          },
        },
        "pulse-glow": {
          "0%, 100%": { 
            opacity: "1",
            boxShadow: "0 0 15px rgba(26, 95, 180, 0.3)",
          },
          "50%": { 
            opacity: "0.8",
            boxShadow: "0 0 25px rgba(26, 95, 180, 0.5)",
          },
        },
        
        // Shimmer
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        sparkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.2)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        
        // Gradients
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "gradient-xy": {
          "0%, 100%": { 
            backgroundPosition: "0% 0%",
            backgroundSize: "400% 400%",
          },
          "50%": { 
            backgroundPosition: "100% 100%",
            backgroundSize: "200% 200%",
          },
        },
        "hue-rotate": {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
        "color-shift": {
          "0%, 100%": { filter: "hue-rotate(0deg) saturate(1)" },
          "50%": { filter: "hue-rotate(90deg) saturate(1.5)" },
        },
        
        // Rotation
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        "rotate-3d": {
          "0%": { transform: "rotateY(0deg) rotateX(0deg)" },
          "50%": { transform: "rotateY(180deg) rotateX(10deg)" },
          "100%": { transform: "rotateY(360deg) rotateX(0deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        wobble: {
          "0%, 100%": { transform: "translateX(0%)" },
          "15%": { transform: "translateX(-25%) rotate(-5deg)" },
          "30%": { transform: "translateX(20%) rotate(3deg)" },
          "45%": { transform: "translateX(-15%) rotate(-3deg)" },
          "60%": { transform: "translateX(10%) rotate(2deg)" },
          "75%": { transform: "translateX(-5%) rotate(-1deg)" },
        },
        
        // Elastic
        "bounce-elastic": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-25px)" },
          "65%": { transform: "translateY(-12px)" },
          "80%": { transform: "translateY(-6px)" },
        },
        "rubber-band": {
          "0%": { transform: "scale3d(1, 1, 1)" },
          "30%": { transform: "scale3d(1.25, 0.75, 1)" },
          "40%": { transform: "scale3d(0.75, 1.25, 1)" },
          "50%": { transform: "scale3d(1.15, 0.85, 1)" },
          "65%": { transform: "scale3d(0.95, 1.05, 1)" },
          "75%": { transform: "scale3d(1.05, 0.95, 1)" },
          "100%": { transform: "scale3d(1, 1, 1)" },
        },
        
        // Sliding
        "slide-up": {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          from: { transform: "translateY(-100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-left": {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "slide-right": {
          from: { transform: "translateX(-100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        scroll: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        
        // Fading
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          from: { opacity: "0", transform: "translateY(-20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        reveal: {
          from: { clipPath: "inset(0 100% 0 0)" },
          to: { clipPath: "inset(0 0 0 0)" },
        },
        
        // Scaling
        "scale-in": {
          from: { transform: "scale(0)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0)", opacity: "0" },
        },
        "zoom-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0.8" },
        },
        
        // Flipping
        flip: {
          from: { transform: "perspective(400px) rotateY(0)" },
          to: { transform: "perspective(400px) rotateY(360deg)" },
        },
        "flip-in": {
          from: { 
            transform: "perspective(400px) rotateX(-90deg)",
            opacity: "0",
          },
          to: { 
            transform: "perspective(400px) rotateX(0)",
            opacity: "1",
          },
        },
        "rotate-in": {
          from: { 
            transform: "rotate(-200deg) scale(0)",
            opacity: "0",
          },
          to: { 
            transform: "rotate(0) scale(1)",
            opacity: "1",
          },
        },
        
        // Glitch
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        "glitch-intense": {
          "0%": { 
            transform: "translate(0)",
            textShadow: "0 0 0 transparent",
          },
          "20%": { 
            transform: "translate(-3px, 3px)",
            textShadow: "3px -3px 0 rgba(26, 95, 180, 0.5), -3px 3px 0 rgba(51, 133, 255, 0.5)",
          },
          "40%": { 
            transform: "translate(-3px, -3px)",
            textShadow: "3px 3px 0 rgba(51, 133, 255, 0.5), -3px -3px 0 rgba(26, 95, 180, 0.5)",
          },
          "60%": { 
            transform: "translate(3px, 3px)",
            textShadow: "-3px -3px 0 rgba(26, 95, 180, 0.5), 3px 3px 0 rgba(51, 133, 255, 0.5)",
          },
          "80%": { 
            transform: "translate(3px, -3px)",
            textShadow: "-3px 3px 0 rgba(51, 133, 255, 0.5), 3px -3px 0 rgba(26, 95, 180, 0.5)",
          },
          "100%": { 
            transform: "translate(0)",
            textShadow: "0 0 0 transparent",
          },
        },
        "digital-rain": {
          "0%": { 
            transform: "translateY(-100%)",
            opacity: "0",
          },
          "50%": { opacity: "1" },
          "100%": { 
            transform: "translateY(100%)",
            opacity: "0",
          },
        },
        static: {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-1px, -1px)" },
          "50%": { transform: "translate(1px, 1px)" },
          "75%": { transform: "translate(-1px, 1px)" },
          "100%": { transform: "translate(1px, -1px)" },
        },
        
        // Organic
        blob: {
          "0%, 100%": { 
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          },
          "50%": { 
            borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
          },
        },
        morph: {
          "0%, 100%": { 
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            transform: "rotate(0deg)",
          },
          "50%": { 
            borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
            transform: "rotate(180deg)",
          },
        },
        wave: {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "25%": { transform: "translateX(5px) translateY(-5px)" },
          "50%": { transform: "translateX(0) translateY(-10px)" },
          "75%": { transform: "translateX(-5px) translateY(-5px)" },
        },
        
        // Text
        "text-shimmer": {
          "0%": { 
            backgroundPosition: "0% 50%",
            backgroundSize: "200% auto",
          },
          "100%": { 
            backgroundPosition: "200% 50%",
            backgroundSize: "200% auto",
          },
        },
        "text-glow": {
          "0%, 100%": { 
            textShadow: "0 0 10px rgba(26, 95, 180, 0.4), 0 0 20px rgba(26, 95, 180, 0.2)",
          },
          "50%": { 
            textShadow: "0 0 20px rgba(26, 95, 180, 0.8), 0 0 40px rgba(26, 95, 180, 0.5), 0 0 60px rgba(26, 95, 180, 0.3)",
          },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        
        // Special
        aurora: {
          "0%, 100%": { 
            backgroundPosition: "0% 50%",
            opacity: "0.3",
          },
          "50%": { 
            backgroundPosition: "100% 50%",
            opacity: "0.8",
          },
        },
        meteor: {
          "0%": { 
            transform: "rotate(215deg) translateX(0)",
            opacity: "1",
          },
          "70%": { opacity: "1" },
          "100%": { 
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        ripple: {
          "0%": { 
            transform: "scale(0)",
            opacity: "1",
          },
          "100%": { 
            transform: "scale(4)",
            opacity: "0",
          },
        },
        spotlight: {
          "0%, 100%": { 
            backgroundPosition: "0% 0%",
          },
          "50%": { 
            backgroundPosition: "100% 100%",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-shimmer": "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
        "gradient-shine": "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
        "mesh-gradient": "radial-gradient(at 40% 20%, rgba(26, 95, 180, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(51, 133, 255, 0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(26, 95, 180, 0.1) 0px, transparent 50%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        'snappy': 'cubic-bezier(.2,.9,.3,1)',
      },
      boxShadow: {
        "neon": "0 0 5px theme('colors.brand.500'), 0 0 15px theme('colors.brand.500')",
        "neon-accent": "0 0 5px theme('colors.accent.DEFAULT'), 0 0 15px theme('colors.accent.DEFAULT')",
        "glow-sm": "0 0 10px rgba(26, 95, 180, 0.4)",
        "glow-md": "0 0 15px rgba(26, 95, 180, 0.4), 0 0 30px rgba(26, 95, 180, 0.2)",
        "glow-lg": "0 0 20px rgba(26, 95, 180, 0.4), 0 0 40px rgba(26, 95, 180, 0.3), 0 0 60px rgba(26, 95, 180, 0.15)",
        "inner-glow": "inset 0 0 15px rgba(26, 95, 180, 0.2)",
      },
      dropShadow: {
        "neon": "0 0 10px rgba(26, 95, 180, 0.6)",
        "glow": "0 0 15px rgba(51, 133, 255, 0.6)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};