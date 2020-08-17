import { useEffect, useState } from 'react';
import { NOTES, TWITTERS, ARTICLES, USERS } from 'utils/constants';

export const useCurrentPage = (location) => {
  const [pageType, setPageType] = useState(NOTES);
  const pageTypes = [NOTES, TWITTERS, ARTICLES, USERS];
  const page = location.pathname.split('/')[1];

  useEffect(() => {
    const [currentPage] = pageTypes.filter((el) => page.includes(el));
    if (pageType !== currentPage && currentPage !== undefined) {
      setPageType(currentPage);
    }
  }, [page, pageType, pageTypes]);

  return pageType;
};
