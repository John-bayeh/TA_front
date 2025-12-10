import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

// Example user data (replace with your auth system)
const currentUser = {
  email: "user@example.com",
  firstName: "Telegram",
  lastName: "User",
};

// Example group data (initialize as empty object to avoid errors)
const initialGroupData = {};

const plans = [
  {
    id: "plus",
    name: "Telegram Plus",
    price: 20,
    votes: 3,
    color: "yellow",
    description: "A boosted voting package for stronger support",
    checkout_link:
      "https://checkout.chapa.co/checkout/web/payment/PL-MJEciyL3V3xA",
  },
  {
    id: "premium",
    name: "Telegram Premium",
    price: 40,
    votes: 6,
    color: "green",
    description: "The ultimate voting boost with double power",
    checkout_link:
      "https://checkout.chapa.co/checkout/web/payment/PL-MJEciyL3V3xA",
  },
];

export default function Upgrade() {
  const navigate = useNavigate();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [groupData, setGroupData] = useState(initialGroupData);

  // Load Chapa checkout script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.chapa.co/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      console.log("Chapa script loaded ✅");
      setScriptLoaded(true);
    };

    script.onerror = () => {
      console.error("Failed to load Chapa script ❌");
      setScriptLoaded(false);
    };

    document.body.appendChild(script);

    const timeout = setTimeout(() => {
      if (!window.ChapaCheckout) {
        console.warn("Chapa script is taking too long to load...");
        setScriptLoaded(false);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  // Safe checkInGroup function (placeholder)
  const checkInGroup = () => {
    Object.keys(groupData || {}).forEach((key) => {
      console.log(key, groupData[key]);
    });
  };

  const handleClick = (plan) => {
    if (scriptLoaded && window.ChapaCheckout) {
      const tx_ref = `tx-${Date.now()}`;

      window.ChapaCheckout({
        public_key: "CHAPUBK_TEST-HcDjAS20cJ6Yxg188ZBsyuWBqD5sRwAp",
        tx_ref,
        amount: plan.price,
        currency: "ETB",
        email: currentUser.email,
        first_name: currentUser.firstName,
        last_name: currentUser.lastName,
        title: plan.name,
        description: plan.description,
        callback_url: "https://yourwebsite.com/payment-success",
        return_url: "https://yourwebsite.com/thank-you",
        customization: {
          title: plan.name,
          description: plan.description,
          logo: "https://yourwebsite.com/logo.png",
        },
      });
    } else {
      window.open(plan.checkout_link, "_blank");
    }
  };

  return (
    <div className="bg-black w-full min-h-screen text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/home")}
          className="underline text-gray-300"
        >
          Home
        </button>
      </div>

      <h1 className="text-4xl text-center mb-2">Choose Your Plan</h1>
      <p className="text-center text-gray-400 mb-8">
        Boost your votes with Telegram Plus or Premium.
      </p>

      <hr className="border-gray-600 mb-10" />

      <div className="flex flex-col md:flex-row justify-center gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border border-gray-700 bg-gray-900 rounded-2xl p-6 w-full md:w-1/3 flex flex-col items-center text-center"
          >
            <h2 className={`text-2xl font-bold mb-2 text-${plan.color}-400`}>
              {plan.name}
            </h2>
            <p className="text-gray-400 mb-4">{plan.description}</p>
            <ul className="mb-4">
              <li className="font-bold text-xl">{plan.price} Birr</li>
              <li>{plan.votes} extra votes per category</li>
              <li>Valid for all categories</li>
            </ul>
            <button
              onClick={() => handleClick(plan)}
              className={`bg-${plan.color}-500 hover:bg-${plan.color}-400 px-6 py-3 rounded-xl font-semibold transition`}
            >
              {scriptLoaded ? "Subscribe Now" : "Pay via Chapa"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
