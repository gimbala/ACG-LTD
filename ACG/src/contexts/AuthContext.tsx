import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase';
import { isSupabaseConfigured } from '@/lib/supabase-config';
import { fetchProfile } from '@/lib/supabase-data';
import type { ProfileRow } from '@/types/acg';

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  profile: ProfileRow | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured());

  const refreshProfile = useCallback(async (userId: string | undefined) => {
    if (!userId || !isSupabaseConfigured()) {
      setProfile(null);
      return;
    }
    const p = await fetchProfile(userId);
    setProfile(p);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }
    const sb = getSupabase();
    if (!sb) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    sb.auth.getSession().then(({ data: { session: s } }) => {
      if (cancelled) return;
      setSession(s);
      refreshProfile(s?.user?.id).finally(() => {
        if (!cancelled) setLoading(false);
      });
    });

    const {
      data: { subscription },
    } = sb.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      void refreshProfile(s?.user?.id);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [refreshProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    const sb = getSupabase();
    if (!sb) return { error: new Error('Supabase is not configured') };
    const { error } = await sb.auth.signInWithPassword({ email, password });
    return { error: error ? new Error(error.message) : null };
  }, []);

  const signOut = useCallback(async () => {
    const sb = getSupabase();
    if (sb) await sb.auth.signOut();
    setSession(null);
    setProfile(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      loading,
      signIn,
      signOut,
    }),
    [session, profile, loading, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
