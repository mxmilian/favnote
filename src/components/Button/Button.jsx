import styled, { css } from 'styled-components';

const Button = styled.button`
  // Basic value of our component
  background-color: #ffd82b;
  width: ${({ width }) => width || '22rem'};
  height: 4.7rem;
  border: none;
  border-radius: 5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 1.6rem;
  text-transform: uppercase;

  // With secondary props value of our component
  ${({ secondary }) =>
    secondary &&
    css`
      background-color: #e6e6e6;
      width: 10.5rem;
      height: 3rem;
      font-size: 1rem;
    `}
`;

export default Button;
