import arrowDown from 'assets/arrow-down.svg';
import arrowUp from 'assets/arrow-up.svg';
import React from 'react';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cx from 'classnames';

const StyledWrapper = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
`;

const StyledSelectButton = styled.button`
  background-image: url(${({ value }) => (value === 'asc' ? arrowDown : arrowUp)});
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.regular};
  background-color: ${({ theme }) => theme.grey100};
  border: none;
  border-radius: 5rem;
  padding: 1rem 2rem 1rem 3rem;
  font-size: ${({ theme }) => theme.fontSize.xs};
  background-size: 1.5rem;
  background-position: 1.5rem 50%;
  background-repeat: no-repeat;
  text-transform: uppercase;
  color: ${({ theme }) => theme.black};
  min-width: 20rem;

  @media (max-width: 560px) {
    margin: 2rem 0;
  }
`;

const Select = ({ items, setSortBy }) => (
  <Downshift
    onChange={(selection) => {
      setSortBy(selection.value);
    }}
    itemToString={(item) => (item ? item.value : '')}
  >
    {({ getItemProps, isOpen, toggleMenu, selectedItem, getMenuProps, getRootProps }) => (
      <StyledWrapper {...getRootProps()}>
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
            {selectedItem ? selectedItem.name : 'Select an order'}
          </StyledSelectButton>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content" {...getMenuProps()}>
              {items.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  className={cx('dropdown-item', 'button', 'is-white', 'is-size-5', {
                    'is-active': item.value === selectedItem ? selectedItem.value : '',
                  })}
                  {...getItemProps({ item })}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </StyledWrapper>
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
