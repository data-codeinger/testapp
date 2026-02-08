import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceCallModalProps {
  open: boolean;
  onClose: () => void;
  companionName: string;
  companionAvatar: string;
}

export function VoiceCallModal({ open, onClose, companionName, companionAvatar }: VoiceCallModalProps) {
  const [callDuration, setCallDuration] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isCallActive) {
      interval = window.setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = () => {
    setIsCallActive(true);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
    onClose();
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleSpeakerToggle = () => {
    setIsSpeakerOn(!isSpeakerOn);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-800"
          />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative h-full flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 pt-12">
              <button
                onClick={handleEndCall}
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4.445 4.445a.5.5 0 0 1 .707 0L10 9.293l4.848-4.848a.5.5 0 0 1 .707.707L10.707 10l4.848 4.848a.5.5 0 0 1-.707.707L10 10.707l-4.848 4.848a.5.5 0 0 1-.707-.707L9.293 10 4.445 5.152a.5.5 0 0 1 0-.707z"/>
                </svg>
              </button>
              
              <div className="text-white text-center">
                <div className="text-sm opacity-80">
                  {isCallActive ? 'On call with' : 'Calling'}
                </div>
                <div className="text-lg font-semibold">
                  {companionName}
                </div>
                {isCallActive && (
                  <div className="text-sm opacity-80 mt-1">
                    {formatDuration(callDuration)}
                  </div>
                )}
              </div>
              
              <div className="w-12" />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20">
                  <img
                    src={companionAvatar}
                    alt={companionName}
                    className="h-full w-full object-cover"
                  />
                </div>
                {isCallActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                      <path d="M3 5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5z"/>
                    </svg>
                  </motion.div>
                )}
              </motion.div>

              {/* Call Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 text-center"
              >
                {!isCallActive ? (
                  <div>
                    <div className="text-white text-lg font-medium">Ringing...</div>
                    <div className="text-white/60 text-sm mt-2">
                      {companionName} is being called
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-white text-lg font-medium">Connected</div>
                    <div className="text-white/60 text-sm mt-2">
                      Voice call in progress
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Controls */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-6 pb-12"
            >
              <div className="flex items-center justify-center gap-6">
                {/* Mute Button */}
                <button
                  onClick={handleMuteToggle}
                  className={`p-4 rounded-full transition-colors ${
                    isMuted 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
                  }`}
                >
                  {isMuted ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                    </svg>
                  )}
                </button>

                {/* Main Call Button */}
                <button
                  onClick={isCallActive ? handleEndCall : handleStartCall}
                  className={`p-6 rounded-full transition-all transform hover:scale-105 ${
                    isCallActive
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isCallActive ? (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.58.88-.98.41-1.87.95-2.66 1.57L2.49 13c-.19-.15-.49-.15-.68 0l-1.23 1.23c-.19.19-.19.49 0 .68l3.57 3.57c.41.41 1.03.47 1.5.13 1.26-.89 2.68-1.49 4.2-1.78.31-.06.63.06.78.34.59 1.08 1.73 1.83 3.04 1.83 1.93 0 3.5-1.57 3.5-3.5S13.93 9 12 9z"/>
                    </svg>
                  ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                    </svg>
                  )}
                </button>

                {/* Speaker Button */}
                <button
                  onClick={handleSpeakerToggle}
                  className={`p-4 rounded-full transition-colors ${
                    isSpeakerOn 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
                  }`}
                >
                  {isSpeakerOn ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
                    </svg>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
