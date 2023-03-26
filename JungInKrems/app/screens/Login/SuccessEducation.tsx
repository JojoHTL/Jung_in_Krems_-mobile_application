import React from 'react';
import SafeView from '../../styles/SafeView';
import LoginStyles from '../../styles/LoginStyles';

import Feather from 'react-native-vector-icons/Feather';
import { View, Text, SafeAreaView, StyleSheet, Pressable, ImageBackground, TextInput,} from 'react-native';

function SuccessEducation({navigation}){
    return (
        <View>
            <ImageBackground source={require('../../assets/LoginImage.png')} resizeMode="cover" style={LoginStyles.ImageStyle}>
                <SafeAreaView style={SafeView.droidSafeArea}>
                    <Text style={[styles.successtext, styles.successtextmargin]}>{'Ihre Registrierung wurde erfasst und'}</Text>
                    <Text style={styles.successtext}>{'wird verarbeitet.'}</Text>
                    <Text style={[styles.successtext,styles.successtextmargin2]}>{'Sie werden benachrichtigt, sobald wir'}</Text>
                    <Text style={styles.successtext}>{'sie als Bildungsanstalt verifiziert haben.'}</Text>
                    <Pressable style={[styles.logincontainer, styles.sendmargin]} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.logintext}>{'Zurück zur Anmeldung'}</Text>
                    </Pressable>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    successtext : {
        alignSelf : 'center',
        color : 'white',
        fontSize : 17,
        fontWeight : 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.68)',
        textShadowOffset: {width: -0.5, height: 0.5},
        textShadowRadius: 5,
        padding : '1%'
    },
    successtextmargin : {
        marginTop : '20%'
    },
    inputmargin : {
        marginTop : '10%'
    },
    sendmargin : {
        marginTop : '60%'
    },
    logincontainer : {
        alignSelf : 'center',
        marginTop : '27%',
        backgroundColor : '#FFCC00',
        borderWidth : 0.2,
        borderRadius : 10,
        width : '80%',
        alignItems : 'center',
        paddingTop : '3%',
        paddingBottom : '3%'
    },
    logintext : {
        color : 'white',
        fontSize : 25
    },
    successtextmargin2 : {
        marginTop : '4%'
    }
})

export default SuccessEducation;