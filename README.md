# Foto-Owl-Ai - Real-Time Gallery Interaction

Foto-Owl-Ai is a multi-user real-time image interaction web application. It allows users to view a gallery of Unsplash images, interact with them using emojis and comments, and see all interactions update instantly for other users in a global activity feed.

Built for the **React Intern Assignment – Foto Owl Ai**.

## 🚀 Live Demo

[Link to Live Deployed Application](https://your-vercel-or-netlify-url.app)

## 🛠 Tech Stack

- **Framework:** React 19 + Vite
- **Data Fetching:** TanStack Query (React Query)
- **Real-Time Database:** InstantDB (`@instantdb/react`)
- **State Management:** Zustand
- **Styling:** Tailwind CSS v3
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Emoji Picker:** Emoji Mart

## ⚙️ Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd "Assignment Foto Owl"
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```
   *(Note: `--legacy-peer-deps` might be required due to React 19 / emoji-mart peer dependency resolution during installation depending on environment).*

3. **Environment Variables:**
   Create a `.env` file in the root directory (copy from `.env.example` if available) and add your keys:
   ```env
   VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
   VITE_INSTANTDB_APP_ID=your_instantdb_app_id
   ```
   - Get Unsplash API Key: [Unsplash Developers](https://unsplash.com/developers)
   - Get InstantDB App ID: [InstantDB Dashboard](https://www.instantdb.com)

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## 🧠 Architecture & Decisions

### API Handling Strategy (Unsplash)
- **TanStack Query (React Query):** Used `useInfiniteQuery` to handle pagination seamlessly. This provides built-in caching, automatic deduping of requests, and prevents unnecessary re-fetching (which is crucial given Unsplash API rate limits).
- **Infinite Scroll:** Implemented via a custom `useInfiniteScroll` hook utilizing `IntersectionObserver`. When the invisible "sentinel" div enters the viewport, it triggers the next page fetch automatically.

### Real-Time Sync (InstantDB)
- **Schema Design:** We use a simple flat schema design for flexibility since our images come from an external API (Unsplash).
  - `reactions`: `{ imageId, imageUrl, emoji, userId, userName, userColor, createdAt }`
  - `comments`: `{ imageId, imageUrl, text, userId, userName, userColor, createdAt }`
- **Sync Strategy:**
  - **Image Level:** When viewing a specific image in the `ImageModal`, we query `db.useQuery` filtering by that specific `imageId`. Updates appear instantly for all users viewing that image.
  - **Global Feed:** The `ActivityFeed` component queries all reactions and comments globally without filters, merges the arrays, and sorts them by `createdAt` descending.

### State Management
- **Zustand:** Used for global UI state like the `selectedImage` (for the modal) and the `isFeedOpen` toggle (for mobile layouts).
- **User Identity:** To satisfy the bonus requirement and make testing easier, a random identity (Adjective + Animal + Color) is generated on first visit and persisted in `localStorage`. This avoids complex auth flows while allowing us to distinguish users.

### Component Decomposition
- **Gallery:** Separated into `GalleryGrid` (layout/loading), `ImageCard` (individual display), and `ImageModal` (detailed interaction view).
- **Interactions:** `EmojiReactions` and `CommentSection` are decoupled. They take `imageId` as a prop, making them reusable anywhere (e.g., in the card vs. in the modal).
- **Feed:** Separated `ActivityFeed` (data fetching/sorting) and `FeedItem` (presentation).

## 💡 Challenges Solved
- **Masonry Layout:** Implementing a true responsive masonry layout purely with CSS. Solved using CSS `columns` and `break-inside-avoid`.
- **Feed Merging:** We have two distinct entities (`reactions` and `comments`) but want a unified chronological feed. Solved by fetching both in one `useQuery` call and using `useMemo` to merge and sort them client-side.
- **Emoji Aggregation:** InstantDB stores individual reaction records. We needed to display aggregate counts per emoji, while also knowing if the *current user* had reacted to allow toggling. Solved using a `useMemo` block in `EmojiReactions` to map raw DB records into grouped counts.

## ✨ Future Improvements (If I had more time)
- **Optimistic Updates:** Implementing optimistic UI updates for comments to make the UI feel zero-latency before the InstantDB server acknowledges the write.
- **Search/Filtering:** Adding a search bar to query specific topics via Unsplash API instead of just showing popular photos.
- **Toast Notifications:** Showing brief non-intrusive toasts when new feed items arrive while the sidebar is closed on mobile.
- **Feed Virtualization:** As the feed grows, rendering hundreds of items could impact performance. Adding a virtualization library (like `react-window`) would keep the DOM light.
