// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseAuthReturn {
  isLoading: boolean;
  error: Error | null;
}

export const useAuth = (): UseAuthReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async (): Promise<void> => {
      try {
        const response = await fetch("/login/isLoggedIn", {
          credentials: "include",
        });
        if (response.status === 302) {
          navigate("/home");
        }
      } catch (error) {
        setError(error instanceof Error ? error : new Error('Authentication failed'));
      } finally {
        setIsLoading(false);
      }
    };
    
    checkLoggedIn();
  }, [navigate]);

  return { isLoading, error };
};