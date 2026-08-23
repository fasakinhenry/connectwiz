import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Logo } from '@/components/ui/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ChatBubble, TypingIndicator } from './components/chat-bubble';
import { ReviewProfile } from './components/review-profile';
import { LocationStep } from './components/location-step';
import { ONBOARDING_STEPS, getVagueFollowUp, buildProfileFromAnswers, store } from '@/services/mock';
import type { OnboardingAnswers } from '@/services/mock';
import type { NetworkingProfile } from '@/lib/connectwiz-types';
import { connectwizApi } from '@/lib/connectwiz-api';

interface Msg {
  id: string;
  role: 'ai' | 'user';
  text: string;
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export default function OnboardingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [phase, setPhase] = useState<'chat' | 'review' | 'location'>('chat');
  const [generatedProfile, setGeneratedProfile] = useState<NetworkingProfile | null>(null);

  const answersRef = useRef<Partial<OnboardingAnswers>>({ goals: [] });
  const followUpActive = useRef(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function pushAi(text: string): Promise<void> {
    return new Promise((resolve) => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((m) => [...m, { id: uid(), role: 'ai', text }]);
        resolve();
      }, 550 + Math.random() * 500);
    });
  }

  function pushUser(text: string) {
    setMessages((m) => [...m, { id: uid(), role: 'user', text }]);
  }

  useEffect(() => {
    (async () => {
      const firstName = user?.name?.split(' ')[0] ?? 'there';
      await pushAi(
        `Hey ${firstName}! I'm going to ask a few quick questions to build your ConnectWiz profile — should take about a minute.`
      );
      await pushAi(ONBOARDING_STEPS[0].question);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function finalize() {
    await pushAi("Perfect — give me a second while I put your profile together...");
    if (!user) return;
    const built = buildProfileFromAnswers(
      { id: user.id, name: user.name, avatarUrl: user.avatarUrl, bio: user.bio },
      answersRef.current as OnboardingAnswers
    );
    setGeneratedProfile(built);
    setPhase('review');
  }

  function advance() {
    const nextIndex = stepIndex + 1;
    if (nextIndex < ONBOARDING_STEPS.length) {
      setStepIndex(nextIndex);
      void pushAi(ONBOARDING_STEPS[nextIndex].question);
    } else {
      void finalize();
    }
  }

  async function submitFreeText(raw: string) {
    const value = raw.trim();
    if (!value) return;
    pushUser(value);
    setInputValue('');
    const step = ONBOARDING_STEPS[stepIndex];

    if (step.key === 'interests' && followUpActive.current) {
      answersRef.current.interests = `${answersRef.current.interests}, ${value}`;
      followUpActive.current = false;
      advance();
      return;
    }

    if (step.key === 'interests') {
      answersRef.current.interests = value;
      const followUp = getVagueFollowUp(value);
      if (followUp) {
        followUpActive.current = true;
        await pushAi(followUp);
        return;
      }
      advance();
      return;
    }

    (answersRef.current as Record<string, string>)[step.key] = value;
    advance();
  }

  function submitChip(label: string) {
    const step = ONBOARDING_STEPS[stepIndex];
    pushUser(label);
    (answersRef.current as Record<string, string>)[step.key] = label;
    advance();
  }

  function toggleGoalChip(label: string) {
    setSelectedChips((prev) => (prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]));
  }

  function submitGoals() {
    if (!selectedChips.length) return;
    pushUser(selectedChips.join(', '));
    answersRef.current.goals = selectedChips;
    setSelectedChips([]);
    advance();
  }

  function handleSave(profile: NetworkingProfile) {
    setGeneratedProfile(profile);
    setPhase('location');
  }

  function handleLocationDone(coords: { lat: number; lng: number } | null) {
    if (!generatedProfile) return;
    const finalProfile: NetworkingProfile = coords
      ? { ...generatedProfile, location: { ...generatedProfile.location, lat: coords.lat, lng: coords.lng } }
      : generatedProfile;

    store.completeOnboarding(finalProfile);
    // Best-effort sync to the real backend — the demo must keep working off
    // the local store even if the API/DB is unavailable.
    connectwizApi.completeOnboarding(finalProfile).catch(() => {});

    navigate('/dashboard/search', { replace: true });
  }

  const currentStep = ONBOARDING_STEPS[stepIndex];

  return (
    <>
      <Helmet>
        <title>build your profile — connectwiz</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="flex min-h-screen flex-col bg-canvas">
        <header className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <Logo />
          <div className="flex items-center gap-3">
            {phase === 'chat' && (
              <span className="hidden text-xs font-bold uppercase tracking-wide text-ink-soft sm:inline">
                step {Math.min(stepIndex + 1, ONBOARDING_STEPS.length)} of {ONBOARDING_STEPS.length}
              </span>
            )}
            <ThemeToggle />
          </div>
        </header>

        {phase === 'chat' ? (
          <>
            <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 overflow-y-auto px-4 py-8 sm:px-6">
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <ChatBubble key={m.id} role={m.role} text={m.text} avatarUrl={user?.avatarUrl} />
                ))}
                {typing && <TypingIndicator key="typing" />}
              </AnimatePresence>
              <div ref={endRef} />
            </main>

            <footer className="border-t border-hairline bg-canvas px-4 py-4 sm:px-6">
              <div className="mx-auto w-full max-w-2xl">
                {!typing && currentStep?.chips ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2">
                      {currentStep.chips.map((chip) => {
                        const active = currentStep.multi && selectedChips.includes(chip);
                        return (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => (currentStep.multi ? toggleGoalChip(chip) : submitChip(chip))}
                            className={`rounded-pill border-2 px-4 py-2.5 text-sm font-bold capitalize transition-colors duration-200 ${
                              active ? 'border-link bg-cloud text-link' : 'border-hairline text-ink-soft hover:border-link hover:text-link'
                            }`}
                          >
                            {chip}
                          </button>
                        );
                      })}
                    </div>
                    {currentStep.multi && (
                      <button
                        type="button"
                        onClick={submitGoals}
                        disabled={!selectedChips.length}
                        className="self-end rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-on-primary disabled:opacity-40"
                      >
                        continue
                      </button>
                    )}
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      submitFreeText(inputValue);
                    }}
                    className="flex items-center gap-2 rounded-lg border-2 border-hairline bg-cloud px-3 py-1"
                  >
                    <input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={currentStep?.placeholder ?? 'type your answer'}
                      disabled={typing}
                      autoFocus
                      className="h-12 flex-1 bg-transparent text-sm font-semibold text-ink outline-none placeholder:font-medium placeholder:text-ink-soft"
                    />
                    <button
                      type="submit"
                      disabled={typing || !inputValue.trim()}
                      aria-label="send"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary disabled:opacity-40"
                    >
                      <Send size={15} />
                    </button>
                  </form>
                )}
              </div>
            </footer>
          </>
        ) : phase === 'review' ? (
          generatedProfile && (
            <main className="flex-1 overflow-y-auto px-4 py-10 sm:px-6">
              <ReviewProfile profile={generatedProfile} onSave={handleSave} />
            </main>
          )
        ) : (
          <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
            <LocationStep onDone={handleLocationDone} />
          </main>
        )}
      </div>
    </>
  );
}
