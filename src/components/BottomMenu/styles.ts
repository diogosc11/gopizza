import styled, { css } from 'styled-components/native';

type TitleProps = {
  color: string;
}

type NotificationProps = {
  noNotification: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text<TitleProps>`
  font-size: 18px;

  ${({ theme, color }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${color};
  `};
`;

export const Notification = styled.View`
  height: 20px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  margin-left: 8px;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.SUCCESS_900};
  `};
`;

export const WithoutNotification = styled.View`
height: 20px;
border-radius: 12px;
align-items: center;
justify-content: center;
padding: 0 12px;
margin-left: 8px;

${({ theme }) => css`
  background-color: transparent;
  border: 1px solid ${theme.COLORS.SHAPE};
`};
`;

export const Quantity = styled.Text`
  font-size: 12px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE};
  `};
`;

export const ZeroQuantity = styled.Text`
  font-size: 12px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_500};
  `};
`;
