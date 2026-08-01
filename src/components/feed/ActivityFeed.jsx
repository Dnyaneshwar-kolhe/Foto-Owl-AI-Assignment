import React, { useMemo } from 'react';
import { Activity, Loader2 } from 'lucide-react';
import { db } from '../../lib/db';
import FeedItem from './FeedItem';

function ActivityFeed() {

  const { data, isLoading, error } = db.useQuery({
    reactions: {},
    comments: {},
  });

  const feedItems = useMemo(() => {
    const reactions = (data?.reactions || []).map((r) => ({
      ...r,
      type: 'reaction',
    }));

    const comments = (data?.comments || []).map((c) => ({
      ...c,
      type: 'comment',
    }));

    return [...reactions, ...comments]
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
      .slice(0, 100); 
  }, [data]);

  return (
    <div className="flex flex-col h-full" id="activity-feed">
      {}
      <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
        <Activity className="w-4 h-4 text-accent" />
        <h2 className="text-sm font-semibold text-text-primary">Live Activity</h2>
        {feedItems.length > 0 && (
          <span className="ml-auto badge bg-accent/20 text-accent-light">
            {feedItems.length}
          </span>
        )}
      </div>

      {}
      <div className="flex-1 overflow-y-auto no-scrollbar py-2 space-y-0.5">
        {isLoading && (
          <div className="flex items-center justify-center py-12 text-text-muted">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            <span className="text-sm">Loading feed...</span>
          </div>
        )}

        {error && (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-red-400">Failed to load feed</p>
            <p className="text-xs text-text-muted mt-1">{error.message}</p>
          </div>
        )}

        {!isLoading && !error && feedItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-3">
              <span className="text-2xl">✨</span>
            </div>
            <p className="text-sm text-text-secondary">No activity yet</p>
            <p className="text-xs text-text-muted mt-1">
              React or comment on an image to see it here!
            </p>
          </div>
        )}

        {feedItems.map((item, index) => (
          <FeedItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

export default ActivityFeed;
