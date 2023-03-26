import React, { useEffect, useCallback } from 'react';
import TitleComponent from '../components/title';
import SafeView from '../styles/SafeView';
import Antdesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native';

function SettingScreen({navigation}){

    const server = '162.55.215.235';
    const [token, onChangeToken] = React.useState('');
    const [verified, onChangeVerified] = React.useState('');
    //console.error(token);
    //onChangeToken(getToken());

    const getSave = async () => {
        const value = await AsyncStorage.getItem('token');
        const verify = await AsyncStorage.getItem('EMAIL_VERIFIED');

        if(value!==null){
            var obj = JSON.parse(value);
            //var token = obj.token;
            //console.error(token);
            onChangeToken(obj.token);
            if(verify!==null){
                onChangeVerified(verify);
            }
        }
    }

    const Logout = async () => {
        try {
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('password');
            await AsyncStorage.removeItem('token');
            //await AsyncStorage.setItem('token', 'Test')
            console.log('Removed');
            onChangeToken('');
        } catch (e) {
            // saving error
            console.log(e);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getSave();
        },[])
    );
    //console.error(token);

    if(token !== '') {
        // value previously stored
        return(
        <SafeAreaView style={SafeView.droidSafeArea}>
            <View style={styles.titlecontainer}>
            <Pressable  onPress={() => navigation.navigate('EventsMain')}>
                <MaterialIcon name='arrow-back-ios' size={32} color={'black'} style={styles.backicon}/>
            </Pressable>
                <Text style={styles.titlestyle}>{"Einstellungen"}</Text>
            </View>
            <View>
                <Text style={styles.sectionstyle}>{"Benutzer"}</Text>
                {verified===''?(
                    <View>
                        <Pressable style={styles.container} onPress={() => navigation.navigate('ChangePassword')}>
                            <Text style={styles.textstyle}>{"Passwot ändern"}</Text>
                            <Antdesign name='right' size={20} style={styles.iconstyle}/>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('VerifiyEmail')} style={styles.container2}>
                            <Text style={styles.usertext2}>{"Email verifizieren"}</Text>
                            <Antdesign name='right' size={20} style={styles.iconstyle2}/>
                        </Pressable>
                    </View>
                ) : (
                    <Pressable onPress={() => navigation.navigate('ChangePassword')} style={styles.container2}>
                        <Text style={styles.usertext2}>{"Passwot ändern"}</Text>
                        <Antdesign name='right' size={20} style={styles.iconstyle2}/>
                    </Pressable>
                )}
                <Text style={styles.sectionstyle}>{"Anderes"}</Text>
                <Pressable style={styles.container} onPress={() => navigation.navigate('DataRights')}>
                    <Text style={styles.textstyle}>{"Datenschutzbestimmungen"}</Text>
                    <Antdesign name='right' size={20} style={styles.iconstyle}/>
                </Pressable>
                <Pressable style={styles.container} onPress={() => navigation.navigate('UseRights')}>
                    <Text style={styles.textstyle}>{"Nutzungsbedingungen"}</Text>
                    <Antdesign name='right' size={20} style={styles.iconstyle}/>
                </Pressable>
                <Pressable style={styles.container} onPress={() => navigation.navigate('CreateEvent')}>
                    <Text style={styles.textstyle}>{"Event anmelden"}</Text>
                    <Antdesign name='right' size={20} style={styles.iconstyle}/>
                </Pressable>
                <Pressable style={styles.container} onPress={() => navigation.navigate('CreateFacility')}>
                    <Text style={styles.textstyle}>{"Bildungseinrichtung registrieren"}</Text>
                    <Antdesign name='right' size={20} style={styles.iconstyle}/>
                </Pressable>
                <Pressable onPress={() => [Logout(),navigation.navigate('Settings')]}>
                    <Text style={styles.usertext3}>{"Abmelden"}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
        );
    }
    return(
    <SafeAreaView style={SafeView.droidSafeArea}>
        <View style={styles.titlecontainer}>
            <Pressable  onPress={() => navigation.navigate('EventsMain')}>
                <MaterialIcon name='arrow-back-ios' size={32} color={'black'} style={styles.backicon}/>
            </Pressable>
            <Text style={styles.titlestyle}>{"Einstellungen"}</Text>
        </View>
        <View>
            <Text style={styles.sectionstyle}>{"Benutzer"}</Text>
            <Pressable onPress={() => navigation.navigate('LoginSettingsNav')}>
                <Text style={styles.usertext}>{"Anmelden"}</Text>
            </Pressable>
            <Text style={styles.sectionstyle}>{"Anderes"}</Text>
            <Pressable style={styles.container} onPress={() => navigation.navigate('DataRights')}>
            <Text style={styles.textstyle}>{"Datenschutzbestimmungen"}</Text>
            <Antdesign name='right' size={20} style={styles.iconstyle}/>
        </Pressable>
        <Pressable style={styles.container} onPress={() => navigation.navigate('UseRights')}>
            <Text style={styles.textstyle}>{"Nutzungsbedingungen"}</Text>
            <Antdesign name='right' size={20} style={styles.iconstyle}/>
        </Pressable>
        <Pressable style={styles.container} onPress={() => navigation.navigate('CreateEvent')}>
            <Text style={styles.textstyle}>{"Event anmelden"}</Text>
            <Antdesign name='right' size={20} style={styles.iconstyle}/>
        </Pressable>
        <Pressable style={styles.container} onPress={() => navigation.navigate('CreateFacility')}>
            <Text style={styles.textstyle}>{"Bildungseinrichtung registrieren"}</Text>
            <Antdesign name='right' size={20} style={styles.iconstyle}/>
        </Pressable>
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backicon : {
        alignSelf : "center",
        marginTop : '62%',
        marginBottom : 20
    },
    titlecontainer : {
        justifyContent : 'center',
        flexDirection : 'row'
    },
    titlestyle : {
        color: '#2E2E2E',
        fontWeight : 'bold',
        fontSize : 35,
        alignSelf : "center",
        marginTop : '3.5%',
        marginBottom : 20
    },
    sectionstyle : {
        backgroundColor : "rgba(86,99,255,0.05)",
        fontSize : 20,
        paddingLeft : 10,
        paddingTop : 10,
        paddingBottom : 10,
        fontWeight : "bold"
    },
    usertext : {
        color : "#FFCC00",
        fontSize : 20,
        paddingLeft : 20,
        paddingTop : 15,
        paddingBottom : 15,
        fontWeight : "bold",
    },
    usertext2 : {
        color : "black",
        fontSize : 18,
        paddingLeft : 20,
        paddingTop : 15,
        paddingBottom : 15,
        fontWeight : "bold",
    },
    usertext3 : {
        color : "#FFCC00",
        fontSize : 18,
        paddingLeft : 20,
        paddingTop : 15,
        paddingBottom : 15,
        fontWeight : "bold",
    },
    container : {
        justifyContent : "space-between",
        flexDirection : "row",
        paddingLeft : 20,
        paddingRight : 10,
        paddingTop : 15,
        paddingBottom : 15,
        borderBottomWidth : 0.2
    },
    container2 : {
        justifyContent : "space-between",
        flexDirection : "row",
        paddingRight : 10,
    },
    textstyle : {
        fontSize : 18,
        fontWeight : "bold"
    },
    iconstyle : {
        paddingTop : 2
    },
    iconstyle2 : {
        paddingTop : 18
    }
})

export default SettingScreen;