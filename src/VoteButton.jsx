import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://ta-back-080x.onrender.com";

export default function VoteButton({ category, competitorId, competitorName }) {
  const [loading, setLoading] = useState(false);
  const [voted, setVoted] = useState(false);
  const [votesUsed, setVotesUsed] = useState(0);

  const phone = localStorage.getItem("userPhone");
  const competitorStr = String(competitorId);

  const categoryVoteKey = `voted_${category}_${phone}`;
  const votedCandidateKey = `votedCandidate_${category}_${phone}`;

  useEffect(() => {
    const savedVotes = parseInt(localStorage.getItem("totalVotesUsed") || "0");
    setVotesUsed(savedVotes);

    const alreadyVotedCandidate = localStorage.getItem(votedCandidateKey);
    if (alreadyVotedCandidate === competitorStr) {
      setVoted(true);
    }
  }, [competitorStr, votedCandidateKey]);

  const handleVote = async () => {
    if (!phone) {
      toast.error("📱 Login first to vote!", {
        duration: 4000,
        position: "top-center",
      });
      return;
    }

    const ok = window.confirm("This vote cannot be changed.");
    if (!ok) {
      toast("Vote cancelled.", { icon: "❌", duration: 2000 });
      return;
    }

    const alreadyVotedCandidate = localStorage.getItem(votedCandidateKey);
    if (alreadyVotedCandidate) {
      const votedName = localStorage.getItem(`${votedCandidateKey}_name`);
      toast.error(
        `❌ You already voted for ${votedName || "another contestant"}!`,
        {
          duration: 5000,
          position: "top-center",
          icon: "⚠️",
        }
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/votes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          category,
          candidateId: competitorStr,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem(categoryVoteKey, "true");
        localStorage.setItem(votedCandidateKey, competitorStr);
        localStorage.setItem(`${votedCandidateKey}_name`, competitorName);
        localStorage.setItem("totalVotesUsed", data.votesUsed.toString());
        setVotesUsed(data.votesUsed);
        setVoted(true);
        toast.success(
          `🎉 VOTE SAVED for ${competitorName}! ${data.freeVotesLeft} free votes left`,
          {
            duration: 5000,
            position: "top-center",
            icon: "✅",
          }
        );
      } else if (
        data.upgradeRequired ||
        data.message?.includes("UPGRADE REQUIRED")
      ) {
        toast.error(`Used ${data.votesUsed}/5 votes. Upgrade for more!`, {
          duration: 5000,
          position: "top-center",
          icon: "🚀",
        });
        setTimeout(() => (window.location.href = "/upgrade"), 2000);
      } else if (data.message?.includes("already voted")) {
        toast.error(
          `❌ You already voted for ${data.previousVote || "another contestant"}!`,
          {
            duration: 5000,
            position: "top-center",
            icon: "⚠️",
          }
        );
      } else {
        toast.error(data.message || "Vote failed. Try again.", {
          duration: 4000,
          position: "top-center",
        });
      }
    } catch (err) {
      toast.error("🌐 Network error. Check connection and try again.", {
        duration: 4000,
        position: "top-center",
        icon: "📡",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      disabled={loading || voted}
      className={`
        w-full px-8 py-4 rounded-3xl font-bold text-lg tracking-wide
        relative overflow-hidden group shadow-2xl transform transition-all duration-300
        backdrop-blur-xl border-2
        focus:outline-none focus:ring-4 focus:ring-offset-2
        
        ${
          voted
            ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-400/50 shadow-emerald-500/25 cursor-default scale-100 hover:scale-100"
            : loading
            ? "bg-gradient-to-br from-slate-500 to-slate-600 text-white/80 border-slate-400/30 shadow-slate-500/20 animate-pulse"
            : "bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 hover:from-amber-500 hover:via-orange-500 hover:to-red-600 text-white border-amber-400/50 shadow-orange-500/40 hover:shadow-orange-500/60 hover:scale-[1.02] hover:-translate-y-0.5"
        }

        ${
          voted
            ? "after:absolute after:inset-0 after:bg-gradient-to-r after:from-emerald-400/30 after:to-teal-400/30 after:blur-xl after:animate-pulse-slow"
            : loading
            ? "after:absolute after:inset-0 after:bg-gradient-to-r after:from-slate-400/20 after:to-slate-500/20 after:blur-xl after:animate-pulse"
            : "hover:after:absolute hover:after:inset-0 hover:after:bg-gradient-to-r hover:after:from-amber-400/30 hover:after:to-orange-500/30 hover:after:blur-xl hover:after:animate-shimmer"
        }
      `}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength="1"
              opacity="0.3"
            />
            <path
              d="M12 2.5v5"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              pathLength="1"
              opacity="0.7"
            />
          </svg>
        )}

        <span className="font-heading font-black uppercase tracking-wider">
          {voted ? (
            <>
              <span className="text-sm">✅</span> Voted
            </>
          ) : loading ? (
            "Processing..."
          ) : (
            <>
              <span className="text-sm">🗳️</span> Vote Now
            </>
          )}
        </span>
      </div>

      {!loading && !voted && votesUsed > 0 && (
        <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-lg font-bold animate-bounce">
          {votesUsed}/5
        </div>
      )}
    </button>
  );
}
