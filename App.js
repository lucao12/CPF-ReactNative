import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet ,Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInputMask } from 'react-native-masked-text'

export default function App() {

  const [cpf, setCpf] = useState('');
  const [cpfUser, setCpfUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputSair = useRef(null);

  useEffect(()=>{
    setLoading(false);
    setCpfUser(null);
    setCpf('');
  }, []);

  function handlePressOutside() {
    inputSair.current?.getElement().blur();
  }

  function Verifica1(CPF)
  {
    let primeiro = 0, conta = 100000000, soma = 0, num1 = 0, contador = 1;
    do
    {
        primeiro = CPF / conta;
        primeiro = Math.floor(primeiro);
        CPF = CPF - (primeiro * conta);
        primeiro *= contador;
        contador++;
        soma = soma + primeiro;
        conta = conta / 10;
    } while (contador < 10);
    num1 = soma % 11;
    if (num1 >= 10)
    {
        num1 = 0;
    }
    return num1;
  }

  function Verifica2(CPF, num1)
  {
      let primeiro = 0, conta = 1000000000, soma = 0, num2 = 0, contador = 0;
          CPF = (CPF * 10) + num1;
          do
          {
              primeiro = CPF / conta;
              primeiro = Math.floor(primeiro);
              CPF = CPF - primeiro * conta;
              primeiro *= contador;
              contador++;
              soma = soma + primeiro;
              conta = conta / 10;
          } while (contador < 10);
          num2 = soma % 11;
          if (num2 >= 10)
          {
              num2 = 0;
          }
          return num2;
  }

  function limpar() {
    setCpf('');
    setCpfUser('');
    inputSair.current.getElement().focus();
  }

  function handleChangeText(texto) {
    setCpf(texto);
  }

  function buscar(){
    setLoading(true);
    Keyboard.dismiss();
    if(cpf === ''){
      Alert.alert('ERRO', 'Digite algum valor para calcular');
      setLoading(false);
      return;
    }
    else if(cpf.length < 11){
      Alert.alert('ERRO', 'CPF inválido');
      setLoading(false);
      setCpf('');
      return;
    }
    let newCPF = cpf.replace(/\./g, '');
    let valor1 = Verifica1(parseFloat(newCPF));
    console.log(valor1);
    let valor2 = Verifica2(parseFloat(newCPF), parseFloat(valor1));
    console.log(valor2);
    setCpfUser(cpf + '-' + valor1 + valor2);
    setCpf('');
    setLoading(false);
  }


  return(
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <SafeAreaView style={styles.container}>

          <View 
          style={{alignItems: 'center'}}>

            <Text
            style={styles.text}>
              Digite os 9 primeiros digitos do CPF desejado
            </Text>

            <TextInputMask
            style={styles.input}
            type={'cpf'}
            placeholder='Ex: 12345678'
            placeholderTextColor='#FFF'
            value={cpf}
            onChangeText={ handleChangeText }
            keyboardType='numeric'
            ref={inputSair}
            maxLength={11}
            />

          </View>

          <View
          style={styles.areaBtn}>

            <TouchableOpacity
            style={[styles.botao, {backgroundColor: '#1D75CD'}]}
            onPress={buscar}>

              <Text
              style={styles.botaoText}>

                Calcular

              </Text>

            </TouchableOpacity>

            <TouchableOpacity
            style={[styles.botao, {backgroundColor: '#FF0000'}]}
            onPress={limpar}>

              <Text
              style={styles.botaoText}>

                Limpar

              </Text>

            </TouchableOpacity>

          </View>

            {loading && ( 
              <ActivityIndicator style={{marginTop: 150}} color="#1D75CD" size={50} />
              )}

         { cpfUser && 
         <View
          style={styles.resultado}
          >

            <Text
            style={styles.itemText}>

              CPF: {cpfUser}

            </Text>

          </View>}

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222'
  },
  text:{
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFF'
  },
  input:{
    borderColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    color: '#FFF',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18,
  },
  areaBtn:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'space-around',
    width: '100%',
    
  },
  botao:{
    height: 'auto',
    width: '32%',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 5,
  },
  botaoText:{
    fontSize: 22,
    color: '#FFF',
  },
  resultado:{
    width: 'auto',
    justifyContent: 'center',
    paddingLeft: '7%',
    marginTop: '20%'
  },
  itemText:{
    fontSize: 22,
    color: '#FFF',
    paddingTop: 2
  }, 
});