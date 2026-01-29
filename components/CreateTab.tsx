'use client';

import { useState, useRef } from 'react';
import Sidebar from './Sidebar';
import CanvasPreview, { CanvasPreviewHandle } from './CanvasPreview';
import { db } from '@/lib/db';
import { id } from '@instantdb/react';

interface CreateTabProps {
  onPostSuccess?: () => void;
}

function CreateTabContent({ onPostSuccess }: CreateTabProps) {
  const user = db.useUser();
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [fontSize, setFontSize] = useState(40);
  const [textColor, setTextColor] = useState('#ffffff');
  const canvasPreviewRef = useRef<CanvasPreviewHandle>(null);

  const handleImageSelect = (img: HTMLImageElement) => {
    setImage(img);
  };

  const handleDownload = () => {
    const canvas = canvasPreviewRef.current?.getCanvas();
    if (!canvas || !image) {
      alert('Please upload an image first.');
      return;
    }

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `meme-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  const handlePost = async () => {
    const canvas = canvasPreviewRef.current?.getCanvas();
    if (!canvas || !image) {
      alert('Please create a meme first.');
      return;
    }

    if (!user || !user.id) {
      alert('Please sign in to post memes.');
      return;
    }

    try {
      // Convert canvas to base64
      const imageData = canvas.toDataURL('image/png');

      // Post to InstantDB - manually set userId
      db.transact([
        db.tx.memes[id()].update({
          imageData,
          topText,
          bottomText,
          createdAt: Date.now(),
          userId: user.id,
        }),
      ]);

      // Reset form
      setTopText('');
      setBottomText('');
      setImage(null);

      // Show success and optionally switch to feed
      alert('Meme posted successfully!');
      if (onPostSuccess) {
        onPostSuccess();
      }
    } catch (error) {
      console.error('Error posting meme:', error);
      alert('Failed to post meme. Please try again.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
      <Sidebar
        onImageSelect={handleImageSelect}
        topText={topText}
        bottomText={bottomText}
        fontSize={fontSize}
        textColor={textColor}
        onTopTextChange={setTopText}
        onBottomTextChange={setBottomText}
        onFontSizeChange={setFontSize}
        onTextColorChange={setTextColor}
        onDownload={handleDownload}
        onPost={handlePost}
        canDownload={!!image}
      />
      <div className="bg-surface rounded-2xl p-4 lg:p-8 shadow-xl border border-border flex items-center justify-center min-h-[400px] lg:min-h-[600px] order-first lg:order-last">
        <div className="w-full h-full flex items-center justify-center relative">
          <CanvasPreview
            ref={canvasPreviewRef}
            image={image}
            topText={topText}
            bottomText={bottomText}
            fontSize={fontSize}
            textColor={textColor}
          />
        </div>
      </div>
    </div>
  );
}

export default function CreateTab({ onPostSuccess }: CreateTabProps) {
  return (
    <>
      <db.SignedIn>
        <CreateTabContent onPostSuccess={onPostSuccess} />
      </db.SignedIn>
      <db.SignedOut>
        <div className="flex items-center justify-center min-h-[600px]">
          <div className="text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-2xl font-semibold text-text-primary mb-2">
              Sign in to create memes
            </h3>
            <p className="text-text-muted">
              Please sign in to start creating and sharing your memes!
            </p>
          </div>
        </div>
      </db.SignedOut>
    </>
  );
}
