import { createContext, useState } from 'react';
import { LocalStorageService } from '../services/LocalStorage.service';

export const AppContext = createContext();

function AppProvider({ children }) {
  const INITIAL_USER = LocalStorageService.getItem('user') || {};
  const [user, setUser] = useState(INITIAL_USER);

  return (
  <AppContext.Provider value={{ user, setUser }}>
    {children}
  </AppContext.Provider>
  )
}

export default AppProvider;
