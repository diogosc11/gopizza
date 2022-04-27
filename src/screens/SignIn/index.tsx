import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

import { useAuth } from '../../hooks/auth';

import brandImg from '@assets/brand.png';

import { Input } from '@components/Input';

import { Container, Content, Title, Brand, ForgotPasswordButton, ForgotPasswordLabel } from './styles'

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, isLogging, forgotPassword } = useAuth();

  function handleSignIn() {
    signIn(email, password);
  }

  function handleForgotPassword() {
    forgotPassword(email);
  }

  return (
    <Container>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
        <Content>

          <Brand source={brandImg} />

          <Title>Login</Title>

          <Input
            placeholder="E-mail"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          <Input
            placeholder="Senha"
            type="secondary"
            secureTextEntry
            onChangeText={setPassword}
          />

          <ForgotPasswordButton onPress={handleForgotPassword}>
            <ForgotPasswordLabel>
              Esqueci minha senha
            </ForgotPasswordLabel>
          </ForgotPasswordButton>

          <TouchableOpacity
            onPress={handleSignIn}
            style={styles.button}
          >
            {isLogging ? <ActivityIndicator size="large" color="#FFF" /> : <Text style={styles.text}>Entrar</Text>}
          </TouchableOpacity>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    maxHeight: 56,
    minHeight: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B83341",
  },
  text: {
    fontSize: 14,
    fontFamily: "DMSerifDisplay_400Regular",
    color: "#FFF",
  }
});
