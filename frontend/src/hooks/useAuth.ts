import { AuthContext } from '@/providers/AuthContext';
import { useContext } from 'react';

export const useAuth = () => useContext(AuthContext);
