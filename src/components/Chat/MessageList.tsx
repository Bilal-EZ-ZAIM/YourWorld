import React from 'react';

interface Message {
  id: number;
  content: {
    type: 'text' | 'image' | 'audio';
    value: string;
  };
  sender: 'me' | 'other';
  time: string;
}

const messages: Message[] = [
  {
    id: 1,
    content: {
      type: 'text',
      value: 'Hey, how are you? 😊'
    },
    sender: 'other',
    time: '10:30 AM',
  },
  {
    id: 2,
    content: {
      type: 'image',
      value: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&auto=format'
    },
    sender: 'me',
    time: '10:31 AM',
  },
  {
    id: 3,
    content: {
      type: 'text',
      value: 'Beautiful sunset! Would you like to meet for coffee tomorrow? ☕'
    },
    sender: 'other',
    time: '10:32 AM',
  },
];

export default function MessageList() {
  return (
    <div className="flex-1 overflow-y-auto px-2 sm:px-6 py-4 space-y-4 bg-slate-50">
      {messages.map((message, index) => {
        const isFirstInGroup = index === 0 || messages[index - 1].sender !== message.sender;
        const isLastInGroup = index === messages.length - 1 || messages[index + 1].sender !== message.sender;

        return (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} ${
              !isLastInGroup ? 'mb-1' : ''
            }`}
          >
            <div
              className={`
                relative
                max-w-[85%] xs:max-w-[75%] sm:max-w-[70%]
                ${message.sender === 'me'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-800 shadow-sm'
                }
                ${isFirstInGroup && message.sender !== 'me' ? 'rounded-tl-lg' : 'rounded-tl-2xl'}
                ${isFirstInGroup && message.sender === 'me' ? 'rounded-tr-lg' : 'rounded-tr-2xl'}
                ${isLastInGroup && message.sender !== 'me' ? 'rounded-bl-2xl' : 'rounded-bl-lg'}
                ${isLastInGroup && message.sender === 'me' ? 'rounded-br-2xl' : 'rounded-br-lg'}
              `}
            >
              {message.content.type === 'text' && (
                <div className="px-3 xs:px-4 py-2 xs:py-3">
                  <p className="text-sm xs:text-[15px] leading-relaxed break-words">{message.content.value}</p>
                  <p className={`text-[10px] xs:text-xs mt-1 ${
                    message.sender === 'me' ? 'text-indigo-200' : 'text-gray-400'
                  }`}>
                    {message.time}
                  </p>
                </div>
              )}

              {message.content.type === 'image' && (
                <div className="space-y-1">
                  <div className="relative">
                    <img 
                      src={message.content.value} 
                      alt="Shared image"
                      className="w-full h-auto rounded-t-2xl"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity rounded-t-2xl" />
                  </div>
                  <p className={`text-[10px] xs:text-xs px-3 xs:px-4 pb-2 ${
                    message.sender === 'me' ? 'text-indigo-200' : 'text-gray-400'
                  }`}>
                    {message.time}
                  </p>
                </div>
              )}

              {message.content.type === 'audio' && (
                <div className="px-3 xs:px-4 py-2 xs:py-3 space-y-2">
                  <audio controls className="w-full max-w-[200px] xs:max-w-[240px]">
                    <source src={message.content.value} type="audio/mpeg" />
                  </audio>
                  <p className={`text-[10px] xs:text-xs ${
                    message.sender === 'me' ? 'text-indigo-200' : 'text-gray-400'
                  }`}>
                    {message.time}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}