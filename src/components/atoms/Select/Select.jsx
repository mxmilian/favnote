import arrowDown from 'assets/arrow-down.svg';
import arrowUp from 'assets/arrow-up.svg';
import React from 'react';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cx from 'classnames';

const StyledSelectButton = styled.button`
  margin-left: 2rem;
  background-image: url(${({ value }) => (value === 'asc' ? arrowDown : arrowUp)});
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.regular};
  background-color: ${({ theme }) => theme.grey100};
  border: none;
  border-radius: 5rem;
  padding: 1rem 2rem 1rem 4rem;
  font-size: ${({ theme }) => theme.fontSize.xs};
  background-size: 1.5rem;
  background-position: 1.5rem 50%;
  background-repeat: no-repeat;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.black};
  min-width: 20rem;

  @media (max-width: 560px) {
    margin-top: 2rem;
    margin-left: 0;
  }
`;

const Select = ({ items, setSortBy }) => (
  <Downshift
    onChange={(selection) => {
      setSortBy(selection.value);
    }}
    itemToString={(item) => (item ? item.value : '')}
  >
    {({ getItemProps, isOpen, toggleMenu, selectedItem, getMenuProps }) => (
      <div
        className={cx('dropdown', {
          'is-active': isOpen,
        })}
      >
        <StyledSelectButton
          id="my-select"
          type="button"
          onClick={toggleMenu}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={isOpen}
          value="desc"
        >
          {selectedItem ? selectedItem.name : 'Select an item'}
        </StyledSelectButton>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content" {...getMenuProps()}>
            {items.map((item) => (
              <button
                type="button"
                key={item.value}
                className={cx('dropdown-item', 'button', 'is-white', {
                  'is-active': item.value === selectedItem,
                })}
                {...getItemProps({ item })}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    )}
  </Downshift>
);

Select.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setSortBy: PropTypes.func.isRequired,
};

export default Select;
