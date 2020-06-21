import React from 'react';
import PropTypes from 'prop-types';
import SidebarTemplate from 'templates/SidebarTemplate';

const DetailsTemplate = ({ children, pageType }) => (
  <SidebarTemplate pageType={pageType}>{children}</SidebarTemplate>
);

DetailsTemplate.propTypes = {
  pageType: PropTypes.oneOf(['notes', 'articles', 'twitters']).isRequired,
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DetailsTemplate;
