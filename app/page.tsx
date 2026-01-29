'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import TabNavigation from '@/components/TabNavigation';
import CreateTab from '@/components/CreateTab';
import FeedTab from '@/components/FeedTab';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'create' | 'feed'>('create');

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <Header />
      <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === 'create' ? (
          <CreateTab onPostSuccess={() => setActiveTab('feed')} />
        ) : (
          <FeedTab />
        )}
      </main>
    </div>
  );
}
