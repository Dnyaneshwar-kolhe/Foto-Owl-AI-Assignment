import React, { useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db, id } from '../../lib/db';
import { QUICK_EMOJIS } from '../../lib/constants';
import { useUserIdentity } from '../../hooks/useUserIdentity';

function EmojiReactions({ imageId, imageUrl, reactions = [], mode = 'compact', onPickerOpen }) {
  const { userId, userName, userColor } = useUserIdentity();

  const emojiData = useMemo(() => {
    const map = {};

    reactions.forEach((r) => {
      if (!map[r.emoji]) {
        map[r.emoji] = { count: 0, userReacted: false, reactionId: null };
      }
      map[r.emoji].count += 1;
      if (r.userId === userId) {
        map[r.emoji].userReacted = true;
        map[r.emoji].reactionId = r.id;
      }
    });

    return map;
  }, [reactions, userId]);

  const handleReaction = useCallback(
    (emoji) => {
      const existing = emojiData[emoji];

      if (existing?.userReacted && existing.reactionId) {

        db.transact(db.tx.reactions[existing.reactionId].delete());
      } else {

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
      }
    },
    [emojiData, imageId, imageUrl, userId, userName, userColor]
  );


  const displayEmojis = useMemo(() => {
    if (mode === 'expanded') return QUICK_EMOJIS;

    const activeEmojis = Object.keys(emojiData).filter(
      (e) => emojiData[e].count > 0
    );
    const defaultEmojis = QUICK_EMOJIS.slice(0, 3);
    const combined = [...new Set([...activeEmojis, ...defaultEmojis])];
    return combined.slice(0, 5);
  }, [mode, emojiData]);

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <AnimatePresence mode="popLayout">
        {displayEmojis.map((emoji) => {
          const data = emojiData[emoji];
          const count = data?.count || 0;
          const isActive = data?.userReacted || false;

          return (
            <motion.button
              key={emoji}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                handleReaction(emoji);
              }}
              className={`emoji-btn ${isActive ? 'active' : ''}`}
              title={`${emoji} ${count > 0 ? `(${count})` : ''}`}
              id={`emoji-btn-${imageId}-${emoji}`}
            >
              <span className="text-base leading-none">{emoji}</span>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="text-xs font-medium text-text-secondary"
                >
                  {count}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </AnimatePresence>

      {mode === 'expanded' && onPickerOpen && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPickerOpen();
          }}
          className="emoji-btn hover:border-accent/30"
          id={`emoji-picker-trigger-${imageId}`}
          title="More emojis"
        >
          <span className="text-base leading-none">➕</span>
        </button>
      )}
    </div>
  );
}

export default React.memo(EmojiReactions);
