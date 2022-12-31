import { Session } from '@supabase/supabase-js';
import React, { createContext, useCallback, useState } from 'react';

type SessionContextType = {
  session: Session | null;
  setSession: (session: Session | null) => void;
};
export const SessionContext = createContext<SessionContextType>({} as SessionContextType);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  const setSessionCallback = useCallback((session: Session | null) => {
    setSession(session);
  }, []);

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession: setSessionCallback,
      }}>
      {children}
    </SessionContext.Provider>
  );
};
