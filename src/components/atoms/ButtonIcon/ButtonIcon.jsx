import styled from 'styled-components';

const ButtonIcon = styled.button`
  width: 6.7rem;
  height: 6.7rem;
  border-radius: 2rem;
  border: none;
  background-image: url(${({ icon }) => icon});
  background-size: 45%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-color: ${({ active }) => (active ? 'white' : 'transparent')};
`;

export default ButtonIcon;
