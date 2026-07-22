import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { upgradeAnonymousAccount } from '../lib/supabaseClient';
import { useAuthStore } from '../state/authStore';

export interface AccountUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (email: string) => void;
}

export const AccountUpgradeModal: React.FC<AccountUpgradeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successEmail, setSuccessEmail] = useState<string | null>(null);

  const { setIsAnonymous, login } = useAuthStore();

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setError(null);
    setSuccessEmail(null);
    setIsLoading(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Input Validation
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Please enter an email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter a password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await upgradeAnonymousAccount(trimmedEmail, password);

      if (result.success) {
        setSuccessEmail(trimmedEmail);
        setIsAnonymous(false);
        login(trimmedEmail, 'email');
        if (onSuccess) {
          onSuccess(trimmedEmail);
        }
      } else {
        setError(result.error || 'Failed to upgrade account. Please try again.');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred during account upgrade.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', duration: 0.3 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-structural bg-bg-elevated p-6 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            type="button"
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-bg-elevated-2 text-text-secondary hover:text-text-primary hover:bg-structural/50 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-action/10 text-accent-action border border-accent-action/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-text-primary">
                Save Your Progress / Create Account
              </h2>
              <p className="font-body text-xs text-text-secondary">
                Link your current anonymous session to keep all your stats and vocabulary safe.
              </p>
            </div>
          </div>

          {/* Success Banner */}
          {successEmail ? (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="my-4 rounded-2xl border border-success/30 bg-success/10 p-4 text-center"
            >
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-success/20 text-success">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="font-body text-sm font-semibold text-success">
                🎉 Progress Saved! Your anonymous session is now linked to {successEmail}.
              </p>
              <button
                onClick={handleClose}
                type="button"
                className="mt-4 w-full rounded-xl bg-success px-4 py-2.5 font-body text-xs font-bold text-white shadow-md hover:bg-success/90 transition-all"
              >
                Done
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              {/* Error Banner */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 rounded-2xl border border-error/30 bg-error/10 p-3 text-xs font-medium text-error"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Email Input */}
              <div>
                <label className="block font-body text-xs font-semibold text-text-primary mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={isLoading}
                    className="w-full rounded-xl border border-structural bg-bg-elevated-2 pl-9 pr-3 py-2.5 font-body text-xs text-text-primary placeholder:text-text-secondary/50 focus:border-accent-action focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block font-body text-xs font-semibold text-text-primary mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    disabled={isLoading}
                    className="w-full rounded-xl border border-structural bg-bg-elevated-2 pl-9 pr-3 py-2.5 font-body text-xs text-text-primary placeholder:text-text-secondary/50 focus:border-accent-action focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="rounded-xl border border-structural bg-bg-elevated px-4 py-2.5 font-body text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-bg-elevated-2 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-accent-action px-5 py-2.5 font-body text-xs font-bold text-white shadow-md hover:bg-accent-action/90 transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Progress</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AccountUpgradeModal;
