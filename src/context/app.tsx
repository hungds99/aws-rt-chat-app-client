import { createContext } from 'react';
import { User } from '../shared/interface/user';

interface AppContextProps {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
}

export const AppContext = createContext<AppContextProps>({
  authUser: null,
  setAuthUser: () => {}
});
