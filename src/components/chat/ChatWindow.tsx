import type { BackendStatus } from '../../types';
import { useChat } from '../../hooks/useChat';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';

interface ChatWindowProps {
  backendStatus: BackendStatus;
  onToggleSidebar: () => void;
}

export function ChatWindow({ backendStatus, onToggleSidebar }: ChatWindowProps) {
  const { send, retry, cancel, isPending } = useChat();

  return (
    <section
      className="relative flex h-full min-w-0 flex-1 flex-col"
      aria-label="对话区"
    >
      <ChatHeader backendStatus={backendStatus} onToggleSidebar={onToggleSidebar} />
      <MessageList isPending={isPending} onRetry={retry} onSuggestion={send} />
      <ChatInput onSubmit={send} onCancel={cancel} disabled={isPending} />
    </section>
  );
}
