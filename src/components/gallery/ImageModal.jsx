import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { db } from '../../lib/db';
import useAppStore from '../../store/useAppStore';
import EmojiReactions from '../interactions/EmojiReactions';
import EmojiPicker from '../interactions/EmojiPicker';
import CommentSection from '../interactions/CommentSection';

function ImageModal() {
  const selectedImage = useAppStore((s) => s.selectedImage);
  const clearSelectedImage = useAppStore((s) => s.clearSelectedImage);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const imageId = selectedImage?.id;
  const { data, isLoading, error } = db.useQuery(
    imageId
      ? {
          reactions: { $: { where: { imageId } } },
          comments: { $: { where: { imageId } } },
        }
      : null
  );

  const reactions = data?.reactions || [];
  const comments = data?.comments || [];

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        clearSelectedImage();
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [selectedImage, clearSelectedImage]);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        clearSelectedImage();
      }
    },
    [clearSelectedImage]
  );

  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="modal-backdrop"
          onClick={handleBackdropClick}
          id="image-modal-backdrop"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="glass-strong rounded-2xl w-[95vw] max-w-5xl h-[90vh] max-h-[700px]
                       flex flex-col md:flex-row overflow-hidden shadow-2xl"
            id="image-modal-content"
          >
            {}
            <div className="flex-1 min-w-0 bg-black/30 flex items-center justify-center relative overflow-hidden">
              <img
                src={selectedImage.urls.regular}
                alt={selectedImage.alt_description || `Photo by ${selectedImage.user?.name}`}
                className="w-full h-full object-contain"
              />

              {}
              <button
                onClick={clearSelectedImage}
                className="absolute top-3 right-3 p-2 rounded-full glass hover:bg-white/10
                           transition-colors text-white/70 hover:text-white z-10"
                id="modal-close-button"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>

              {}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
                <a
                  href={`${selectedImage.user?.links?.html}?utm_source=pixelpulse&utm_medium=referral`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full glass
                             text-xs text-white/80 hover:text-white transition-colors"
                >
                  {selectedImage.user?.profile_image?.small && (
                    <img
                      src={selectedImage.user.profile_image.small}
                      alt={selectedImage.user.name}
                      className="w-5 h-5 rounded-full"
                    />
                  )}
                  <span>{selectedImage.user?.name}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {}
            <div className="w-full md:w-[340px] flex flex-col border-l border-white/5 bg-surface/50">
              {}
              <div className="px-4 py-4 border-b border-white/5">
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                  Reactions
                </h3>
                <div className="relative">
                  <EmojiReactions
                    imageId={selectedImage.id}
                    imageUrl={selectedImage.urls.thumb}
                    reactions={reactions}
                    mode="expanded"
                    onPickerOpen={() => setIsPickerOpen(true)}
                  />
                  <EmojiPicker
                    imageId={selectedImage.id}
                    imageUrl={selectedImage.urls.thumb}
                    isOpen={isPickerOpen}
                    onClose={() => setIsPickerOpen(false)}
                  />
                </div>
              </div>

              {}
              <div className="flex-1 flex flex-col min-h-0 px-4 py-3">
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                  Comments ({comments.length})
                </h3>
                <div className="flex-1 min-h-0">
                  <CommentSection
                    imageId={selectedImage.id}
                    imageUrl={selectedImage.urls.thumb}
                    comments={comments}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ImageModal;
