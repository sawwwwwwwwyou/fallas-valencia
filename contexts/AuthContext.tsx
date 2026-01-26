import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User, AuthError } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  signInWithApple: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: false,
    initialized: false,
  });

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
          initialized: true,
        }));
      } catch (error) {
        console.error('Error getting initial session:', error);
        setState(prev => ({ ...prev, initialized: true }));
      }
    };

    getInitialSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        setState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
          loading: false,
        }));
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      return { error };
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
      });
      return { error };
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const signOut = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        {
          redirectTo: 'fallasvalencia://reset-password',
        }
      );
      return { error };
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // Placeholder for social auth - requires OAuth setup
  const signInWithGoogle = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      return { error };
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const signInWithApple = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
      });
      return { error };
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        resetPassword,
        signInWithGoogle,
        signInWithApple,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
