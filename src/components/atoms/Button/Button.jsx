import styled, { css } from 'styled-components';

const Button = styled.button`
  // Basic value of our component
  background-color: ${({ color, theme }) => color || theme.primary};
  width: 22rem;
  height: 4.7rem;
  border: none;
  border-radius: 5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: ${({ theme }) => theme.bold};
  font-size: 1.6rem;
  text-transform: uppercase;

  // With secondary props value of our component
  ${({ secondary }) =>
    secondary &&
    css`
      background-color: ${({ theme }) => theme.grey300};
      width: 10.5rem;
      height: 3rem;
      font-size: 1rem;
    `}
`;

export default Button;
