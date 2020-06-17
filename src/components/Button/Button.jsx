import styled, { css } from 'styled-components';

const Button = styled.button`
  // Basic value of our component
  background-color: ${({ color }) => color || 'hsl(49, 100%, 58%)'};
  width: ${({ width }) => width || '22rem'};
  height: 4.7rem;
  border: none;
  border-radius: 5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1.6rem;
  text-transform: uppercase;

  // With secondary props value of our component
  ${({ secondary }) =>
    secondary &&
    css`
      background-color: hsl(0, 0%, 90%);
      width: 10.5rem;
      height: 3rem;
      font-size: 1rem;
    `}
`;

export default Button;
