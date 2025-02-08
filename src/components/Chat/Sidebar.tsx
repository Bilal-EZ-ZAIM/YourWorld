import React from 'react';
import { Search, MessageCircle, Plus, X } from 'lucide-react';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unread: number;
  online: boolean;
}

interface SidebarProps {
  onClose?: () => void;
  onChatSelect: (chat: Chat) => void;
  selectedChatId?: number;
}

const chats: Chat[] = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    time: "10:30 AM",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "See you tomorrow!",
    time: "9:15 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    unread: 0,
    online: false,
  },
];

export default function Sidebar({ onClose, onChatSelect, selectedChatId }: SidebarProps) {
  return (
    <div className="h-full bg-white flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <MessageCircle className="h-7 w-7 text-indigo-600" />
          <h1 className="text-xl font-bold text-gray-900">Messages</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors">
            <Plus className="h-5 w-5 text-white" />
          </button>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search messages"
            className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto -mx-4 px-4">
        <div className="space-y-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onChatSelect(chat)}
              className={`w-full flex items-center p-3 rounded-2xl transition-colors ${
                selectedChatId === chat.id
                  ? 'bg-indigo-50'
                  : 'hover:bg-slate-50'
              }`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-2xl object-cover"
                />
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2 flex-shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}