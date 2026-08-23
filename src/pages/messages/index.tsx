import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MessageCircle, Send } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { resolvePerson, store, useConnectWizStore } from '@/services/mock';

function timeLabel(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export default function MessagesPage() {
  const { personId } = useParams();
  const navigate = useNavigate();
  const state = useConnectWizStore();
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  const conversations = Object.values(state.conversations).sort((a, b) => {
    const aLast = a.messages[a.messages.length - 1]?.createdAt ?? '';
    const bLast = b.messages[b.messages.length - 1]?.createdAt ?? '';
    return bLast.localeCompare(aLast);
  });

  const active = personId ? state.conversations[personId] : null;
  const activePerson = personId ? resolvePerson(personId) : null;

  useEffect(() => {
    if (personId) store.markConversationRead(personId);
  }, [personId, active?.messages.length]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [active?.messages.length]);

  function send() {
    if (!personId || !draft.trim()) return;
    store.sendMessage(personId, draft);
    setDraft('');
  }

  return (
    <>
      <Helmet>
        <title>messages — connectwiz</title>
      </Helmet>

      <div className="grid gap-0 overflow-hidden rounded-lg border-2 border-hairline md:grid-cols-[280px_1fr]" style={{ minHeight: '60vh' }}>
        <div className={`flex-col border-hairline md:flex md:border-r ${personId ? 'hidden' : 'flex'}`}>
          <div className="border-b border-hairline px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">conversations</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 && (
              <p className="p-5 text-center text-xs font-semibold leading-relaxed text-ink-soft">
                connect with someone to start a conversation.
              </p>
            )}
            {conversations.map((conv) => {
              const person = resolvePerson(conv.personId);
              if (!person) return null;
              const last = conv.messages[conv.messages.length - 1];
              return (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => navigate(`/dashboard/messages/${conv.personId}`)}
                  className={`flex w-full items-center gap-3 border-b border-hairline px-4 py-3 text-left transition-colors duration-200 hover:bg-cloud ${
                    personId === conv.personId ? 'bg-cloud' : ''
                  }`}
                >
                  <span className="relative shrink-0">
                    <img src={person.avatarUrl} alt="" className="h-10 w-10 rounded-full bg-cloud" />
                    {conv.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-canvas bg-success" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-ink">{person.name}</p>
                    <p className="truncate text-xs font-semibold text-ink-soft">{last?.text ?? 'say hi 👋'}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-on-primary">
                      {conv.unread}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className={`flex-col md:flex ${personId ? 'flex' : 'hidden'}`}>
          {personId && activePerson ? (
            <>
              <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
                <button type="button" onClick={() => navigate('/dashboard/messages')} className="text-ink-soft md:hidden" aria-label="back">
                  <ArrowLeft size={18} />
                </button>
                <img src={activePerson.avatarUrl} alt="" className="h-9 w-9 rounded-full bg-cloud" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-ink">{activePerson.name}</p>
                  <p className="truncate text-xs font-semibold text-ink-soft">
                    {active?.online ? 'online now' : activePerson.headline}
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="flex flex-col gap-3">
                  {(active?.messages ?? []).map((m) => (
                    <div key={m.id} className={`flex ${m.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[75%] rounded-lg px-4 py-2.5 text-sm font-semibold leading-relaxed ${
                          m.senderId === 'me' ? 'bg-primary text-on-primary' : 'bg-cloud text-ink'
                        }`}
                      >
                        {m.text}
                        <p className={`mt-1 text-[10px] font-semibold ${m.senderId === 'me' ? 'text-on-primary/70' : 'text-ink-soft'}`}>
                          {timeLabel(m.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={endRef} />
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex items-center gap-2 border-t border-hairline p-3"
              >
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="write a message..."
                  className="h-11 flex-1 rounded-pill bg-cloud px-4 text-sm font-semibold text-ink outline-none placeholder:font-medium placeholder:text-ink-soft"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  aria-label="send"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary disabled:opacity-40"
                >
                  <Send size={15} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-8">
              <EmptyState icon={MessageCircle} title="Pick a conversation" body="Select someone from the list to see your messages, or connect with someone new in Search." />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
