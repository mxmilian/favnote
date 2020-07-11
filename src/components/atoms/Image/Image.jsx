import styled from 'styled-components';

const Image = styled.div`
  display: block;
  width: 10.7rem;
  height: 10.7rem;
  border-radius: 100%;
  border: 1px solid white;
  background: white url(${({ icon }) => icon}) no-repeat 50% 50%;
  background-size: 100% 100%;
  overflow: hidden;
  content: '';
`;

export default Image;
