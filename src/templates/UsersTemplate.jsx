import Header from 'components/molecules/Header/Header';
import withContext from 'hoc/withContext';
import PropTypes from 'prop-types';
import React from 'react';
import SidebarTemplate from 'templates/SidebarTemplate';

const UsersTemplate = ({ children }) => (
  <SidebarTemplate>
    <Header />
    {children}
  </SidebarTemplate>
);

UsersTemplate.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default withContext(UsersTemplate);
