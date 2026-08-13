import { Bot, User } from 'lucide-react';
import { cn } from '../../lib/cn';

interface AvatarProps {
  isUser: boolean;
}

export function Avatar({ isUser }: AvatarProps) {
  return (
    <div
      className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border',
        isUser
          ? 'border-ink-600 bg-ink-700 text-ink-300'
          : 'border-accent-500/25 bg-accent-500/10 text-accent-500',
      )}
      aria-hidden
    >
      {isUser ? <User size={16} /> : <Bot size={16} />}
    </div>
  );
}
