import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { formatRelativeTime } from '../../lib/constants';
import { db } from '../../lib/db';
import { useUserIdentity } from '../../hooks/useUserIdentity';

function CommentItem({ comment, index }) {
  const { userId } = useUserIdentity();
  const isOwn = comment.userId === userId;

  const handleDelete = (e) => {
    e.stopPropagation();
    db.transact(db.tx.comments[comment.id].delete());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.3) }}
      className="group flex gap-2.5 py-2.5 px-1"
      id={`comment-${comment.id}`}
    >
      <Avatar
        name={comment.userName || 'User'}
        color={comment.userColor || '#6366f1'}
        size="sm"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-semibold text-text-primary truncate">
            {comment.userName || 'Anonymous'}
          </span>
          <span className="text-[10px] text-text-muted shrink-0">
            {formatRelativeTime(comment.createdAt)}
          </span>

          {}
          {isOwn && (
            <button
              onClick={handleDelete}
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto
                         p-1 rounded hover:bg-red-500/20 text-text-muted hover:text-red-400"
              title="Delete comment"
              id={`delete-comment-${comment.id}`}
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>

        <p className="text-sm text-text-secondary leading-relaxed break-words">
          {comment.text}
        </p>
      </div>
    </motion.div>
  );
}

export default React.memo(CommentItem);
