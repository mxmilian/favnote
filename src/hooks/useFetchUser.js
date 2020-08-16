import axios from 'axios';
import { useEffect } from 'react';

export const useFetchUser = (fetchUser, user) => {
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = () => {
      if (Object.keys(user).length === 0) {
        fetchUser(source);
      }
    };
    fetchData();

    return () => {
      source.cancel();
    };
  }, [user, fetchUser]);
};
