import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import trophy from "./assets/trophy.jpg";
import Home_award from "./assets/home_awrd.png";
import backgroundimage from "./assets/a.jpg";
import CategoriesGrid from "./categoriesgrid"; // ✅ shared grid

export default function Home() {
  const navigate = useNavigate();

  const targetDate = new Date("2025-12-25T00:00:00");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });
  const [totalVotes, setTotalVotes] = useState(0);

  // votes counter
  useEffect(() => {
    const updateVotes = () => {
      const votesUsed = parseInt(
        localStorage.getItem("totalVotesUsed") || "0",
        10
      );
      setTotalVotes(votesUsed);
    };

    updateVotes();
    const interval = setInterval(updateVotes, 300);
    window.addEventListener("storage", updateVotes);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", updateVotes);
    };
  }, []);

  // countdown
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, mins, secs });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="bg-black w-full min-h-screen flex flex-col text-gray-200">
      {/* Top Background Banner */}
      <div
        style={{ backgroundImage: `url(${backgroundimage})` }}
        className="w-full h-60 sm:h-72 md:h-80 bg-cover bg-center relative"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 text-center">
          {/* votes left */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            <div className="px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-green-600 text-white font-semibold text-xs sm:text-sm shadow">
              {5 - totalVotes}/5
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            Telegram Award 2025
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mt-2 sm:mt-3">
            Discover | Vote | Celebrate
          </p>
        </div>
      </div>

      {/* Navbar */}
      <section className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-black/40 backdrop-blur-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-b border-gray-700 shadow-md sticky top-0 z-50 gap-3 sm:gap-0">
        <div className="flex items-center gap-3">
          <img
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            src={trophy}
            alt="Trophy"
          />
          <span className="font-bold text-base sm:text-lg">
            Telegram Award
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 md:gap-8">
          <nav>
            <ol className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-white font-medium text-sm sm:text-base">
              <li className="hover:text-yellow-400 transition">
                <Link to="/home">Home</Link>
              </li>
              <li className="hover:text-yellow-400 transition">
                <Link to="/category">Category</Link>
              </li>
              <li className="hover:text-yellow-400 transition">
                <Link to="/upgrade">Upgrade</Link>
              </li>
              <li className="hover:text-yellow-400 transition">
                <Link to="/logout">Logout</Link>
              </li>
            </ol>
          </nav>

          <button
            onClick={() => navigate("/login")}
            className="bg-yellow-500 text-black px-4 sm:px-5 py-2 rounded-xl font-semibold text-sm sm:text-base shadow hover:bg-yellow-400 transition self-center"
          >
            Login To Vote
          </button>
        </div>
      </section>

      {/* Hero Section (Video) */}
      <section className="h-64 sm:h-80 md:h-[450px] w-full relative">
        <video
          className="w-full h-full object-cover"
          src={Home_award}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold drop-shadow-xl">
            Vote For Your Favorites
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-gray-300 mt-2 sm:mt-3 max-w-xl">
            Celebrate top Telegram creators & communities
          </p>
        </div>
      </section>

      {/* Countdown */}
      <section className="mt-10 sm:mt-12 text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          Voting Countdown
        </h2>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-center">
          {["Days", "Hours", "Mins", "Secs"].map((label, i) => {
            const value = [
              timeLeft.days,
              timeLeft.hours,
              timeLeft.mins,
              timeLeft.secs,
            ][i];
            return (
              <div
                key={i}
                className="bg-gray-800/70 px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-lg border border-gray-600 min-w-[70px]"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  {value}
                </div>
                <div className="text-yellow-400 text-xs sm:text-sm mt-1">
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Important Dates */}
      <section className="mt-10 sm:mt-14 border border-gray-700 px-4 py-5 sm:p-6 rounded-xl bg-gray-900/40 backdrop-blur-md max-w-xl sm:max-w-2xl mx-auto shadow-xl">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Important Dates
        </h2>
        <div className="flex flex-col gap-5 sm:gap-6 text-left text-sm sm:text-base">
          <div>
            <div className="text-yellow-400 font-semibold text-base sm:text-lg">
              Voting Starts
            </div>
            <div className="text-lg sm:text-xl font-bold mt-1">
              October 25, 2025
            </div>
          </div>
          <div>
            <div className="text-yellow-400 font-semibold text-base sm:text-lg">
              Voting Ends
            </div>
            <div className="text-lg sm:text-xl font-bold mt-1">
              December 24, 2025
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid – shared with Category.jsx */}
      <section className="px-4 sm:px-6 md:px-8 w-full max-w-6xl mx-auto mt-10 sm:mt-14">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center">
          Award Categories
        </h2>

        <CategoriesGrid />
      </section>

      {/* Footer */}
      <footer className="mt-10 sm:mt-16 text-gray-500 pb-4 sm:pb-6 text-center text-xs sm:text-sm px-4">
        © 2025 Telegram Awards — All Rights Reserved
      </footer>
    </div>
  );
}
