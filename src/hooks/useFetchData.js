import { useEffect, useState } from 'react';

export const useFetchData = (action, type) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading((prevState) => !prevState);
    action(type).then(() => setLoading((prevState) => !prevState));
  }, [action, type]);
  return loading;
};
