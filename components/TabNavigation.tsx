'use client';

interface TabNavigationProps {
  activeTab: 'create' | 'feed';
  onTabChange: (tab: 'create' | 'feed') => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex gap-2 mb-6 border-b border-border">
      <button
        onClick={() => onTabChange('create')}
        className={`px-6 py-3 font-semibold transition-colors ${
          activeTab === 'create'
            ? 'text-primary border-b-2 border-primary'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        Create
      </button>
      <button
        onClick={() => onTabChange('feed')}
        className={`px-6 py-3 font-semibold transition-colors ${
          activeTab === 'feed'
            ? 'text-primary border-b-2 border-primary'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        Feed
      </button>
    </div>
  );
}
