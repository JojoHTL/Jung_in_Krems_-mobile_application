import React from 'react';
import {Text, View } from 'react-native';

const EvenTypeComp = (props : any) => {
    var colour:any;
    var s = "";

    if(props.type == 'Bildung'){
        colour = '#2757CF'
        s = 's'
    }
    else{
        colour = '#399836'
    }

    return (
        <View style={[{backgroundColor : colour,borderWidth : 1,borderRadius : 5}]}>
            <Text style={[{paddingLeft : '1%', paddingRight : '1%', color:'white'}]}>{props.type}{s} - Event</Text>
        </View>
    );
}

export default EvenTypeComp;