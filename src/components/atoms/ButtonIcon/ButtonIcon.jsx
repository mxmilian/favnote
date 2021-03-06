import styled from 'styled-components';

const ButtonIcon = styled.button`
  display: block;
  width: 6.7rem;
  height: 6.7rem;
  border-radius: 2rem;
  border: none;
  background: url(${({ icon }) => icon}) no-repeat 50% 50%;
  background-size: 50% 50%;
  cursor: pointer;

  @media (max-width: 375px) {
    background-size: 40% 40%;
  }

  &.active {
    background-color: white;
  }
`;

export default ButtonIcon;
