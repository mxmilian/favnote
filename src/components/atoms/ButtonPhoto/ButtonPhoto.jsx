import styled from 'styled-components';

const ButtonPhoto = styled.button`
  display: block;
  width: 25.7rem;
  height: 25.7rem;
  border-radius: 100rem;
  border: none;
  background: url(${({ icon }) => icon}) no-repeat 50% 50%;
  background-size: 100% 100%;
  cursor: pointer;
  display: block;

  @media (max-width: 375px) {
    background-size: 40% 40%;
  }

  &.active {
    background-color: white;
  }
`;

export default ButtonPhoto;
