import React, { useState, useCallback, useRef } from 'react';
import { Send } from 'lucide-react';
import { db, id } from '../../lib/db';
import { useUserIdentity } from '../../hooks/useUserIdentity';
import CommentItem from './CommentItem';

function CommentSection({ imageId, imageUrl, comments = [] }) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);
  const { userId, userName, userColor } = useUserIdentity();


  const sortedComments = React.useMemo(() => {
    return [...comments]
      .filter((c) => c.imageId === imageId)
      .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  }, [comments, imageId]);

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault();
      const trimmed = text.trim();
      if (!trimmed || isSubmitting) return;

      setIsSubmitting(true);

      try {
        const newId = id();
        db.transact(
          db.tx.comments[newId].update({
            imageId,
            imageUrl: imageUrl || '',
            text: trimmed,
            userId,
            userName,
            userColor,
            createdAt: Date.now(),
          })
        );
        setText('');
      } catch (err) {
        console.error('Failed to add comment:', err);
      } finally {
        setIsSubmitting(false);
        inputRef.current?.focus();
      }
    },
    [text, isSubmitting, imageId, imageUrl, userId, userName, userColor]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className="flex flex-col h-full" id={`comment-section-${imageId}`}>
      { }
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-0.5 px-1 pb-3">
        {sortedComments.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-text-muted text-sm">
            No comments yet. Be the first! 💬
          </div>
        ) : (
          sortedComments.map((comment, i) => (
            <CommentItem key={comment.id} comment={comment} index={i} />
          ))
        )}
      </div>

      { }
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 pt-3 border-t border-white/5"
      >
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a comment..."
          className="comment-input flex-1"
          maxLength={500}
          disabled={isSubmitting}
          id={`comment-input-${imageId}`}
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={!text.trim() || isSubmitting}
          className="p-2.5 rounded-xl transition-all duration-200
                     disabled:opacity-30 disabled:cursor-not-allowed
                     gradient-accent text-white hover:opacity-90
                     focus:outline-none focus:ring-2 focus:ring-accent/50"
          id={`comment-submit-${imageId}`}
          title="Send comment"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default React.memo(CommentSection);
