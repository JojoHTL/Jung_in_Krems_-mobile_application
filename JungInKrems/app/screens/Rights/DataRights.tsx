import React from 'react';
import SafeView from '../../styles/SafeView';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';


function DataRightsScreen({ navigation }){
    return (
        <SafeAreaView style={SafeView.droidSafeArea}>
            <Text>Datenschutzbestimmungen</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    
})

export default DataRightsScreen;