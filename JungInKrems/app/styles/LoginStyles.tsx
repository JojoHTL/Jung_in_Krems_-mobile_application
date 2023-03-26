import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    inputcontainer : {
        flexDirection : 'row',
        alignSelf : 'center',
        alignItems : 'center',
        borderWidth : 1,
        borderColor : 'white',
        borderRadius : 5,
        marginTop : '5%',
        backgroundColor : 'rgba(255,255,255,0.35)'
    },
    inputs : {
        fontSize : 30,
        color : 'white',
        width : '60%',
        padding : '1.3%',
        //fontWeight : 'semibold'
    },
    logincontainer : {
        alignSelf : 'center',
        marginTop : '5%',
        backgroundColor : '#FFCC00',
        borderWidth : 0.2,
        borderRadius : 10,
        width : '70%',
        alignItems : 'center',
        paddingTop : '3%',
        paddingBottom : '3%'
    },
    logintext : {
        color : 'white',
        fontSize : 35
    },
    iconstyle : {
        //paddingTop : 30,
        paddingRight : 10,
        paddingLeft : 10
    },
    ImageStyle : {
        height: '100%',
        width : '100%'
    },
    textshadow : {
        textShadowColor: 'rgba(0, 0, 0, 0.68)',
        textShadowOffset: {width: -0.5, height: 0.5},
        textShadowRadius: 5,
    }
});