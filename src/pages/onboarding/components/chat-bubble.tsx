import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/cn';

interface ChatBubbleProps {
  role: 'ai' | 'user';
  text: string;
  avatarUrl?: string;
}

export function ChatBubble({ role, text, avatarUrl }: ChatBubbleProps) {
  const isAi = role === 'ai';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex items-end gap-2.5', isAi ? 'justify-start' : 'flex-row-reverse justify-start')}
    >
      {isAi ? (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
          <Sparkles size={15} />
        </span>
      ) : (
        <img src={avatarUrl} alt="" className="h-8 w-8 shrink-0 rounded-full bg-cloud" />
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed font-semibold sm:max-w-[70%]',
          isAi ? 'bg-cloud text-ink' : 'bg-primary text-on-primary'
        )}
      >
        {text}
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
        <Sparkles size={15} />
      </span>
      <div className="flex items-center gap-1 rounded-lg bg-cloud px-4 py-3.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-ink-soft"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
