import styled, { css } from 'styled-components';
import magnifierIcon from 'assets/magnifier.svg';

const Input = styled.input`
  // Basic input component
  padding: 1.5rem 3rem;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.regular};
  background-color: ${({ theme }) => theme.grey100};
  border: none;
  border-radius: 5rem;

  ::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.grey300};
  }
  // With search prop
  ${({ search }) =>
    search &&
    css`
      padding: 1rem 2rem 1rem 4rem;
      font-size: ${({ theme }) => theme.fontSize.xs};
      background-image: url(${() => magnifierIcon});
      background-size: 1.5rem;
      background-position: 1.5rem 50%;
      background-repeat: no-repeat;
    `}
`;

export default Input;
