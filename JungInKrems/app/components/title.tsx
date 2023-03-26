import React from 'react';
import {Text, StyleSheet } from 'react-native';

const TitleComponent = (props : any) => {
    return (
        <Text style={styles.titlestyle}>{props.name}</Text>
    );
}

const styles = StyleSheet.create({
    titlestyle : {
        color: '#FFCC00',
        fontWeight : 'bold',
        fontSize : 35,
        alignSelf : "center",
        marginTop : 15
    }
})

export default TitleComponent;