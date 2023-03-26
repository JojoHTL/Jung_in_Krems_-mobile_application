import React from 'react';

import TitleComponent from '../components/title';
import SafeView from '../styles/SafeView';
import FetchAllBildung from '../components/FetchAllBildung';

import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native';

function EducationScreen({navigation}){
    return (
        <SafeAreaView style={SafeView.droidSafeArea}>
            <TitleComponent name="Bildung"/>
            <View style={[{marginBottom : '3%'}]}></View>
            <FetchAllBildung/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    
})

export default EducationScreen;