import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Image, X } from 'lucide-react';

const EmojiPickerPopup = ({ icon, onSelect }) => {
    // Local state to toggle the visibility of the emoji picker popup
    const [isOpen, setIsOpen] = useState(false);

    // Handler for when an user selects an emoji from the picker
    const handleEmojiClick = (emoji) => {
        setIsOpen(false); // Close the popup
        // Pass the image URL of the selected emoji back to the parent (or an empty string if missing)
        onSelect(emoji?.imageUrl || ''); 
    };

    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
            
            {/* Clickable Trigger Area to open the popup */}
            <div 
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                {/* Icon Display */}
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg">
                    {icon ? (
                        <img src={icon} alt="icon" className="w-12 h-12" />
                    ) : (
                        <Image size={24} />
                    )}
                </div>
                
                {/* Dynamic Text Display */}
                <p>
                    {icon ? 'Change Icon' : 'Pick Icon'}
                </p>
            </div>

            {/* Emoji Picker Popup Area */}
            {isOpen && (
                <div className="relative">
                    {/* Custom Close Button */}
                    <button
                        type="button"
                        className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={15} />
                    </button>

                    {/* The imported Emoji Picker Component */}
                    <EmojiPicker 
                        open={isOpen} 
                        onEmojiClick={handleEmojiClick} 
                    />
                </div>
            )}
            
        </div>
    );
};

export default EmojiPickerPopup;