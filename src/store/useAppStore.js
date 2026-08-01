import { create } from 'zustand';
import { ADJECTIVES, ANIMALS, AVATAR_COLORS, generateId } from '../lib/constants';

function createRandomIdentity() {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  const color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

  return {
    userId: generateId(),
    userName: `${adj} ${animal}`,
    userColor: color,
  };
}

function loadOrCreateIdentity() {
  try {
    const saved = localStorage.getItem('pixelpulse_identity');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.userId && parsed.userName && parsed.userColor) {
        return parsed;
      }
    }
  } catch {

  }

  const identity = createRandomIdentity();
  localStorage.setItem('pixelpulse_identity', JSON.stringify(identity));
  return identity;
}

const identity = loadOrCreateIdentity();

const useAppStore = create((set) => ({

  userId: identity.userId,
  userName: identity.userName,
  userColor: identity.userColor,

  selectedImage: null,
  setSelectedImage: (image) => set({ selectedImage: image }),
  clearSelectedImage: () => set({ selectedImage: null }),

  isFeedOpen: true,
  toggleFeed: () => set((state) => ({ isFeedOpen: !state.isFeedOpen })),

  regenerateIdentity: () => {
    const newIdentity = createRandomIdentity();
    localStorage.setItem('pixelpulse_identity', JSON.stringify(newIdentity));
    set(newIdentity);
  },
}));

export default useAppStore;
