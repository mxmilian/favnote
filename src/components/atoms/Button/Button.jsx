import styled, { css } from 'styled-components';

const Button = styled.button`
  // Basic value of our component
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  text-decoration: none;
  padding: 0;
  background-color: ${({ theme, activecolor }) => theme[activecolor]};
  width: 22rem;
  height: 4.7rem;
  border: none;
  border-radius: 5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1.6rem;
  text-transform: uppercase;
  cursor: pointer;

  // With secondary props value of our component
  ${({ secondary }) =>
    secondary &&
    css`
      background-color: ${({ theme, activecolor }) =>
        activecolor ? theme[activecolor] : theme.grey200};
      width: 10.5rem;
      height: 3rem;
      font-size: 1rem;
    `}
  ${({ tertiary }) =>
    tertiary &&
    css`
      background-color: ${({ theme, activecolor }) => theme[activecolor]};
      width: 14.5rem;
      height: 3.5rem;
      font-size: 1rem;
    `}
`;

export default Button;
