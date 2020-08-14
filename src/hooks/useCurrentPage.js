import { useEffect, useState } from 'react';
import { NOTES, TWITTERS, ARTICLES, USERS } from 'utils/constants';

export const useCurrentPage = (location) => {
  const [pageType, setPageType] = useState(NOTES);
  const pageTypes = [NOTES, TWITTERS, ARTICLES, USERS];

  useEffect(() => {
    const [currentPage] = pageTypes.filter((el) => location.pathname.includes(el));
    if (pageType !== currentPage && currentPage !== undefined) setPageType(currentPage);
  }, [location.pathname.split('/')[1]]);

  return pageType;
};
