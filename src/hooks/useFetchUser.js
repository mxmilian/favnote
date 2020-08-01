import { useEffect } from 'react';

export const useFetchUser = (fetchUser, user) => {
  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);
};
