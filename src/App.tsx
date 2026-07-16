import React from 'react';
import { ChatWindow } from './components/ChatWindow';
import { EvidenceSidebar } from './components/EvidenceSidebar';
import { MetadataBar } from './components/MetadataBar';

const App: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col bg-codex-bg overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        <ChatWindow />
        <EvidenceSidebar />
      </div>
      <MetadataBar />
    </div>
  );
};

export default App;
