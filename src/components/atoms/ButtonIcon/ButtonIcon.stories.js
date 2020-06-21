import React from 'react';
import styled from 'styled-components';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import penIcon from 'assets/pen.svg';
import bulbIcon from 'assets/bulb.svg';
import logoutIcon from 'assets/logout.svg';
import twitterIcon from 'assets/twitter.svg';

const YellowBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25rem;
  height: 55rem;
  background-color: ${({ theme }) => theme.notes};
`;

export default {
  component: ButtonIcon,
  title: 'atoms/ButtonIcon',
  decorators: [(story) => <YellowBackground>{story()}</YellowBackground>],
};

export const Plus = () => <ButtonIcon icon={penIcon} />;
export const PlusActive = () => <ButtonIcon icon={penIcon} active />;
export const Bulb = () => <ButtonIcon icon={bulbIcon} />;
export const BulbActive = () => <ButtonIcon icon={bulbIcon} active />;
export const Pen = () => <ButtonIcon icon={penIcon} />;
export const PenActive = () => <ButtonIcon icon={penIcon} active />;
export const Logout = () => <ButtonIcon icon={logoutIcon} />;
export const LogoutActive = () => <ButtonIcon icon={logoutIcon} active />;
export const Twitter = () => <ButtonIcon icon={twitterIcon} />;
export const TwitterActive = () => <ButtonIcon icon={twitterIcon} active />;
