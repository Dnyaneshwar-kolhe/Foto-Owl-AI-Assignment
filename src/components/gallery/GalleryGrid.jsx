import React, { useCallback } from 'react';
import { useUnsplashPhotos } from '../../hooks/useUnsplashPhotos';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import ImageCard from './ImageCard';
import { GallerySkeleton } from '../ui/Skeleton';
import ErrorState from '../ui/ErrorState';
import { Loader2 } from 'lucide-react';

function GalleryGrid(){
    const{
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch

    } = useUnsplashPhotos();


    const handleLoadMore = useCallback(() => {
        if(hasNextPage && ! isFetchingNextPage){
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage , fetchNextPage]);

    const sentinelRef = useInfiniteScroll(
        handleLoadMore,
        hasNextPage && !isFetchingNextPage
    );

    const allPhotos = React.useMemo(() =>{
        if(!data?.pages) return [];
        return data.pages.flatMap((page) => page.photos);
    }, [data]);

    if(isLoading){
        return(
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                <GallerySkeleton count={12}/>
            </div>
        );
    }

    if(isError){
        return(
        <ErrorState title = "Failed to load images"
        message={error?.message || 'could not connect to unplash. Check your API key and try again....'}
        onRetry={refetch}
        varaint="network"
        />
        );
    }

    if(allPhotos.length === 0) {
        return(
            <ErrorState
            title="No images found"
            message="Try refreshing the page...."
            onRetry={refetch}
            />
        );
    }

    return(
        <div id="gallery-grid">
            <div className="columns-1 sm:columns-2 lg:columns-3  xl:coulmns-4 gap-4 space-y-4">
                {allPhotos.map((photo,index) => (
                     <div key={photo.id} className="break-inside-avoid">
                        <ImageCard photo={photo} index={index}/>
                     </div>
                ))}
            </div>

            <div ref={sentinelRef}
            className="flex items-center justify-center py-8"
            id="scroll-sentinel">
                {isFetchingNextPage && (
                    <div className="flex items-center gap-2 text-text-muted text-sm">
                        <Loader2 className="w-4 h-4 animate-spin"/>
                        <span>Loading More Photos.....</span>

                    </div>
                )}
                {!hasNextPage && allPhotos.length>0 &&(
                    <p className="text-text-muted text-sm">
                        You've Reached The End
                    </p>
                )}
            </div>
        </div>

    );
}

export default GalleryGrid;