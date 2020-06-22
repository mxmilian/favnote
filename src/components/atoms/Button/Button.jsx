import styled, { css } from 'styled-components';

const Button = styled.button`
  // Basic value of our component
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  text-decoration: none;
  padding: 0;
  background-color: ${({ theme, activeColor }) => theme[activeColor]};
  width: 220px;
  height: 47px;
  border: none;
  border-radius: 50px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;

  // With secondary props value of our component
  ${({ secondary }) =>
    secondary &&
    css`
      background-color: ${({ theme }) => theme.grey200};
      width: 10.5rem;
      height: 3rem;
      font-size: 1rem;
    `}
`;

export default Button;
