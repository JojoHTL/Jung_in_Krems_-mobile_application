import React from 'react';
import SafeView from '../../styles/SafeView';
import LoginStyles from '../../styles/LoginStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, SafeAreaView, StyleSheet, Pressable, ImageBackground, TextInput, Modal} from 'react-native';




function LoginScreen({navigation}){
    const server = '162.55.215.235';
    const [email, onChangeMail] = React.useState('');
    const [password, onChangePassword] = React.useState('');


    const LogIn = async (email:any,password:any) => {
    
        var token:any
    
        const tokenquery = {
            email: email,
            password: password,
          };

        axios.post('http://'+server+'/api/login', tokenquery)
            .then(async (response) => {
                token = response.data;
                //console.error(typeof token);
                //console.error(token);
                //console.error(token.token);
                try {
                    //console.error(token.token);
                    await AsyncStorage.setItem('email', email)
                    await AsyncStorage.setItem('password', password)
                    await AsyncStorage.setItem('token', JSON.stringify(token))
                    const value = await AsyncStorage.getItem('token');
                    await navigation.goBack();
                } catch (e) {
                    // saving error
                    console.log(e);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <View>
            <ImageBackground source={require('../../assets/LoginImage.png')} resizeMode="cover" style={LoginStyles.ImageStyle}>
                <SafeAreaView style={SafeView.droidSafeArea}>
                    <Pressable onPress={() => navigation.navigate('SettingsLoginNav')} style={styles.backcontainer}>
                    <MaterialIcon name='arrow-back-ios' size={35} color={'white'} style={styles.backicon}/>
                    </Pressable>
                    <Text style={[styles.headline, styles.headlinemargin]}>{"Jung in Krems"}</Text>
                    <View style={styles.margininputs}>
                        <View style={LoginStyles.inputcontainer}>
                            <Feather name='mail' color={'white'} size={32} style={LoginStyles.iconstyle}/>
                            <TextInput
                            placeholder='Email'
                            style = {LoginStyles.inputs}
                            //value = "Email"
                            placeholderTextColor={'white'}
                            onChangeText={onChangeMail}
                            />
                        </View>
                        <View style={LoginStyles.inputcontainer}>
                            <MaterialIcon name='lock-outline' color={'white'} size={32} style={LoginStyles.iconstyle}/>
                            <TextInput
                            placeholder='Password'
                            //value='Password'
                            style = {LoginStyles.inputs}
                            placeholderTextColor={'white'}
                            secureTextEntry={true}
                            onChangeText={onChangePassword}
                            />
                        </View>
                    </View>
                    <Pressable style={styles.pwresetcontainer} onPress={() => navigation.navigate('ResetPass')}>
                        <Text style={styles.pwreset}>{'Passwort vergessen?'}</Text>
                    </Pressable>
                    <Pressable style={LoginStyles.logincontainer} onPress={() => LogIn(email,password)}>
                        <Text style={LoginStyles.logintext}>{'Anmelden'}</Text>
                    </Pressable>
                    <Pressable style={[styles.singupcontainer, styles.singupmargin]} onPress={() => navigation.navigate('Signupnorm')}>
                        <Text style={styles.singup}>{'Registrieren'}</Text>
                    </Pressable>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    backicon : {
        textShadowColor: 'rgba(0, 0, 0, 0.68)',
        textShadowOffset: {width: -0.5, height: 0.5},
        textShadowRadius: 5,
        paddingLeft : '1%'
    },
    backcontainer : {
        marginLeft: '4%'
    },
    headline : {
        color : 'white',
        fontWeight : 'bold',
        alignSelf : 'center',
        fontSize : 45,
        textShadowColor: 'rgba(0, 0, 0, 0.68)',
        textShadowOffset: {width: -0.5, height: 0.5},
        textShadowRadius: 5,
        padding : '1%'
    },
    headlinemargin : {
        marginTop : '4%'
    },
    margininputs :{
        marginTop : '15%' 
    },
    pwreset : {
        color : 'white',
        fontSize : 15,
        fontWeight : 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.68)',
        textShadowOffset: {width: -0.5, height: 0.5},
        textShadowRadius: 5,
        padding : '1%'
    },
    pwresetcontainer : {
        alignSelf : 'center',
        paddingTop : '4%'
    },
    singupmargin : {
        marginTop : '12%'
    },
    singupcontainer : {
        borderBottomWidth : 0.7,
        borderBottomColor : 'gray',
        alignSelf : 'center',
        marginTop : '2%'
    },
    singup : {
        color : 'white',
        fontWeight : 'bold',
        fontSize : 15
    }
})

export default LoginScreen;