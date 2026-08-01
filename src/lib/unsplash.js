const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const BASE_URL = 'https://api.unsplash.com';

export async function fetchPhotos(page = 1, perPage = 20) {
  const response = await fetch(
    `${BASE_URL}/photos?page=${page}&per_page=${perPage}&order_by=popular`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
  }

  const photos = await response.json();
  const totalPages = parseInt(response.headers.get('x-total') || '1000', 10);

  return {
    photos,
    totalPages: Math.ceil(totalPages / perPage),
    nextPage: page + 1,
  };
}

export async function searchPhotos(query, page = 1, perPage = 20) {
  const response = await fetch(
    `${BASE_URL}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return {
    photos: data.results,
    totalPages: data.total_pages,
    nextPage: page + 1,
  };
}
