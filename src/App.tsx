import { useState } from 'react';
import { ChatWindow } from './components/chat/ChatWindow';
import { EvidenceSidebar } from './components/evidence/EvidenceSidebar';
import { MetadataBar } from './components/metadata/MetadataBar';
import { useBackendHealth } from './hooks/useBackendHealth';

export default function App() {
  const backendStatus = useBackendHealth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-ink-950 text-ink-200">
      <div className="flex min-h-0 flex-1">
        <ChatWindow
          backendStatus={backendStatus}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />
        <EvidenceSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      <MetadataBar backendStatus={backendStatus} />
    </div>
  );
}
