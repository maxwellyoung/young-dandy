"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/sanity";

const heroContent = [
  { title: "Morning Brews.", color: "#FFF6AF" },
  { title: "Fine Foods.", color: "#F8D5D2" },
  { title: "Now Open.", color: "#547A48" },
];

const menuCategories = ["Breakfast", "Lunch", "Drinks"] as const;

type MenuCategory = (typeof menuCategories)[number];

type MenuItem = {
  _id: string;
  name: string;
  price: string;
};

type MenuItems = {
  [K in MenuCategory]: MenuItem[];
};

type SanityMenuItem = {
  _id: string;
  name: string;
  price: string;
  category: MenuCategory;
};

const storyContent = [
  {
    title: "Passion",
    content:
      "Young Dandy celebrates Auckland's vibrant food culture, believing in the power of perfectly crafted coffee and meals to brighten days and bring people together.",
  },
  {
    title: "Quality",
    content:
      "We carefully source the finest local ingredients, from farm-fresh eggs to artisanal breads, ensuring quality is at the heart of everything we serve.",
  },
  {
    title: "Ambiance",
    content:
      "Our cafe is designed as a warm, inviting space where aesthetics meet comfort, creating the perfect environment for good food and great company to flourish.",
  },
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] =
    useState<MenuCategory>("Breakfast");
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const menuRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  const [menuItems, setMenuItems] = useState<MenuItems>({
    Breakfast: [],
    Lunch: [],
    Drinks: [],
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const query = `*[_type == "menuItem"]{
        _id,
        name,
        price,
        category
      }`;
      const items: SanityMenuItem[] = await client.fetch(query);
      const categorizedItems = items.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {} as MenuItems);
      setMenuItems(categorizedItems);
    };

    fetchMenuItems();
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-black text-center px-4"
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
                onClick={() => setActiveCategory(category)}
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
              {menuItems[activeCategory]?.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex justify-between items-center py-3 border-b border-gray-200"
                >
                  <span className="text-lg">{item.name}</span>
                  <span className="text-lg font-medium">{item.price}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Our Story Section */}
      <section
        ref={aboutRef}
        className="min-h-screen bg-white text-black py-20 px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-16 text-center">
          Our Story
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            {storyContent.map((story, index) => (
              <motion.button
                key={story.title}
                className={`text-2xl font-medium mb-4 md:mb-0 ${
                  index === activeStoryIndex ? "text-black" : "text-gray-400"
                }`}
                onClick={() => setActiveStoryIndex(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {story.title}
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.div
                className="absolute -left-4 top-0 w-1 h-full bg-black"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5 }}
              />
              <p className="text-xl leading-relaxed pl-4">
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.558756914432!2d174.77659767698628!3d-36.85304227974718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d49bfab7905e3%3A0x74837bf48f7ea5c3!2sYoung%20Dandy%20Cafe!5e0!3m2!1sen!2snz!4v1729576961700!5m2!1sen!2snz"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
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
