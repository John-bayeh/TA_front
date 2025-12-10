import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DEMO_OTP = "111111";

function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOTP = (e) => {
    e.preventDefault();

    // Allow ANY number: must contain at least ~7 digits
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7) {
      alert("Enter a valid phone number (any country).");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      alert(`Demo OTP (for any number): ${DEMO_OTP}`);
    }, 500);
  };

 const API_BASE =
  import.meta.env.VITE_API_BASE || "https://ta-back-080x.onrender.com";


const verifyOTP = async (e) => {
  e.preventDefault();

  if (otp !== DEMO_OTP) {
    alert("Invalid demo OTP. Use 111111.");
    return;
  }

  // clear old voting state
  localStorage.removeItem("totalVotesUsed");
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("voted_") || key.startsWith("votedCandidate_")) {
      localStorage.removeItem(key);
    }
  });

  // 1) Save locally for frontend guards
  localStorage.setItem("userPhone", phone);
  localStorage.setItem("authUser", "true");

  // 2) Tell backend to create/init the user in Mongo
    try {
    await fetch(`${API_BASE}/user/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }), // or { uid: phone, phone }
    });
  } catch (err) {

    console.error("initUser error", err);
    // optional: show toast, but don't block demo login
  }

  alert("Demo login successful!");
  navigate("/home");
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-indigo-950 flex flex-col items-center justify-center px-4">
      <div className="relative z-10 mb-4">
        <p className="text-sm text-slate-300 text-center mb-2">
          Demo login for Telegram Awards (any phone number, OTP 111111)
        </p>
      </div>

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl p-8 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-white text-center mb-2">
            Telegram Awards Login (Demo)
          </h1>

          {!otpSent ? (
            <form onSubmit={sendOTP}>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+1 555 123 4567 or +86 138 0000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-4"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-2 px-4 py-3 rounded-2xl font-semibold text-white text-center shadow-lg transition-all 
                  ${
                    loading
                      ? "bg-slate-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 hover:-translate-y-0.5"
                  }`}
              >
                {loading ? "Sending OTP..." : "Send Demo OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={verifyOTP}>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                placeholder="111111"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 mb-4 tracking-[0.3em] text-center"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-2 px-4 py-3 rounded-2xl font-semibold text-white text-center shadow-lg transition-all 
                  ${
                    loading
                      ? "bg-slate-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-500 hover:-translate-y-0.5"
                  }`}
              >
                {loading ? "Verifying..." : "Verify OTP & Continue"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                }}
                className="w-full mt-4 text-xs text-slate-300 hover:text-white underline underline-offset-4"
              >
                Change phone number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
