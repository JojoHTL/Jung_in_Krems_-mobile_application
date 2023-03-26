import React, { useCallback } from 'react';
import {useEffect, useState} from 'react';

import TitleComponent from '../components/title';
import FetchAllEvents from '../components/FetchAllEvents';
import SafeView from '../styles/SafeView';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { View, Text, SafeAreaView, StyleSheet, Pressable} from 'react-native';




function EventScreen({}){

    const server = '162.55.215.235';
    const [email,SetEmail] = React.useState('');
    const [password,SetPassword] = React.useState('');
    const [token,SetToken] = React.useState('');
    const [accountId,SetId] = React.useState('');
    const [emailVerified,SetVerified] = React.useState(Boolean);
    const [accountType,SetType] = React.useState('');

    const UserSettings =async () => {
        const itemEmail = await AsyncStorage.getItem('email');
        const itemPassword = await AsyncStorage.getItem('password');
        const itemToken = await AsyncStorage.getItem('token');

        if(itemEmail&&itemPassword&&itemToken!==null){
            //var objEmail = JSON.parse(itemEmail);
            //var objPassword = JSON.parse(itemPassword);
            //var token = obj.token;
            //console.error(token);
            SetEmail(itemEmail);
            SetPassword(itemPassword);
            var obj = await JSON.parse(itemToken);
            SetToken(obj.token);
            
            try{
            axios.defaults.headers.common['Authorization'] = `Bearer ${obj.token}`; 
            const response = await axios.get('http://'+server+'/api/account', {
                headers: {
                'Authorization': `Bearer ${obj.token}`
            }});
            SetId(response.data.ACCOUNT_ID)
            SetVerified(response.data.IS_EMAIL_VERIFIED)
            SetType(response.data.ACCOUNT_TYPE)

            await AsyncStorage.setItem('ACCOUNT_ID',JSON.stringify(response.data.ACCOUNT_ID))
            await AsyncStorage.setItem('ACCOUNT_TYPE',response.data.ACCOUNT_TYPE)
            await AsyncStorage.setItem('EMAIL_VERIFIED',response.data.IS_EMAIL_VERIFIED == true ? ('true') : ('false'))
            }
            catch(e){
                console.log(e);
                const tokenquery = {
                    email: itemEmail,
                    password: itemPassword,
                  };
            
                axios.post('http://'+server+'/api/login', tokenquery)
                    .then(async (response) => {
                        var obj = JSON.parse(response.data);
                        await SetToken(obj.token);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${obj.token}`; 
                        const responseLogin = await axios.get('http://'+server+'/api/account', {
                            headers: {
                            'Authorization': `Bearer ${obj.token}`
                        }});
                        await SetId(responseLogin.data.ACCOUNT_ID)
                        await SetVerified(responseLogin.data.emailVerified)
                        await SetType(responseLogin.data.ACCOUNT_TYPE)

                        await AsyncStorage.setItem('ACCOUNT_ID',JSON.stringify(responseLogin.data.ACCOUNT_ID))
                        await AsyncStorage.setItem('ACCOUNT_TYPE',responseLogin.data.ACCOUNT_TYPE)
                        await AsyncStorage.setItem('EMAIL_VERIFIED',responseLogin.data.emailVerified == true ? ('true') : ('false'))
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            //const aid = await AsyncStorage.getItem('ACCOUNT_ID');
            //const atype = await AsyncStorage.getItem('ACCOUNT_TYPE');
            //const verf = await AsyncStorage.getItem('EMAIL_VERIFIED');
            //logs
            /*await console.log(itemEmail);
            await console.log(itemPassword);
            await console.log(itemToken);
            await console.log(response.data.ACCOUNT_ID)
            await console.log(response.data.IS_EMAIL_VERIFIED)
            await console.log(response.data.ACCOUNT_TYPE)
            await console.log('')
            await console.log(aid)
            await console.log(atype)
            await console.log(verf)*/
        }
    }

    useEffect(() => {
        UserSettings();
      },[]);

    useFocusEffect(
        useCallback(() => {
            UserSettings();
        },[])
    );

    return (
        <SafeAreaView style={SafeView.droidSafeArea}>
            <TitleComponent name="Events"/>
            <FetchAllEvents/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    //pressstyles : {
        //color : "#FFFFFF",
        //backgroundColor : "#FFCD00",
        //fontSize : 15,
        //borderWidth : 1,
        //borderRadius : 5,
        //padding: 5
    //}
})

export default EventScreen;