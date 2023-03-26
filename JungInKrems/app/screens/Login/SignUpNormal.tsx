import React from 'react';
import SafeView from '../../styles/SafeView';
import LoginStyles from '../../styles/LoginStyles';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, SafeAreaView, StyleSheet, Pressable, ImageBackground, TextInput, ScrollView} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignUpNormal({navigation}){

    const server = '162.55.215.235';
    const [email, onChangeMail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [password2, onChangePassword2] = React.useState('');
    const [name, onChangeName] = React.useState('');

    const SignUp = async (email:any,password:any,name:any,password2:any) => {

        if(email!==''&&password!==''&&password2!==''&&name!==''){
            if(password==password2){
                var token:any;

                const signupquery = {
                    name : name,
                    password : password,
                    email : email
                }

                const config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }      
                };
        
                await axios.post('http://'+server+'/api/register', signupquery,config)
                    .then(async (response) => {
                        await console.log(response.data);
                        token = await response.data;
                            //console.error(typeof token);
                            //console.error(token);
                            //console.error(token.token);
                            try {
                                //console.error(token.token);
                                await AsyncStorage.setItem('email', email)
                                await AsyncStorage.setItem('password', password)
                                await AsyncStorage.setItem('token', JSON.stringify(token))
                                await navigation.navigate('Settings');
                            } catch (e) {
                                // saving error
                                console.log('Saving: '+e);
                            }
                    })
                    .catch((error) => {
                        console.log('Singup '+error);
                    });
            }
            else{
                console.log('password not same')
                console.log(password);
                console.log(password2);
            }
        }
        else{
            console.log('data null');
            console.log('Data:');
            console.log(name);
            console.log(password);
            console.log(password2);
            console.log(email);
        }
    }

    return (
        <View>
            <ImageBackground source={require('../../assets/LoginImage.png')} resizeMode="cover" style={LoginStyles.ImageStyle}>
                <SafeAreaView style={SafeView.droidSafeArea}>
                    <ScrollView>
                        <Pressable onPress={() => navigation.navigate('SettingsLoginNav')} style={styles.backcontainer}>
                            <MaterialIcon name='arrow-back-ios' size={35} color={'white'} style={styles.backicon}/>
                        </Pressable>
                        <View style={styles.inputmargin}>
                            <View style={LoginStyles.inputcontainer}>
                                <Feather name='user' color={'white'} size={32} style={LoginStyles.iconstyle}/>
                                <TextInput 
                                style = {LoginStyles.inputs}
                                placeholder = 'Nutzername'
                                placeholderTextColor={'white'}
                                value={name}
                                onChangeText={onChangeName}
                                />
                            </View>
                            <View style={LoginStyles.inputcontainer}>
                                <Feather name='mail' color={'white'} size={32} style={LoginStyles.iconstyle}/>
                                <TextInput 
                                style = {LoginStyles.inputs}
                                placeholder = 'Email'
                                placeholderTextColor={'white'}
                                value={email}
                                onChangeText={onChangeMail}
                                />
                            </View>
                            <View style={LoginStyles.inputcontainer}>
                                <MaterialIcon name='lock-outline' color={'white'} size={32} style={LoginStyles.iconstyle}/>
                                <TextInput 
                                style = {LoginStyles.inputs}
                                placeholder = 'Passwort'
                                placeholderTextColor={'white'}
                                secureTextEntry={true}
                                value={password}
                                onChangeText={onChangePassword}
                                />
                            </View>
                            <View style={LoginStyles.inputcontainer}>
                                <MaterialIcon name='lock-outline' color={'white'} size={32} style={LoginStyles.iconstyle}/>
                                <TextInput 
                                style = {LoginStyles.inputs}
                                placeholder = 'Passwort bestätigen'
                                placeholderTextColor={'white'}
                                secureTextEntry={true}
                                value={password2}
                                onChangeText={onChangePassword2}
                                />
                            </View>
                        </View>
                        <Pressable style={LoginStyles.logincontainer} onPress={() => SignUp(email,password,name,password2)}>
                            <Text style={LoginStyles.logintext}>{'Registrieren'}</Text>
                        </Pressable>
                        <View style={styles.returncontainer}>
                            <Text style={[styles.textleft,LoginStyles.textshadow]}>{'Sie haben bereits einen erstellt?'}</Text>
                            <Pressable style={styles.containerright} onPress={() => navigation.goBack()}>
                                <Text style={[styles.textright,LoginStyles.textshadow]}>{'Anmelden'}</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
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
    inputmargin : {
        marginTop : '20%'
    },
    returncontainer : {
        flexDirection : 'row',
        alignSelf : 'center',
        alignItems : 'center',
        marginTop : '15%'
    },
    textleft : {
        color : 'white',
    },
    textright : {
        color: '#FFCC00'
    },
    containerright : {
        marginLeft : '1%',
    }
})

export default SignUpNormal;