import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { db } from '../../lib/db';
import useAppStore from '../../store/useAppStore';
import EmojiReactions from '../interactions/EmojiReactions';

function ImageCard({ photo, index }) {
  const setSelectedImage = useAppStore((s) => s.setSelectedImage);

  const { data } = db.useQuery({
    reactions: { $: { where: { imageId: photo.id } } },
    comments: { $: { where: { imageId: photo.id } } },
  });

  const reactions = data?.reactions || [];
  const commentCount = (data?.comments || []).length;

  const handleClick = useCallback(() => {
    setSelectedImage(photo);
  }, [photo, setSelectedImage]);

  const aspectRatio = photo.width && photo.height
    ? photo.width / photo.height
    : 1;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.4 }}
      className="image-card group"
      id={`image-card-${photo.id}`}
    >
      {}
      <div
        className="relative overflow-hidden bg-surface-card"
        style={{ aspectRatio: aspectRatio > 1.4 ? '16/10' : aspectRatio < 0.7 ? '3/4' : '4/3' }}
      >
        <img
          src={photo.urls.regular}
          alt={photo.alt_description || `Photo by ${photo.user?.name}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {}
        <div className="image-overlay" onClick={handleClick}>
          <div className="flex items-center justify-between">
            {}
            <a
              href={`${photo.user?.links?.html}?utm_source=pixelpulse&utm_medium=referral`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors"
            >
              {photo.user?.profile_image?.small && (
                <img
                  src={photo.user.profile_image.small}
                  alt={photo.user.name}
                  className="w-5 h-5 rounded-full"
                />
              )}
              <span className="truncate max-w-[120px]">{photo.user?.name}</span>
            </a>

            {}
            {commentCount > 0 && (
              <div className="flex items-center gap-1 text-xs text-white/70">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{commentCount}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {}
      <div className="px-2 py-2 bg-surface-card rounded-b-xl border-t border-white/5">
        <EmojiReactions
          imageId={photo.id}
          imageUrl={photo.urls.thumb}
          reactions={reactions}
          mode="compact"
        />
      </div>
    </motion.div>
  );
}

export default React.memo(ImageCard);
