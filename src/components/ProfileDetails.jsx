import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Quote, 
  Code, 
  Lightbulb, 
  Target, 
  Compass 
} from "lucide-react";

// --- INCLUDED MOVING EYES COMPONENT ---
const MovingEyes = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse position relative to the center of the screen
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Limit the eye movement radius
  const eyeMovementX = mousePos.x * 4;
  const eyeMovementY = mousePos.y * 4;

  return (
    <div className="flex space-x-2 items-center justify-center bg-gray-100 p-2 rounded-full shadow-inner">
      {[1, 2].map((eye) => (
        <div key={eye} className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow overflow-hidden relative">
          <motion.div
            className="w-2.5 h-2.5 bg-gray-800 rounded-full absolute"
            animate={{ x: eyeMovementX, y: eyeMovementY }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </div>
      ))}
    </div>
  );
};

// --- MAIN COMPONENT ---
const ProfileDetails = () => {
  const testimonials = [
    {
      text: "Bruce's strategy of focusing on core principles rather than just tools has completely transformed how our team approaches new technology. We're adapting much faster to industry changes.",
      author: "Pascal Oduor",
      position: "CTO, M-treat company",
      focus: "Strategy",
      color: "blue",
    },
    {
      text: "His philosophical approach to problem-solving is refreshing. When our project hit roadblocks, Bruce's methodology of identifying missing concepts led us to elegant solutions we wouldn't have discovered otherwise.",
      author: "Brax Otieno",
      position: "Software Engineer",
      focus: "Philosophy",
      color: "purple",
    },
    {
      text: "Working with someone who has such a clear mission and vision is inspiring. Bruce genuinely aims to make the world better through technology, and that purpose-driven approach elevates the quality of everything he creates.",
      author: "Joan Wamboi",
      position: "Supervisor, Kenya Pipeline Company",
      focus: "Mission & Vision",
      color: "indigo",
    },
    {
      text: "'Applying Concepts to solve problems' isn't just a motto for Bruce--it's how he operates daily. I've seen him transform complex challenges into manageable pieces through this practical philosophy.",
      author: "Collaboration Partner",
      focus: "Motto",
      color: "green",
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto rotate testimonials
  useEffect(() => {
    if (isHovered || testimonials.length === 0) return;
    
    const intervalId = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, [isHovered, testimonials.length]);

  const getColorClasses = (color) => {
    const classes = {
      blue: { text: "text-blue-600", border: "border-blue-400", bg: "bg-blue-100", quote: "text-blue-200" },
      purple: { text: "text-purple-600", border: "border-purple-400", bg: "bg-purple-100", quote: "text-purple-200" },
      indigo: { text: "text-indigo-600", border: "border-indigo-400", bg: "bg-indigo-100", quote: "text-indigo-200" },
      green: { text: "text-green-600", border: "border-green-400", bg: "bg-green-100", quote: "text-green-200" },
    };
    return classes[color] || classes.blue;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="p-6 md:p-8 space-y-8">
        
        {/* --- Strategy Section --- */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full mr-4 shadow-sm">
              <Lightbulb className="w-5 h-5" />
            </span>
            My Learning Strategy
          </h3>
          <p className="text-gray-600 leading-relaxed">
            My approach to learning new tools (systems), both in and out of tech, centers on grasping their fundamental principles and underlying patterns. This focus ensures that as technologies evolve or new ones appear, I can adapt quickly because the core concepts often remain consistent or share common philosophies. Understanding one fundamental makes learning the next much faster.
          </p>
          <blockquote className="mt-4 pl-4 border-l-4 border-blue-200 italic text-gray-500">
            It's the power of mastering transferable concepts.
          </blockquote>
        </motion.div>

        {/* --- Philosophy Section --- */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full mr-4 shadow-sm">
              <Compass className="w-5 h-5" />
            </span>
            My Philosophy
          </h3>
          <p className="text-gray-600 leading-relaxed">
            When I encounter a challenge or something isn't behaving as expected, my first step is to identify the established principles I might be overlooking or need to understand more deeply. If existing concepts don't provide a clear path forward, I embrace the opportunity to architect a novel solution. I'm continually refining my problem-solving methods, actively seeking approaches that lead to robust and automated outcomes.
          </p>
          <blockquote className="mt-4 pl-4 border-l-4 border-purple-200 italic text-gray-500">
            Thank you for reading. This approach defines how I tackle challenges. It's Who I Am.
          </blockquote>
        </motion.div>

        {/* --- Mission Section --- */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-indigo-100"
        >
          <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-full mr-4 shadow-sm">
              <Target className="w-5 h-5" />
            </span>
            My Mission, Vision & Motto
          </h3>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-inner">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                🌟 使命 🌟 Make the world a better place
              </span>
              <span className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                🌟 想象 🌟 A model person who provides quality services
              </span>
              <span className="px-3 py-1.5 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium flex items-center gap-1">
                🌟 座右铭 🌟 Applying Concepts <Code className="w-4 h-4 animate-pulse" /> to solve problems + Moving On + Spread Joy
              </span>
            </div>
          </div>
        </motion.div>

        {/* --- Testimonials Section --- */}
        <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg md:text-xl font-bold mb-6 text-gray-800 flex items-center">
            <span className="w-10 h-10 flex items-center justify-center bg-green-600 text-white rounded-full mr-4 shadow-sm">
              <Quote className="w-5 h-5" />
            </span>
            What People Say
          </h3>

          <div 
            className="relative min-h-[200px] flex items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {(() => {
                  const testimonial = testimonials[activeTestimonial];
                  const colors = getColorClasses(testimonial.color);
                  
                  return (
                    <div className={`bg-white p-5 md:p-6 rounded-xl shadow-sm border-l-4 ${colors.border}`}>
                      <div className="flex items-start mb-4">
                        <Quote className={`w-8 h-8 mr-3 flex-shrink-0 ${colors.quote} rotate-180`} />
                        <p className="text-gray-600 leading-relaxed italic">
                          "{testimonial.text}"
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.author}</p>
                          <p className={`text-sm font-medium ${colors.text}`}>
                            {testimonial.position || `On my ${testimonial.focus}`}
                          </p>
                        </div>
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${colors.bg} ${colors.text}`}>
                          {activeTestimonial + 1} / {testimonials.length}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeTestimonial ? "bg-blue-600 w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* --- Social Links Section --- */}
        <div className="pt-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h3 className="font-bold text-gray-800">Spy on me via</h3>
            <MovingEyes />
          </div>
          
          <div className="flex justify-center gap-6">
            <a 
              href="https://www.linkedin.com/in/bruce-minanga-768a55240/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100 group-hover:shadow-md group-hover:border-blue-200 group-hover:bg-blue-50 transition-all duration-300">
                <Linkedin className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors">LinkedIn</span>
            </a>

            <a 
              href="https://github.com/bruceminanga" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100 group-hover:shadow-md group-hover:border-gray-300 group-hover:bg-gray-50 transition-all duration-300">
                <Github className="w-6 h-6 text-gray-800" />
              </div>
              <span className="text-sm font-medium text-gray-500 group-hover:text-gray-800 transition-colors">GitHub</span>
            </a>

            <a 
              href="https://www.hackerrank.com/profile/bruceminanga" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100 group-hover:shadow-md group-hover:border-green-200 group-hover:bg-green-50 transition-all duration-300">
                <Code className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-500 group-hover:text-green-600 transition-colors">HackerRank</span>
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ProfileDetails;