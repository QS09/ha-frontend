import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('context must be use inside provider');
  return context;
};

export default useAuth;
