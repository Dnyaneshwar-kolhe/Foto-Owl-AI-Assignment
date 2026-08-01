import useAppStore from '../store/useAppStore';

export function useUserIdentity() {
  const userId = useAppStore((state) => state.userId);
  const userName = useAppStore((state) => state.userName);
  const userColor = useAppStore((state) => state.userColor);

  return { userId, userName, userColor };
}
