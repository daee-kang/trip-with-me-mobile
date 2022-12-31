import { useContext } from 'react';

import { SessionContext } from '../contexts/SessionContext';

const useGetSession = () => {
  const { session } = useContext(SessionContext);

  if (!session || !session.user) {
    throw new Error('No session! Hook either used out of context or session was not set');
  }

  return session;
};

export default useGetSession;
