import React from 'react';
import { motion } from 'framer-motion';
import Avatar from '../ui/Avatar';
import { formatRelativeTime } from '../../lib/constants';
import useAppStore from '../../store/useAppStore';

function FeedItem({ item, index }) {
  const setSelectedImage = useAppStore((s) => s.setSelectedImage);

  const handleClick = () => {
    if (item.imageId && item.imageUrl) {

      setSelectedImage({
        id: item.imageId,
        urls: {
          regular: item.imageUrl,
          thumb: item.imageUrl,
        },
        user: { name: 'Unknown' },
        alt_description: '',
      });
    }
  };

  const isReaction = item.type === 'reaction';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.2), duration: 0.3 }}
      onClick={handleClick}
      className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer
                 hover:bg-surface-hover/50 transition-colors group"
      id={`feed-item-${item.id}`}
    >
      <Avatar
        name={item.userName || 'User'}
        color={item.userColor || '#6366f1'}
        size="sm"
      />

      <div className="flex-1 min-w-0">
        <p className="text-xs leading-relaxed">
          <span className="font-semibold text-text-primary">
            {item.userName || 'Anonymous'}
          </span>
          <span className="text-text-secondary">
            {isReaction ? ' reacted ' : ' commented on '}
          </span>
          {isReaction && (
            <span className="text-base">{item.emoji}</span>
          )}
          <span className="text-text-secondary">
            {isReaction ? ' to an image' : ''}
          </span>
        </p>

        {}
        {!isReaction && item.text && (
          <p className="text-[11px] text-text-muted mt-0.5 truncate max-w-[200px]">
            "{item.text}"
          </p>
        )}

        <span className="text-[10px] text-text-muted mt-0.5 block">
          {formatRelativeTime(item.createdAt)}
        </span>
      </div>

      {}
      {item.imageUrl && (
        <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
          <img
            src={item.imageUrl}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
    </motion.div>
  );
}

export default React.memo(FeedItem);
