import React, { useCallback, useState } from 'react';
import SafeView from '../../styles/SafeView';
import LoginStyles from '../../styles/LoginStyles';
import { View, Text, SafeAreaView, StyleSheet, Pressable, ImageBackground, TextInput, ScrollView, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { UserState } from 'realm';

function VerifiyEmail({}){

    const navigation = useNavigation();
    const [res,setRes] = useState('')
    const server = '162.55.215.235';

    const SendMail = async () => {
        const val = await AsyncStorage.getItem('token');
        if(val!==null){
            var obj = await JSON.parse(val);
            try{
                axios.defaults.headers.common['Authorization'] = `Bearer ${obj.token}`; 
                const response = await axios.post('http://'+server+'/api/verify',{
                    headers: {
                    'Authorization': `Bearer ${obj.token}`
                }});
                setRes('200')
                console.log(response.data)
            }
            catch(e){
                setRes('400')
                console.log(e)
            }
        }
    }

    useFocusEffect(
        useCallback(() => {
            SendMail();
        },[])
    );

    return (
        <SafeAreaView style={SafeView.droidSafeArea}>
            {res==='400' ? (
                    <View>
                        <View style={[{alignSelf:'center', backgroundColor:'#f8d7da', borderWidth:1, borderColor:'red', borderRadius:10, padding:'2%'}]}> 
                            <Text style={[{marginBottom: '2%', fontSize: 19}]}>Da ist wohl etwas schiefgelaufen.</Text>
                            <Text style={[{fontSize: 19}]}>Bitte versuchen sie es nocheinmal.</Text>
                        </View>
                        <Pressable style={styles.backcontainer} onPress={() =>  navigation.navigate('Settings')}>
                            <Text style={styles.backtext}>Zurück</Text>
                        </Pressable>
                    </View>
                ) : (
                    <View>
                        <View style={[{alignSelf:'center', backgroundColor:'#d4edda', borderWidth:1, borderColor:'green', borderRadius:10, padding:'2%'}]}> 
                            <Text style={[{marginBottom: '2%', fontSize: 18}]}>Ihnen wurde eine Email zur Verifikation geschickt.</Text>
                            <Text style={[{fontSize: 18}]}>Bitte öffnen sie diese und bestätigen sie ihre Email durch klicken auf den Link.</Text>
                        </View>
                        <Pressable style={styles.backcontainer} onPress={() =>  navigation.navigate('Settings')}>
                            <Text style={styles.backtext}>Zurück</Text>
                        </Pressable>
                    </View>
                )
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backcontainer : {
        alignSelf : 'center',
        marginTop : '4%',
        borderWidth : 1,
        borderColor : '#FFAC00',
        borderRadius : 10,
        width : '50%',
        backgroundColor : '#FFAC00',
        alignItems: 'center'
    },
    backtext : {
        fontSize : 23,
        padding : '3%',
        paddingLeft : '30%',
        paddingRight : '30%',
        color : 'white'
    },
})

export default VerifiyEmail;