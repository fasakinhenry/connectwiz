import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type { NetworkingProfile } from '@/lib/connectwiz-types';
import { ProfileEditorForm } from '@/components/connectwiz/profile-editor-form';

export function ReviewProfile({
  profile,
  onSave,
}: {
  profile: NetworkingProfile;
  onSave: (profile: NetworkingProfile) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full max-w-2xl"
    >
      <div className="mb-4 flex items-center gap-2 text-link">
        <CheckCircle2 size={20} />
        <p className="text-sm font-bold uppercase tracking-wide">your profile is ready — take a look</p>
      </div>

      <ProfileEditorForm profile={profile} onSave={onSave} submitLabel="save & enter connectwiz" />
    </motion.div>
  );
}
