import React, { useState, useRef, useEffect } from "react";
import { Smile, Paperclip, Mic, Send, Camera, X } from "lucide-react";

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect }) => {
  const categories = {
    "Recent": ["😊", "😂", "❤️", "👍", "😍"],
    "Smileys": ["🙂", "😊", "😂", "🥹", "😍"],
    "Hearts": ["❤️", "💖", "💙", "💚", "💛"],
  };

  return (
    <div className="w-[280px] sm:w-72 bg-white rounded-lg shadow-lg border overflow-hidden">
      <div className="max-h-[200px] sm:max-h-[300px] overflow-y-auto">
        {Object.entries(categories).map(([category, emojis]) => (
          <div key={category} className="p-2">
            <div className="text-xs text-gray-500 font-medium mb-1">{category}</div>
            <div className="grid grid-cols-5 gap-1">
              {emojis.map((emoji, index) => (
                <button
                  key={`${category}-${index}`}
                  onClick={() => onSelect(emoji)}
                  className="text-lg sm:text-xl hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface ChatInputProps {
  primaryColor?: string;
  secondaryColor?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  primaryColor = "indigo-600",
  secondaryColor = "indigo-700",
}) => {
  const [message, setMessage] = useState<string>("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);
  const [attachmentPreview, setAttachmentPreview] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setIsEmojiPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    setMessage(newMessage);
    setIsTyping(newMessage.length > 0);
    
    // Adjust height while keeping text visible without scroll
    e.target.style.height = "0px";
    const newHeight = Math.min(e.target.scrollHeight, isMobile ? 100 : 150);
    e.target.style.height = `${newHeight}px`;
  };

  const handleEmojiSelect = (emoji: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newMessage = 
        message.substring(0, start) + 
        emoji + 
        message.substring(end);
      
      setMessage(newMessage);
      setIsTyping(true);
      
      setTimeout(() => {
        if (textareaRef.current) {
          const newPosition = start + emoji.length;
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(newPosition, newPosition);
        }
      }, 0);
    }
    
    if (isMobile) {
      setIsEmojiPickerOpen(false);
    }
  };

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachmentPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAttachment = () => {
    setAttachmentPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col bg-white w-full">
      {attachmentPreview && (
        <div className="p-2 border-b w-full">
          <div className="relative inline-block">
            <img
              src={attachmentPreview}
              alt="attachment preview"
              className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-lg"
            />
            <button
              onClick={removeAttachment}
              className="absolute -top-2 -right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="relative flex items-end gap-1 sm:gap-2 p-1 sm:p-3 bg-gray-50 w-full">
        <div className="flex-1 flex items-end gap-1 sm:gap-2 bg-white rounded-2xl px-2 sm:px-3 py-1.5 sm:py-2 shadow-sm">
          {/* Emoji button - always visible */}
          <div className="relative" ref={emojiPickerRef}>
            <button
              onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
              className="p-1.5 sm:p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Smile className="h-5 w-5" />
            </button>
            {isEmojiPickerOpen && (
              <div className={`absolute ${isMobile ? 'bottom-14 left-0' : 'bottom-full left-0'} mb-2 z-50`}>
                <EmojiPicker onSelect={handleEmojiSelect} />
              </div>
            )}
          </div>

          {/* Text input */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleMessageChange}
            placeholder="Type a message..."
            className="flex-1 min-h-[24px] sm:min-h-[40px] text-sm sm:text-base 
              resize-none bg-transparent border-0 focus:ring-0 p-1 sm:p-2 
              text-gray-700 placeholder-gray-400 overflow-hidden"
            rows={1}
          />

          {/* Attachment buttons - hidden when typing on mobile */}
          {(!isMobile || !isTyping) && (
            <div className="flex gap-1">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAttachment}
                accept="image/*,video/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 sm:p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              {!isMobile && (
                <button className="p-1.5 sm:p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                  <Camera className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Send/Voice button */}
        <button
          className={`p-2 sm:p-3 rounded-full bg-${primaryColor} hover:bg-${secondaryColor} transition-colors flex-shrink-0`}
        >
          {message ? (
            <Send className="h-5 w-5 text-white" />
          ) : (
            <Mic className="h-5 w-5 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;