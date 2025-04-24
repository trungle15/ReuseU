import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  jwtToken: string | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  jwtToken: null,
  loading: true,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const firebaseToken = await user.getIdToken();
          setJwtToken(firebaseToken);
          console.log("firebaseToken", firebaseToken);
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          setJwtToken(null);
        }
      } else {
        setJwtToken(null);
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, jwtToken, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}; 