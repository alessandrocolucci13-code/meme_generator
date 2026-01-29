'use client';

import { db } from '@/lib/db';
import MemeCard from './MemeCard';
import { useState, useMemo } from 'react';

type SortOption = 'newest' | 'oldest' | 'mostUpvoted' | 'leastUpvoted';

export default function FeedTab() {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const { data, isLoading, error } = db.useQuery({
    memes: {
      upvotes: {},
    },
  });

  const sortedMemes = useMemo(() => {
    if (!data?.memes) return [];
    const memes = [...data.memes];
    
    switch (sortBy) {
      case 'newest':
        return memes.sort((a, b) => b.createdAt - a.createdAt);
      case 'oldest':
        return memes.sort((a, b) => a.createdAt - b.createdAt);
      case 'mostUpvoted':
        return memes.sort((a, b) => (b.upvotes?.length || 0) - (a.upvotes?.length || 0));
      case 'leastUpvoted':
        return memes.sort((a, b) => (a.upvotes?.length || 0) - (b.upvotes?.length || 0));
      default:
        return memes.sort((a, b) => b.createdAt - a.createdAt);
    }
  }, [data?.memes, sortBy]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">⏳</div>
          <p className="text-text-secondary">Loading memes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('FeedTab query error:', error);
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-text-secondary">Error loading memes. Please try again.</p>
          <p className="text-sm text-text-muted mt-2">
            {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }

  if (sortedMemes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-2xl font-semibold text-text-primary mb-2">No memes yet</h3>
          <p className="text-text-muted">Be the first to post a meme!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-text-primary">Meme Feed</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-muted">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="mostUpvoted">Most Upvoted</option>
            <option value="leastUpvoted">Least Upvoted</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMemes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
    </div>
  );
}
