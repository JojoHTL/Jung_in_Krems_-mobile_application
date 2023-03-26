import React, { useCallback, useState } from 'react';
import SafeView from '../../styles/SafeView';
import { View, Text, SafeAreaView, StyleSheet, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';


function ChangePasswordScreen({ navigation }){
    const server = '162.55.215.235';
    const [email, onChangeMail] = useState('');
    const [error, setError] = useState('');

    const HandleSubmit = async () => {
        if(email!=='')
        {
            const query = {
                email : email
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
        <SafeAreaView style={[SafeView.droidSafeArea,styles.wrapper]}>
            <View style={[{
                flexDirection : 'column',
                alignSelf : 'center'
            }]}>
                <Text>Sie werden eine Mail zugeschickt bekommen</Text>
                <Text style={[{alignSelf:'center'}]}>mit Anweisungen um ihr passwort zu ändern</Text>
                <View style={[{flexDirection:'row', justifyContent:'center', marginTop:'5%', marginBottom:'5%'}]}>
                <Text style={[{alignSelf:'center', fontWeight:'bold'}]}>Achtung: </Text>
                <Text style={[{alignSelf:'center'}]}>Sie werden dadurch abgemeldet!</Text>
                </View>
            </View>
            {error == '' ? 
                        (
                            <View style={styles.inputcontainer}>
                                <Feather name='mail' color={'#FFAC00'} size={32} style={styles.iconstyle}/>
                                <TextInput
                                    style = {styles.inputs}
                                    placeholder = 'Email'
                                    placeholderTextColor={'#A8A8A8'}
                                    onChangeText={onChangeMail}
                                    value={email}
                                />
                            </View>
                                        ):(
                            error == 'request' ? 
                            (
                                <View>
                                    <View style={styles.errorcontainer}>
                                        <Feather name='mail' color={'#FFAC00'} size={32} style={styles.iconstyle}/>
                                        <TextInput 
                                        style = {styles.inputs}
                                        placeholder = 'Email'
                                        placeholderTextColor={'#A8A8A8'}
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
                                    <View style={styles.errorcontainer}>
                                        <Feather name='mail' color={'#FFAC00'} size={32} style={styles.iconstyle}/>
                                        <TextInput 
                                        style = {styles.inputs}
                                        placeholder = 'Email'
                                        placeholderTextColor={'#A8A8A8'}
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
            <Pressable style={styles.submitcontainer} onPress={() => HandleSubmit()}>
                <Text style={styles.submittext}>Absenden</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper : {
        //marginLeft : '3%'
    },
    inputcontainer : {
        flexDirection : 'row',
        alignSelf : 'center',
        borderWidth : 1,
        borderColor : '#FFAC00',
        borderRadius : 10,
        marginTop : '4%',
        width : '90%',
        backgroundColor : 'white'
    },
    inputs : {
        paddingTop : '2%',
        paddingBottom : '2%',
        fontSize : 23,
        //paddingLeft : '1%',
        //paddingRight : '3%',
        color : '#A8A8A8',
        marginLeft : '2%'
    },
    submitcontainer : {
        alignSelf : 'center',
        marginTop : '3%',
        borderWidth : 1,
        borderColor : '#FFAC00',
        borderRadius : 10,
        width : '90%',
        backgroundColor : '#FFAC00',
        marginBottom: '4%'
    },
    submittext : {
        fontSize : 18,
        padding : '3%',
        alignSelf:'center',
        color : 'white',
        fontWeight:'bold'
    }, 
    iconstyle : {
        paddingLeft : '2%',
        marginTop : 5
    },
    errorcontainer : {
        flexDirection : 'row',
        alignSelf : 'center',
        borderWidth : 1,
        borderColor : 'red',
        borderRadius : 10,
        marginTop : '4%',
        width : '90%',
        backgroundColor : 'white'
    },
    errortext : {
        color:'red',
        padding : '1%'
    }
})

export default ChangePasswordScreen;