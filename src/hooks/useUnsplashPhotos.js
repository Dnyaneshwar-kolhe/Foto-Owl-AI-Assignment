import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPhotos } from '../lib/unsplash';

export function useUnsplashPhotos() {
  return useInfiniteQuery({
    queryKey: ['unsplash-photos'],
    queryFn: ({ pageParam = 1 }) => fetchPhotos(pageParam, 20),
    getNextPageParam: (lastPage) => {

      if (lastPage.nextPage > lastPage.totalPages) return undefined;
      return lastPage.nextPage;
    },
    staleTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: false,
  });
}

