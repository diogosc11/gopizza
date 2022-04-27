import React from 'react';
import { TextInputProps, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import {
  Container,
  Input,
  InputArea,
  ButtonClear
} from './styles';

type Props = TextInputProps & {
  onSearch: () => void;
  onClear: () => void;
};

export function Search({ onSearch, onClear, ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container>
      <InputArea>
        <Input placeholder="Pesquisar..." {...rest} />

        <ButtonClear onPress={onClear}>
          <Feather name='x' size={16} />
        </ButtonClear>
      </InputArea>

      <TouchableOpacity style={styles.buttonSearch} onPress={onSearch}>
        <Feather name='search' size={16} color={COLORS.TITLE} />
      </TouchableOpacity>
    </Container>
  )
}

const styles = StyleSheet.create({
  buttonSearch: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#528F33',
    borderRadius: 18,
    marginLeft: 7,
  }
});
