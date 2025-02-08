import React, { useState, useRef } from "react";
import {
  Search,
  MoreVertical,
  Phone,
  Video,
  Send,
  Paperclip,
  Smile,
  Mic,
  Menu,
  Image,
  X,
  ChevronLeft,
} from "lucide-react";
import Sidebar from "./Sidebar";
import MessageList from "./MessageList";
import EmojiPicker from "./EmojiPicker";
import ChatInput from "../ui/ChatInput";

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unread: number;
  online: boolean;
}

export default function ChatLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isInCall, setIsInCall] = useState<"audio" | "video" | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    setIsSidebarOpen(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setIsEmojiPickerOpen(false);
  };

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const startCall = (type: "audio" | "video") => {
    setIsInCall(type);
  };

  const endCall = () => {
    setIsInCall(null);
  };

  return (
    <div className="flex h-screen bg-slate-100 relative">
      {/* Mobile Menu Button */}

      {/* Sidebar */}
      <div
        className={`
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        fixed lg:relative 
        w-full xs:w-[320px] sm:w-[380px] lg:w-96 
        h-full 
        z-40 
        transition-transform duration-300 ease-in-out
        bg-white
        lg:translate-x-0 lg:block
      `}
      >
        <Sidebar
          onClose={() => setIsSidebarOpen(false)}
          onChatSelect={handleChatSelect}
          selectedChatId={selectedChat?.id}
        />
      </div>

      {/* Main Chat Area */}
      <div
        className={`
        flex-1 flex flex-col bg-white  shadow-xl relative
        ${isSidebarOpen ? "hidden lg:flex" : "flex"}
      `}
      >
        {/* Chat Header */}
        <div className="bg-white px-2 xs:px-3 sm:px-4 py-2 xs:py-3 flex items-center justify-between lg:rounded-l-3xl shadow-sm">
          <div className="flex items-center space-x-2 xs:space-x-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-1.5 -ml-1 hover:bg-slate-50 rounded-full"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            {selectedChat && (
              <>
                <div className="relative">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    className="w-8 h-8 xs:w-10 xs:h-10 rounded-xl xs:rounded-2xl object-cover"
                  />
                  {selectedChat.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-sm xs:text-base font-bold text-gray-900">
                    {selectedChat.name}
                  </h2>
                  <p className="text-[10px] xs:text-xs text-gray-500">
                    {selectedChat.online ? "Active now" : "Offline"}
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-0.5 xs:gap-1">
            <button
              onClick={() => startCall("video")}
              className="p-1.5 xs:p-2 rounded-lg xs:rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors"
            >
              <Video className="h-4 w-4 xs:h-5 xs:w-5 text-indigo-600" />
            </button>
            <button
              onClick={() => startCall("audio")}
              className="p-1.5 xs:p-2 rounded-lg xs:rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors"
            >
              <Phone className="h-4 w-4 xs:h-5 xs:w-5 text-indigo-600" />
            </button>
            <button className="hidden sm:block p-1.5 xs:p-2 rounded-lg xs:rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors">
              <Search className="h-4 w-4 xs:h-5 xs:w-5 text-indigo-600" />
            </button>
            <button className="p-1.5 xs:p-2 rounded-lg xs:rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors">
              <MoreVertical className="h-4 w-4 xs:h-5 xs:w-5 text-indigo-600" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <MessageList />

        {/* Selected File Preview */}
        {selectedFile && (
          <div className="px-2 xs:px-3 sm:px-4 pt-2 xs:pt-3">
            <div className="flex items-center space-x-2 bg-slate-50 p-1.5 xs:p-2 rounded-lg">
              <Image className="h-4 w-4 xs:h-5 xs:w-5 text-slate-400" />
              <span className="text-xs xs:text-sm text-slate-600 truncate flex-1">
                {selectedFile.name}
              </span>
              <button
                onClick={() => setSelectedFile(null)}
                className="p-1 hover:bg-slate-200 rounded-full"
              >
                <X className="h-3 w-3 xs:h-4 xs:w-4 text-slate-500" />
              </button>
            </div>
          </div>
        )}

        {/* Chat Input */}
        <ChatInput/>
        {/* <div className="px-4 py-3 sm:px-4 sm:py-4 relative w-full">
          <div className="flex items-center gap-2 sm:gap-3 bg-slate-50 p-3 sm:p-4 rounded-2xl w-full min-h-[70px] max-h-[200px] overflow-y-auto custom-scroll">
        
            <button
              onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
              className="p-1 hover:bg-white rounded-lg transition-colors"
            >
              <Smile className="h-5 w-5 text-slate-400" />
            </button>

          
            <input
              type="file"
              ref={fileInputRef}
              onChange={() => {}}
              accept="image/*"
              className="hidden"
            />
            {!message && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1 hover:bg-white rounded-lg transition-colors"
              >
                <Paperclip className="h-5 w-5 text-slate-400" />
              </button>
            )}

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent px-3 py-3 focus:outline-none text-base text-gray-700 placeholder-gray-400 w-full min-h-[60px] max-h-[150px] overflow-y-auto custom-scroll resize-none"
            />
            {!message && (
              <button className="p-1 hover:bg-white rounded-lg transition-colors">
                <Mic className="h-5 w-5 text-slate-400" />
              </button>
            )}

            {message && (
              <button className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
                <Send className="h-4 w-4 text-white" />
              </button>
            )}
          </div>

          {isEmojiPickerOpen && (
            <div className="absolute bottom-full mb-2 left-0 w-40 bg-white rounded-lg shadow-lg p-2">
              <EmojiPicker onSelect={handleEmojiSelect} />
            </div>
          )}
        </div> */}

        {/* Call Interface */}
        {isInCall && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-2 xs:p-4">
            <div className="relative w-full max-w-2xl aspect-video bg-gray-800 rounded-xl xs:rounded-2xl overflow-hidden">
              {isInCall === "video" && (
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                />
              )}
              <div className="absolute bottom-4 xs:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 xs:space-x-4">
                <button
                  onClick={endCall}
                  className="p-3 xs:p-4 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                >
                  <Phone className="h-5 w-5 xs:h-6 xs:w-6 text-white transform rotate-225" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && !isInCall && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Audio element for recording playback */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}
