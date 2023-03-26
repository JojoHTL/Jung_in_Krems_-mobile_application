import React from 'react';
import SafeView from '../../styles/SafeView';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';


function UsingRightsScreen({ navigation }){
    return (
        <SafeAreaView style={SafeView.droidSafeArea}>
            <Text>Nutzungsbedingungen</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    
})

export default UsingRightsScreen;