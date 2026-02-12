import { useState } from "react";
import { motion } from "framer-motion";

interface MyPlanReferralsScreenProps {
  onBack: () => void;
}

export function MyPlanReferralsScreen({ onBack }: MyPlanReferralsScreenProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Mock data
  const currentPlan = {
    name: "Premium Plus",
    price: "$19.99/month",
    features: ["Unlimited Matches", "Advanced Filters", "Read Receipts", "Profile Boost", "Priority Support"],
    renewalDate: "2024-03-15",
    status: "active"
  };

  const referralStats = {
    totalReferrals: 12,
    successfulReferrals: 8,
    pendingReferrals: 4,
    earnedRoses: 160,
    earnedExtensions: 8 // weeks
  };

  const referralHistory = [
    { id: "r1", name: "Sarah Johnson", status: "successful", date: "2024-02-10", reward: "20 Roses + 1 Week" },
    { id: "r2", name: "Mike Chen", status: "successful", date: "2024-02-08", reward: "20 Roses + 1 Week" },
    { id: "r3", name: "Emma Davis", status: "pending", date: "2024-02-12", reward: "Pending" },
    { id: "r4", name: "Alex Wilson", status: "successful", date: "2024-02-05", reward: "20 Roses + 1 Week" }
  ];

  // Generate unique referral link
  const generateReferralLink = () => {
    const userId = "user123456"; // In real app, this would come from auth
    return `https://yourapp.com/referral?user=${userId}&code=REF${Date.now()}`;
  };

  const referralLink = generateReferralLink();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform: string) => {
    const message = `Join me on this amazing app! Use my referral link: ${referralLink}`;
    let url = '';

    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
        break;
      case 'email':
        url = `mailto:?subject=Join me on this app&body=${encodeURIComponent(message)}`;
        break;
      default:
        return;
    }

    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#FFFFFF] border-b border-[#F2F2F2] px-4 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#1A1A1A] font-medium"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          My Plan & Referrals
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Current Plan Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Current Plan</h2>
          <div className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A]">{currentPlan.name}</h3>
                <p className="text-sm text-[#717171]">{currentPlan.price}</p>
                <p className="text-xs text-[#717171]">Renews {new Date(currentPlan.renewalDate).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Active
                </span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              {currentPlan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#1A1A1A]">{feature}</span>
                </div>
              ))}
            </div>
            
            <button className="w-full bg-[#67295F] text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
              Upgrade Plan
            </button>
          </div>
        </motion.div>

        {/* Referral Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Recommend & Get Credits</h2>
          
          {/* Referral Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile p-4 text-center">
              <div className="text-2xl font-bold text-[#67295F]">{referralStats.earnedRoses}</div>
              <p className="text-xs text-[#717171]">Roses Earned</p>
            </div>
            <div className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile p-4 text-center">
              <div className="text-2xl font-bold text-[#67295F]">{referralStats.earnedExtensions}</div>
              <p className="text-xs text-[#717171]">Weeks Extension</p>
            </div>
          </div>

          {/* Referral Link */}
          <div className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile p-4 mb-4">
            <h3 className="font-semibold text-[#1A1A1A] mb-2">Your Referral Link</h3>
            <div className="bg-[#F8F8F8] p-3 rounded-lg mb-3">
              <p className="text-xs text-[#717171] break-all">{referralLink}</p>
            </div>
            <button
              onClick={handleCopyLink}
              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                copiedLink 
                  ? 'bg-green-500 text-white' 
                  : 'bg-[#67295F] text-white hover:bg-opacity-90'
              }`}
            >
              {copiedLink ? '✓ Copied!' : 'Copy Link'}
            </button>
          </div>

          {/* Share Options */}
          <div className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile p-4 mb-4">
            <h3 className="font-semibold text-[#1A1A1A] mb-3">Share Via</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex flex-col items-center gap-2 p-3 border border-[#F2F2F2] rounded-lg hover:bg-[#F2F2F2] transition-colors"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">W</span>
                </div>
                <span className="text-xs text-[#1A1A1A]">WhatsApp</span>
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="flex flex-col items-center gap-2 p-3 border border-[#F2F2F2] rounded-lg hover:bg-[#F2F2F2] transition-colors"
              >
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">X</span>
                </div>
                <span className="text-xs text-[#1A1A1A]">Twitter</span>
              </button>
              <button
                onClick={() => handleShare('email')}
                className="flex flex-col items-center gap-2 p-3 border border-[#F2F2F2] rounded-lg hover:bg-[#F2F2F2] transition-colors"
              >
                <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">@</span>
                </div>
                <span className="text-xs text-[#1A1A1A]">Email</span>
              </button>
            </div>
          </div>

          {/* Reward Info */}
          <div className="bg-gradient-to-r from-[#67295F] to-[#8B3F7A] text-white rounded-tile p-4 mb-4">
            <h3 className="font-bold mb-2">🎁 Reward Structure</h3>
            <p className="text-sm mb-2">Get <strong>20 Roses</strong> and <strong>1 week Extension</strong> for every successful referral!</p>
            <p className="text-xs opacity-90">A successful referral is when your friend signs up for any paid plan.</p>
          </div>
        </motion.div>

        {/* Referral History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Referral History</h2>
          <div className="space-y-3">
            {referralHistory.map((referral, index) => (
              <motion.div
                key={referral.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-[#1A1A1A]">{referral.name}</h4>
                    <p className="text-xs text-[#717171]">{new Date(referral.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      referral.status === 'successful' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {referral.status === 'successful' ? '✓ Success' : '⏳ Pending'}
                    </span>
                    <p className="text-xs text-[#717171] mt-1">{referral.reward}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">How It Works</h2>
          <div className="bg-[#FFFFFF] border border-[#F2F2F2] rounded-tile p-4">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-[#67295F] text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] text-sm">Share Your Link</h4>
                  <p className="text-xs text-[#717171]">Copy your unique referral link and share it with friends</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-[#67295F] text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] text-sm">Friend Signs Up</h4>
                  <p className="text-xs text-[#717171]">Your friend uses your link to sign up for any paid plan</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-[#67295F] text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] text-sm">Get Rewarded</h4>
                  <p className="text-xs text-[#717171]">Receive 20 Roses and 1 week extension automatically</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
