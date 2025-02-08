import React from 'react';

const emojis = [
  '😊', '😂', '🥰', '😍', '😒', '😭', '😩', '🥺',
  '😤', '😡', '🤔', '🤗', '😴', '🤤', '😇', '🤠',
  '🤡', '🥳', '😎', '🤓', '😷', '🤒', '🤕', '🤑',
  '👍', '👎', '👋', '🤝', '🙏', '💪', '🫂', '❤️'
];

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

export default function EmojiPicker({ onSelect }: EmojiPickerProps) {
  return (
    <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg p-2 xs:p-4 w-full xs:w-[280px] max-h-[300px] xs:max-h-[400px] overflow-y-auto">
      <div className="grid grid-cols-6 xs:grid-cols-8 gap-1 xs:gap-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onSelect(emoji)}
            className="p-1.5 xs:p-2 hover:bg-slate-50 rounded-lg text-base xs:text-xl transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}