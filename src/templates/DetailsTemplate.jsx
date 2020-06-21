import React from 'react';
import PropTypes from 'prop-types';
import SidebarTemplate from 'templates/SidebarTemplate';
// import { Link } from 'react-router-dom';

const DetailsTemplate = ({ children }) => (
  <SidebarTemplate pageType="notes">{children}</SidebarTemplate>
);

DetailsTemplate.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DetailsTemplate;
