import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  min-height: 38rem;
  box-shadow: 0 10px 30px -5px hsla(0, 0%, 0%, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-rows: 0.25fr 1fr;
`;
const InfoCard = () => (
  <StyledWrapper>
    <h1>XDDDD</h1>
  </StyledWrapper>
);

export default InfoCard;
