import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { db, id } from '../../lib/db';
import { useUserIdentity } from '../../hooks/useUserIdentity';

function EmojiPicker({ imageId, imageUrl, isOpen, onClose }) {
  const { userId, userName, userColor } = useUserIdentity();
  const pickerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        onClose();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSelect = useCallback(
    (emojiData) => {
      const emoji = emojiData.native;
      const newId = id();
      db.transact(
        db.tx.reactions[newId].update({
          imageId,
          imageUrl: imageUrl || '',
          emoji,
          userId,
          userName,
          userColor,
          createdAt: Date.now(),
        })
      );
      onClose();
    },
    [imageId, imageUrl, userId, userName, userColor, onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={pickerRef}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 bottom-full mb-2"
          id={`emoji-picker-${imageId}`}
        >
          <Picker
            data={data}
            onEmojiSelect={handleSelect}
            theme="dark"
            previewPosition="none"
            skinTonePosition="none"
            maxFrequentRows={1}
            perLine={8}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default React.memo(EmojiPicker);
