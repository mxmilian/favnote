import styled from 'styled-components';

const Heading = styled.h1`
  font-size: ${({ big, theme }) => (big ? theme.fontSize.xl : theme.fontSize.l)};
  font-weight: ${({ theme }) => theme.bold};
`;

export default Heading;
