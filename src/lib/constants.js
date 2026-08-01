
export const QUICK_EMOJIS = ['❤️', '🔥', '👏', '😍', '🎉', '💯'];

export const ADJECTIVES = [
  'Happy', 'Clever', 'Swift', 'Bright', 'Calm',
  'Bold', 'Witty', 'Kind', 'Cool', 'Lucky',
  'Noble', 'Brave', 'Wise', 'Zen', 'Chill',
  'Epic', 'Rad', 'Fresh', 'Neat', 'Ace',
];

export const ANIMALS = [
  'Penguin', 'Fox', 'Owl', 'Panda', 'Wolf',
  'Eagle', 'Dolphin', 'Tiger', 'Falcon', 'Koala',
  'Otter', 'Hawk', 'Lynx', 'Bear', 'Raven',
  'Heron', 'Elk', 'Seal', 'Crane', 'Jaguar',
];

export const AVATAR_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
  '#f97316', '#eab308', '#22c55e', '#06b6d4',
  '#3b82f6', '#a855f7', '#14b8a6', '#f59e0b',
];

export const FEED_TYPES = {
  REACTION: 'reaction',
  COMMENT: 'comment',
};

export function formatRelativeTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
}

export function generateId() {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}
