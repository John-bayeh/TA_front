import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import sport from "./assets/sportchannel.jpg";
import meme from "./assets/memechannel.jpg";
import tech from "./assets/educationchannel.jpg";
import entartain from "./assets/11.jpeg";
import bot from "./assets/bot.jpg";
import lifestyle from "./assets/lifestyle.jpg";
import news from "./assets/news.jpg";

export default function Category() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState(null);

  // ✅ Protect route using localStorage set by your demo Login
  useEffect(() => {
    const storedPhone = localStorage.getItem("userPhone");
    const authUser = localStorage.getItem("authUser");

    if (!storedPhone || authUser !== "true") {
      navigate("/login", { replace: true });
    } else {
      setPhone(storedPhone);
      setLoading(false);
    }
  }, [navigate]);

  const categories = [
    { name: "Best Tech Group", desc: "Award for Tech groups", img: tech, route: "/category/tech" },
    { name: "Best Sport", desc: "Award for Sports groups", img: sport, route: "/category/sport" },
    { name: "Best Entertainment", desc: "Award for Entertainment groups", img: entartain, route: "/category/entertainment" },
    { name: "Best Meme Group", desc: "Award for Meme groups", img: meme, route: "/category/meme" },
    { name: "Best Bot", desc: "Award for Bots", img: bot, route: "/category/bot" },
    { name: "Best News", desc: "Award for News channels", img: news, route: "/category/news" },
    { name: "Best Lifestyle", desc: "Award for Lifestyle channels", img: lifestyle, route: "/category/lifestyle" },
  ];

  // ✅ Logout that clears demo auth + voting state
  const handleLogout = () => {
    localStorage.removeItem("userPhone");
    localStorage.removeItem("authUser");
    localStorage.removeItem("totalVotesUsed");
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("voted_") || key.startsWith("votedCandidate_")) {
        localStorage.removeItem(key);
      }
    });
    navigate("/login", { replace: true });
  };

  const handleCategoryClick = (route) => {
    navigate(route);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl sm:text-2xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-8 sm:py-10 px-4">
      {/* Navbar */}
      <section className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-black/40 backdrop-blur-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-b border-gray-700 sticky top-0 z-50 gap-4 sm:gap-0 shadow-lg">
        <div className="font-bold text-lg sm:text-xl text-center sm:text-left flex items-center gap-2">
          🏆 Telegram Award
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-end gap-3 sm:gap-6 w-full sm:w-auto">
          <div
            className="hover:text-yellow-400 cursor-pointer text-sm sm:text-base px-3 py-1 rounded-lg hover:bg-yellow-500/10 transition-all"
            onClick={() => navigate("/home")}
          >
            Home
          </div>

          <div
            className="hover:text-yellow-400 cursor-pointer text-sm sm:text-base px-3 py-1 rounded-lg hover:bg-yellow-500/10 transition-all"
            onClick={() => navigate("/upgrade")}
          >
            Upgrade
          </div>

          {phone && (
            <div className="text-xs sm:text-sm text-gray-300 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-600 truncate max-w-xs sm:max-w-none">
              📱 {phone}
            </div>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500/90 hover:bg-red-600 text-white px-4 sm:px-6 py-2 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-red-500/25 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            Logout
          </button>
        </div>
      </section>

      {/* Header */}
      <div className="text-center mb-8 sm:mb-10 mt-6 sm:mt-8 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent leading-tight">
          Award Categories
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-md sm:max-w-lg mx-auto px-2">
          Explore the categories that honor creative excellence on Telegram.
        </p>
      </div>

      {/* Categories grid */}
      <section className="px-2 sm:px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.route)}
              className="cursor-pointer bg-gradient-to-br from-gray-900/70 to-gray-800/50 border-2 border-gray-700/50 hover:border-yellow-500/70 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/30 hover:scale-[1.02] transition-all duration-300 group flex flex-col h-full"
            >
              <div className="w-full h-32 sm:h-40 md:h-44 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-5 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-center mb-2 px-2 leading-tight">
                {cat.name}
              </h3>

              <p className="text-gray-400 text-sm sm:text-base md:text-lg text-center leading-relaxed flex-1">
                {cat.desc}
              </p>

              <div className="mt-3 pt-3 border-t border-gray-700/50">
                <span className="inline-block bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  Vote Now →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-20 sm:h-24" />
    </section>
  );
}
