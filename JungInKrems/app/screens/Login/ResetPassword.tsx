import React, { useCallback, useState } from 'react';
import SafeView from '../../styles/SafeView';
import LoginStyles from '../../styles/LoginStyles';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, SafeAreaView, StyleSheet, Pressable, ImageBackground, TextInput,Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

function ResetPassword({navigation}){

    const server = '162.55.215.235';
    const [email, onChangeMail] = useState('');
    const [error, setError] = useState('');

    const SubmitRequest = async () => {
        if(email!=='')
        {
            const query = {
                email : email.toLocaleLowerCase()
            };    

            try{
                const response = await axios.post('http://'+server+'/api/forgotpassword',query);
                console.log('Sent mail');
                await AsyncStorage.removeItem('email');
                await AsyncStorage.removeItem('password');
                await AsyncStorage.removeItem('token');
                await navigation.goBack();
            }
            catch(e){
                console.log(e);
                setError('request');
            }
        }
        else{
            console.log('no email entered');
            setError('email');
        }
    }


    return (
        <View>
            <ImageBackground source={require('../../assets/LoginImage.png')} resizeMode="cover" style={LoginStyles.ImageStyle}>
                <SafeAreaView style={[SafeView.droidSafeArea,[{flex:1}]]}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.backcontainer}>
                    <MaterialIcon name='arrow-back-ios' size={35} color={'white'} style={styles.backicon}/>
                    </Pressable>
                    <Text style={[styles.resettext, styles.resettextmargin]}>{'Geben sie ihre Email Adresse ein und ihnen'}</Text>
                    <Text style={styles.resettext}>{'wird eine Mail gesendet mit Anweisungen'}</Text>
                    <Text style={styles.resettext}>{'gesendet um ihr Passwort zurückzusetzen'}</Text>
                    {error == '' ? 
                        (
                            <View style={[LoginStyles.inputcontainer,styles.inputmargin]}>
                                <Feather name='mail' color={'white'} size={32} style={LoginStyles.iconstyle}/>
                                <TextInput 
                                style = {LoginStyles.inputs}
                                placeholder = 'Email'
                                placeholderTextColor={'white'}
                                value={email}
                                onChangeText={onChangeMail}
                            />
                            </View>
                        ):(
                            error == 'request' ? 
                            (
                                <View>
                                    <View style={[styles.errorcontainer,styles.inputmargin]}>
                                        <Feather name='mail' color={'white'} size={32} style={LoginStyles.iconstyle}/>
                                        <TextInput 
                                        style = {LoginStyles.inputs}
                                        placeholder = 'Email'
                                        placeholderTextColor={'white'}
                                        value={email}
                                        onChangeText={onChangeMail}
                                    />
                                    </View>
                                    <View style={[{
                                        flexDirection:'row',
                                        justifyContent:'center'
                                    }]}>
                                    <Text style={styles.errortext}>Ein Fehler ist aufgetreten bitte versuchen sie es nocheinmal</Text>
                                    </View>
                                </View> 
                            ):(
                                <View>
                                    <View style={[styles.errorcontainer,styles.inputmargin]}>
                                        <Feather name='mail' color={'white'} size={32} style={LoginStyles.iconstyle}/>
                                        <TextInput 
                                        style = {LoginStyles.inputs}
                                        placeholder = 'Email'
                                        placeholderTextColor={'white'}
                                        value={email}
                                        onChangeText={onChangeMail}
                                    />
                                    </View>
                                    <View style={[{
                                        flexDirection:'row',
                                        justifyContent:'center'
                                    }]}>
                                    <Text style={styles.errortext}>Bitte Email Adresse eingeben</Text>
                                    </View>
                                </View>
                            )
                        )
                    }
                    <Pressable style={[LoginStyles.logincontainer, styles.sendmargin]} onPress={() => SubmitRequest()}>
                        <Text style={LoginStyles.logintext}>{'Senden'}</Text>
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
    resettext : {
        alignSelf : 'center',
        color : 'white',
        fontSize : 17,
        fontWeight : 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.68)',
        textShadowOffset: {width: -0.5, height: 0.5},
        textShadowRadius: 5,
        padding : '1%'
    },
    resettextmargin : {
        marginTop : '10%'
    },
    inputmargin : {
        marginTop : '10%'
    },
    sendmargin : {
        marginTop : '40%'
    },
    errorcontainer : {
        flexDirection : 'row',
        alignSelf : 'center',
        alignItems : 'center',
        borderWidth : 1,
        borderColor : 'red',
        borderRadius : 5,
        marginTop : '5%',
        backgroundColor : 'rgba(255,255,255,0.35)'
    },
    errortext : {
        color:'red',
        textShadowColor: 'rgba(0, 0, 0, 0.68)',
        textShadowOffset: {width: -0.5, height: 0.5},
        textShadowRadius: 5,
        padding : '1%'
    }
})

export default ResetPassword;