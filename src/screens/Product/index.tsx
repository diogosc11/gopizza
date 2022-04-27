import React, { useState, useEffect } from 'react';
import {
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  View
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ProductNavigationProps } from '@src/@types/navigation';

import { ButtonBack } from '@components/ButtonBack'
import { Photo } from '@components/Photo';
import { InputPrice } from '@components/InputPrice';
import { Input } from '@components/Input';
import { ProductProps } from '@components/ProductCard';

import {
  Container,
  Title,
  DeleteLabel,
  Upload,
  Form,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCharacters,
  Header
} from './styles';

type PizzaResponse = ProductProps & {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  }
}

export function Product() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceSizeP, setPriceSizeP] = useState('');
  const [priceSizeM, setPriceSizeM] = useState('');
  const [priceSizeG, setPriceSizeG] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [photoPath, setPhotoPath] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4]
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  async function handleAdd() {
    if (!name.trim()) {
      return Alert.alert('Cadastro', 'Informe o nome da pizza');
    }

    if (!description.trim()) {
      return Alert.alert('Cadastro', 'Informe a descrição da pizza');
    }

    if (!image) {
      return Alert.alert('Cadastro', 'Selecione a imagem da pizza');
    }

    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert('Cadastro', 'Informe o preço de todos os tamanhos da pizza');
    }

    setIsLoading(true);

    const filename = new Date().getTime();
    const reference = storage().ref(`/pizzas/${filename}.png`);

    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection('pizzas')
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        prices_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG
        },
        photo_url,
        photo_path: reference.fullPath
      })
      .then(() => navigation.navigate('home'))
      .catch(() => {
        setIsLoading(false);
        Alert.alert('Cadastro', 'Não foi possível cadastrar a pizza.');
      })

  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleDelete() {
    firestore()
      .collection('pizzas')
      .doc(id)
      .delete()
      .then(() => {
        storage()
          .ref(photoPath)
          .delete()
          .then(() => navigation.navigate('home'));
      })
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection('pizzas')
        .doc(id)
        .get()
        .then(response => {
          const product = response.data() as PizzaResponse;

          setName(product.name);
          setImage(product.photo_url);
          setDescription(product.description);
          setPriceSizeP(product.prices_sizes.p);
          setPriceSizeM(product.prices_sizes.m);
          setPriceSizeG(product.prices_sizes.g);
          setPhotoPath(product.photo_path);
        })
    }
  }, [id])

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <ButtonBack onPress={handleGoBack} />
          <Title>Cadastrar</Title>
          {
            id ?
              <TouchableOpacity onPress={handleDelete}>
                <DeleteLabel>Deletar</DeleteLabel>
              </TouchableOpacity>
              : <View style={{ width: 20 }} />
          }
        </Header>
        <Upload>
          <Photo uri={image} />
          {
            !id &&
            <TouchableOpacity onPress={handlePickerImage} style={styles.button}>
              <Text style={styles.insideText}>Carregar</Text>
            </TouchableOpacity>
          }
        </Upload>
        <Form>
          <InputGroup>
            <Label>Nome</Label>
            <Input onChangeText={setName} value={name} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>
            <Input
              multiline
              maxLength={60}
              style={{ height: 80 }}
              onChangeText={setDescription}
              value={description}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>
            <InputPrice size="P"
              onChangeText={setPriceSizeP} value={priceSizeP}
            />
            <InputPrice size="M"
              onChangeText={setPriceSizeM} value={priceSizeM}
            />
            <InputPrice size="G"
              onChangeText={setPriceSizeG} value={priceSizeG}
            />
          </InputGroup>
          {
            !id &&
            <TouchableOpacity onPress={handleAdd} style={styles.addProductButton}>
              {isLoading ? <ActivityIndicator size="large" color="#FFF" /> : <Text style={{ color: "#FFF" }}>Cadastrar pizza</Text>}
            </TouchableOpacity>
          }
        </Form>
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    maxWidth: 90,
    maxHeight: 50,
    minHeight: 50,
    paddingHorizontal: 10,
    marginLeft: 32,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B83341",
  },
  insideText: {
    color: '#FFF'
  },
  addProductButton: {
    maxHeight: 50,
    minHeight: 50,
    paddingHorizontal: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#528F33"
  }
});
