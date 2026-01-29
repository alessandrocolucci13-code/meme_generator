# Meme Generator - Next.js + InstantDB

A full-stack meme generator application built with Next.js and InstantDB, allowing users to create memes, post them to a shared feed, and upvote others' memes.

## Features

- 🎨 **Meme Creation**: Upload images or use templates
- ✏️ **Text Customization**: Add top and bottom text with customizable font size and color
- 📤 **Post Memes**: Share your memes to a public feed
- 👍 **Upvoting**: Upvote your favorite memes
- 🔄 **Real-time Updates**: See new memes and upvotes instantly

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: InstantDB
- **UI**: React Components

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
The `.env.local` file is already configured with your InstantDB app ID.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page with tab navigation
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # App header
│   ├── TabNavigation.tsx  # Tab switcher
│   ├── CreateTab.tsx      # Meme editor
│   ├── Sidebar.tsx        # Editor controls
│   ├── CanvasPreview.tsx  # Canvas preview
│   ├── FeedTab.tsx        # Meme feed
│   └── MemeCard.tsx       # Individual meme card
├── lib/
│   ├── db.ts              # InstantDB initialization
│   └── instant.schema.ts  # Database schema
└── public/
    └── Asset/             # Template images
```

## Usage

1. **Create Tab**: 
   - Select a template or upload your own image
   - Add top and bottom text
   - Customize font size and color
   - Download or post your meme

2. **Feed Tab**:
   - Browse all posted memes
   - Upvote memes you like
   - See real-time updates

## Building for Production

```bash
npm run build
npm start
```

## Environment Variables

- `NEXT_PUBLIC_INSTANT_APP_ID`: Your InstantDB app ID (already configured)

## License

MIT
