'use client';

import { useState, useRef, ChangeEvent } from 'react';

const templates = [
  { name: 'Meme Template 1', path: '/Asset/29xp-meme-superJumbo-v3-scaled.webp' },
  { name: 'Meme Template 2', path: '/Asset/Meme-marketing.webp' },
  { name: 'Meme Template 3', path: '/Asset/you-and-meme.png' },
];

interface SidebarProps {
  onImageSelect: (image: HTMLImageElement) => void;
  topText: string;
  bottomText: string;
  fontSize: number;
  textColor: string;
  onTopTextChange: (text: string) => void;
  onBottomTextChange: (text: string) => void;
  onFontSizeChange: (size: number) => void;
  onTextColorChange: (color: string) => void;
  onDownload: () => void;
  onPost: () => void;
  canDownload: boolean;
}

export default function Sidebar({
  onImageSelect,
  topText,
  bottomText,
  fontSize,
  textColor,
  onTopTextChange,
  onBottomTextChange,
  onFontSizeChange,
  onTextColorChange,
  onDownload,
  onPost,
  canDownload,
}: SidebarProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTemplateClick = (templatePath: string) => {
    const img = new Image();
    img.onload = () => {
      onImageSelect(img);
      setSelectedTemplate(templatePath);
    };
    img.onerror = () => {
      alert('Failed to load template image. Please check if the file exists.');
    };
    img.src = templatePath;
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        onImageSelect(img);
        setSelectedTemplate(null);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <aside className="flex flex-col gap-6 bg-surface rounded-2xl p-4 lg:p-6 shadow-xl border border-border h-fit lg:sticky lg:top-8 order-last lg:order-first">
      {/* Templates Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🎨</span>
          <h2 className="text-lg font-semibold text-text-primary">Templates</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {templates.map((template, index) => (
            <div
              key={index}
              onClick={() => handleTemplateClick(template.path)}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                selectedTemplate === template.path
                  ? 'border-primary border-[3px] shadow-md ring-2 ring-primary/20'
                  : 'border-border hover:border-primary hover:-translate-y-0.5 hover:shadow-md'
              }`}
            >
              <img
                src={template.path}
                alt={template.name}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
              {selectedTemplate === template.path && (
                <div className="absolute top-2 right-2 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upload Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">📸</span>
          <h2 className="text-lg font-semibold text-text-primary">Upload Your Own</h2>
        </div>
        <label
          htmlFor="imageUpload"
          className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-border rounded-xl bg-surface-light cursor-pointer transition-all hover:border-primary hover:bg-primary/10 hover:-translate-y-0.5 text-center"
        >
          <div className="text-5xl mb-3 opacity-80">📁</div>
          <span className="font-semibold text-text-primary mb-1 text-base">
            Choose Image
          </span>
          <span className="text-sm text-text-muted">PNG, JPG, GIF up to 10MB</span>
          <input
            ref={fileInputRef}
            type="file"
            id="imageUpload"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>

      {/* Text Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">✏️</span>
          <h2 className="text-lg font-semibold text-text-primary">Text</h2>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="topText" className="text-sm font-medium text-text-secondary uppercase tracking-wide">
            Top Text
          </label>
          <input
            type="text"
            id="topText"
            value={topText}
            onChange={(e) => onTopTextChange(e.target.value)}
            placeholder="Enter top text..."
            className="w-full px-4 py-3 bg-surface-light border border-border rounded-lg text-text-primary text-sm font-sans transition-all focus:outline-none focus:border-primary focus:bg-surface focus:ring-2 focus:ring-primary/10 placeholder:text-text-muted"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="bottomText" className="text-sm font-medium text-text-secondary uppercase tracking-wide">
            Bottom Text
          </label>
          <input
            type="text"
            id="bottomText"
            value={bottomText}
            onChange={(e) => onBottomTextChange(e.target.value)}
            placeholder="Enter bottom text..."
            className="w-full px-4 py-3 bg-surface-light border border-border rounded-lg text-text-primary text-sm font-sans transition-all focus:outline-none focus:border-primary focus:bg-surface focus:ring-2 focus:ring-primary/10 placeholder:text-text-muted"
          />
        </div>
      </div>

      {/* Style Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">🎨</span>
          <h2 className="text-lg font-semibold text-text-primary">Style</h2>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label htmlFor="fontSize" className="text-sm font-medium text-text-secondary uppercase tracking-wide">
              Font Size
            </label>
            <span className="font-semibold text-primary-light text-sm">{fontSize}px</span>
          </div>
          <input
            type="range"
            id="fontSize"
            min="20"
            max="100"
            value={fontSize}
            onChange={(e) => onFontSizeChange(parseInt(e.target.value))}
            className="w-full h-1.5 rounded-full bg-surface-light outline-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:bg-primary-light [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:hover:bg-primary-light [&::-moz-range-thumb]:hover:scale-110"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="textColor" className="text-sm font-medium text-text-secondary uppercase tracking-wide">
            Text Color
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              id="textColor"
              value={textColor}
              onChange={(e) => onTextColorChange(e.target.value)}
              className="w-15 h-10 border-2 border-border rounded-lg cursor-pointer transition-all hover:border-primary hover:scale-105 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch]:rounded [&::-moz-color-swatch]:border-none [&::-moz-color-swatch]:rounded"
            />
            <span className="font-mono text-sm text-text-secondary font-medium">{textColor}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onDownload}
          disabled={!canDownload}
          className={`w-full px-6 py-4 rounded-xl font-semibold text-base font-sans transition-all flex items-center justify-center gap-2 shadow-md ${
            canDownload
              ? 'bg-gradient-to-br from-success to-success-dark text-white hover:-translate-y-0.5 hover:shadow-lg hover:from-success-dark hover:to-success'
              : 'bg-surface-light text-text-muted cursor-not-allowed opacity-60'
          }`}
        >
          <span className="text-xl">⬇️</span>
          <span>Download Meme</span>
        </button>
        <button
          onClick={onPost}
          disabled={!canDownload}
          className={`w-full px-6 py-4 rounded-xl font-semibold text-base font-sans transition-all flex items-center justify-center gap-2 shadow-md ${
            canDownload
              ? 'bg-gradient-to-br from-primary to-primary-dark text-white hover:-translate-y-0.5 hover:shadow-lg hover:from-primary-dark hover:to-primary'
              : 'bg-surface-light text-text-muted cursor-not-allowed opacity-60'
          }`}
        >
          <span className="text-xl">📤</span>
          <span>Post Meme</span>
        </button>
      </div>
    </aside>
  );
}
