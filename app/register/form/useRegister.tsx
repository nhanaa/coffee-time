import React from 'react';
import { useRouter } from 'next/navigation';
import { RegisterFormValues } from '@/types/types';

export const useRegister = () => {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const registerUser = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        status: 'picked',
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      router.push('/');
    }
  };

  return { registerUser, isLoading, error };
};
