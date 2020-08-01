import { useEffect, useState } from 'react';

export const useCurrentPage = (location) => {
  const [pageType, setPageType] = useState('notes');
  const pageTypes = ['notes', 'twitters', 'articles', 'users'];

  useEffect(() => {
    const [currentPage] = pageTypes.filter((el) => location.pathname.includes(el));
    if (pageType !== currentPage && currentPage !== undefined) setPageType(currentPage);
  }, [location.pathname.split('/')[1]]);

  return pageType;
};
