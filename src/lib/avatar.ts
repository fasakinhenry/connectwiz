const ADJECTIVES = ['swift', 'bold', 'sunny', 'quiet', 'brave', 'lucky', 'calm', 'bright'];
const ANIMALS = ['fox', 'otter', 'falcon', 'panda', 'wolf', 'lynx', 'heron', 'tiger'];

/** Generates a fun, memorable seed like "bold-otter-482" for a fresh signup. */
export function randomAvatarSeed(): string {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  const num = Math.floor(Math.random() * 900) + 100;
  return `${adjective}-${animal}-${num}`;
}

/**
 * Snapchat/Duolingo-style avatar, generated for free with no upload needed.
 * Backed by DiceBear's public API — deterministic per seed, so the same
 * seed always renders the same character.
 */
export function avatarUrlForSeed(seed: string): string {
  const params = new URLSearchParams({ seed, backgroundType: 'gradientLinear' });
  return `https://api.dicebear.com/9.x/adventurer/svg?${params.toString()}`;
}
