"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const heroContent = [
  { title: "Morning Brews.", color: "#FFF6AF" },
  { title: "Fine Foods.", color: "#F8D5D2" },
  { title: "Now Open.", color: "#547A48" },
];

const menuCategories = ["Breakfast", "Lunch", "Drinks"];

// Define the menu items type
type MenuItem = {
  name: string;
  price: string;
};

type MenuCategories = {
  Breakfast: MenuItem[];
  Lunch: MenuItem[];
  Drinks: MenuItem[];
};

const menuItems: MenuCategories = {
  Breakfast: [
    { name: "Eggs Benedict", price: "$12" },
    { name: "Avocado Toast", price: "$10" },
    { name: "Pancakes", price: "$8" },
  ],
  Lunch: [
    { name: "Caesar Salad", price: "$14" },
    { name: "Chicken Sandwich", price: "$16" },
    { name: "Veggie Burger", price: "$15" },
  ],
  Drinks: [
    { name: "Latte", price: "$4" },
    { name: "Iced Tea", price: "$3" },
    { name: "Smoothie", price: "$6" },
  ],
};

const storyContent = [
  {
    title: "Passion",
    content:
      "Young Dandy celebrates Auckland's vibrant food culture, believing in the power of perfectly crafted coffee and meals to brighten days and bring people together.",
    icon: "☕️",
  },
  {
    title: "Quality",
    content:
      "We carefully source the finest local ingredients, from farm-fresh eggs to artisanal breads, ensuring quality is at the heart of everything we serve.",
    icon: "🥚",
  },
  {
    title: "Ambiance",
    content:
      "Our cafe is designed as a warm, inviting space where aesthetics meet comfort, creating the perfect environment for good food and great company to flourish.",
    icon: "🪴",
  },
];

const googleMapsEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.5785269419396!2d174.77559661744384!3d-36.85811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d47f1d1b1b1b1%3A0x500ef6143a2e900!2s118%20Parnell%20Rd%2C%20Parnell%2C%20Auckland%201052%2C%20New%20Zealand!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus";

export function HomePageComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] =
    useState<keyof MenuCategories>("Breakfast");
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const menuRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ backgroundColor: heroContent[currentIndex].color }}
          >
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl font-bold text-black"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {heroContent[currentIndex].title}
            </motion.h1>
          </motion.div>
        </AnimatePresence>
        <nav className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-6">
          <div className="text-2xl font-bold text-black">YOUNG DANDY</div>
          <ul className="hidden sm:flex space-x-6">
            <li>
              <Button
                variant="ghost"
                className="text-black hover:text-black/70"
                onClick={() => scrollToSection(menuRef)}
              >
                Menu
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="text-black hover:text-black/70"
                onClick={() => scrollToSection(aboutRef)}
              >
                About
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="text-black hover:text-black/70"
                onClick={() => setIsMapOpen(true)}
              >
                Visit
              </Button>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-black">
          <p className="text-sm">118 Parnell Road, Auckland</p>
          <p className="text-sm">Open Mon - Fri 7-3 | Sat - Sun 8-3</p>
        </div>
      </section>

      {/* Menu Section */}
      <section
        ref={menuRef}
        className="min-h-screen bg-white text-black py-20 px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-12 text-center">
          Menu
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-8">
            {menuCategories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setActiveCategory(category as keyof MenuCategories)
                }
                className={`px-4 py-2 mx-2 text-lg font-medium transition-colors duration-300 ${
                  activeCategory === category
                    ? "text-black border-b-2 border-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {(menuItems[activeCategory as keyof typeof menuItems] || []).map(
                (item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex justify-between items-center py-3 border-b border-gray-200"
                  >
                    <span className="text-lg">{item.name}</span>
                    <span className="text-lg font-medium">{item.price}</span>
                  </motion.div>
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Our Story Section */}
      <section
        ref={aboutRef}
        className="min-h-screen bg-[#F8F8F8] text-black py-20 px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-16 text-center">
          Our Story
        </h2>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storyContent.map((story, index) => (
              <motion.div
                key={story.title}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setActiveStoryIndex(index)}
              >
                <div
                  className={`h-40 flex items-center justify-center text-6xl ${
                    index === activeStoryIndex
                      ? "bg-black text-white"
                      : "bg-gray-100 text-black"
                  }`}
                >
                  {story.icon}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{story.title}</h3>
                  <p className="text-gray-600 line-clamp-3">{story.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-12 bg-white rounded-2xl shadow-lg p-8"
            >
              <h3 className="text-3xl font-semibold mb-4">
                {storyContent[activeStoryIndex].title}
              </h3>
              <p className="text-xl leading-relaxed">
                {storyContent[activeStoryIndex].content}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Visit Modal */}
      <AnimatePresence>
        {isMapOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsMapOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-6 rounded-lg max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">Visit Us</h3>
              <p className="mb-4">118 Parnell Road, Auckland</p>
              <div className="aspect-video w-full">
                <iframe
                  src={googleMapsEmbedUrl}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => setIsMapOpen(false)}>Close</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
