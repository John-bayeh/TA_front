// CategoriesGrid.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "./categoriesData";

export default function CategoriesGrid() {
  const navigate = useNavigate();

  const handleCategoryClick = (route) => {
    const isAuthed = localStorage.getItem("authUser") === "true";
    const phone = localStorage.getItem("userPhone");

    if (!isAuthed || !phone) {
      alert("Please login first to vote.");
      navigate("/login");
      return;
    }

    navigate(route);
  };

  return (
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
  );
}
