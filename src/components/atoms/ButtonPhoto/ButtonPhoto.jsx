import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import cameraImg from 'assets/camera.svg';

const StyledButtonPhoto = styled.button`
  position: relative;
  display: block;
  width: 25.7rem;
  height: 25.7rem;
  border-radius: 100rem;
  border: none;
  background: url(${({ icon }) => icon}) no-repeat 50% 50%;
  background-size: 100% 100%;
  cursor: pointer;

  @media (max-width: 375px) {
    background-size: 40% 40%;
  }
`;

const StyledButtonHover = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25.7rem;
  height: 25.7rem;
  background: url(${() => cameraImg}) no-repeat 50% 50% hsla(0, 0%, 100%, 50%);
  background-size: 50% 50%;
  border-radius: 100rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.4s;

  &:hover {
    opacity: 1;
    transition: opacity 0.4s;
  }
`;

const ButtonPhoto = ({ icon, forInput }) => (
  <>
    <StyledButtonPhoto icon={icon}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={forInput}>
        <StyledButtonHover />
      </label>
    </StyledButtonPhoto>
  </>
);

ButtonPhoto.propTypes = {
  forInput: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default ButtonPhoto;
