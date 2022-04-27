import React from 'react';

import { ViewPropTypes, TextProps } from 'react-native';

import {
  Container,
  Title,
  Notification,
  Quantity,
  WithoutNotification,
  ZeroQuantity
} from './styles';

type Props = {
  title: string;
  color: string;
  notifications?: string | undefined;
}

export function BottomMenu({ title, color, notifications }: Props) {
  const noNotifications = notifications === '0';

  return (
    <Container>
      <Title color={color}>{title}</Title>

      {
        !noNotifications && title == 'Pedidos' && (
          <Notification>
            <Quantity>
              {notifications}
            </Quantity>
          </Notification>
        )
      }
      {
        noNotifications && title == 'Pedidos' &&
        <WithoutNotification>
          <ZeroQuantity>
            {notifications}
          </ZeroQuantity>
        </WithoutNotification>
      }
    </Container>
  )
}
