'use client';

import { db } from '@/lib/db';
import { id } from '@instantdb/react';
import { useMemo } from 'react';

interface MemeCardProps {
  meme: {
    id: string;
    imageData: string;
    topText: string;
    bottomText: string;
    createdAt: number;
    userId?: string;
    upvotes?: Array<{ id: string; userId?: string }>;
  };
}

function MemeCardContent({ meme }: MemeCardProps) {
  const user = db.useUser();
  const upvoteCount = meme.upvotes?.length || 0;
  
  // Check if current user has already upvoted
  const hasUpvoted = useMemo(() => {
    if (!user || !meme.upvotes || !user.id) return false;
    return meme.upvotes.some((upvote) => {
      // Handle both userId field and potential variations
      const upvoteUserId = (upvote as any).userId;
      return upvoteUserId === user.id;
    });
  }, [user, meme.upvotes]);

  // Find the existing upvote ID if user has upvoted
  const existingUpvoteId = useMemo(() => {
    if (!user || !meme.upvotes || !user.id) return null;
    const upvote = meme.upvotes.find((upvote) => {
      const upvoteUserId = (upvote as any).userId;
      return upvoteUserId === user.id;
    });
    return upvote?.id || null;
  }, [user, meme.upvotes]);

  const handleUpvote = () => {
    if (!user) {
      alert('Please sign in to upvote memes.');
      return;
    }

    try {
      if (hasUpvoted && existingUpvoteId) {
        // Remove upvote (toggle off)
        db.transact([
          db.tx.upvotes[existingUpvoteId].delete(),
        ]);
      } else {
        // Add upvote - create upvote and link to meme
        const upvoteId = id();
        db.transact([
          db.tx.upvotes[upvoteId].update({
            createdAt: Date.now(),
            userId: user.id,
          }).link({ meme: meme.id }),
        ]);
      }
    } catch (error) {
      console.error('Error upvoting:', error);
      alert('Failed to upvote. Please try again.');
    }
  };

  // Format date nicely
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  // Get user initials or display name
  const getCreatorDisplay = (userId?: string) => {
    if (!userId) return 'Anonymous';
    // Use first 8 characters of userId as display
    return `User ${userId.substring(0, 8)}...`;
  };

  return (
    <div className="bg-surface rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-shadow">
      <div className="relative bg-white">
        <img
          src={meme.imageData}
          alt="Meme"
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
              {meme.userId ? meme.userId.charAt(0).toUpperCase() : '?'}
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {getCreatorDisplay(meme.userId)}
              </p>
              <p className="text-xs text-text-muted">{formatDate(meme.createdAt)}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all group ${
              hasUpvoted
                ? 'bg-primary/20 hover:bg-primary/30 text-primary'
                : 'bg-surface-light hover:bg-primary/20 text-text-primary'
            }`}
          >
            <span className={`text-2xl transition-transform ${hasUpvoted ? 'scale-110' : 'group-hover:scale-110'}`}>
              👍
            </span>
            <span className="font-semibold">{upvoteCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function MemeCardSignedOut({ meme }: MemeCardProps) {
  const upvoteCount = meme.upvotes?.length || 0;

  const handleUpvote = () => {
    alert('Please sign in to upvote memes.');
  };

  // Format date nicely
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  // Get user initials or display name
  const getCreatorDisplay = (userId?: string) => {
    if (!userId) return 'Anonymous';
    return `User ${userId.substring(0, 8)}...`;
  };

  return (
    <div className="bg-surface rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-shadow">
      <div className="relative bg-white">
        <img
          src={meme.imageData}
          alt="Meme"
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
              {meme.userId ? meme.userId.charAt(0).toUpperCase() : '?'}
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {getCreatorDisplay(meme.userId)}
              </p>
              <p className="text-xs text-text-muted">{formatDate(meme.createdAt)}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleUpvote}
            className="flex items-center gap-2 px-4 py-2 bg-surface-light hover:bg-primary/20 rounded-lg transition-colors group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">👍</span>
            <span className="font-semibold text-text-primary">{upvoteCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MemeCard({ meme }: MemeCardProps) {
  return (
    <>
      <db.SignedIn>
        <MemeCardContent meme={meme} />
      </db.SignedIn>
      <db.SignedOut>
        <MemeCardSignedOut meme={meme} />
      </db.SignedOut>
    </>
  );
}
