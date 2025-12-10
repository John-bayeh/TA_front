// categoriesData.js
import sport from "./assets/sportchannel.jpg";
import meme from "./assets/memechannel.jpg";
import tech from "./assets/educationchannel.jpg";
import entartain from "./assets/11.jpeg";
import bot from "./assets/bot.jpg";
import lifestyle from "./assets/lifestyle.jpg";
import news from "./assets/news.jpg";

export const categories = [
  { name: "Best Tech Group", desc: "Award for Tech groups", img: tech, route: "/category/tech" },
  { name: "Best Sport", desc: "Award for Sports groups", img: sport, route: "/category/sport" },
  { name: "Best Entertainment", desc: "Award for Entertainment groups", img: entartain, route: "/category/entertainment" },
  { name: "Best Meme Group", desc: "Award for Meme groups", img: meme, route: "/category/meme" },
  { name: "Best Bot", desc: "Award for Bots", img: bot, route: "/category/bot" },
  { name: "Best News", desc: "Award for News channels", img: news, route: "/category/news" },
  { name: "Best Lifestyle", desc: "Award for Lifestyle channels", img: lifestyle, route: "/category/lifestyle" },
];
