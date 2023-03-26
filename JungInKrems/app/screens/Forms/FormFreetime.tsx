import React, {useCallback, useState } from 'react';
import SafeView from '../../styles/SafeView';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-modern-datepicker';
import { View, Text, SafeAreaView, StyleSheet, Pressable, TextInput, ScrollView, Modal} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FormFreetime({}){
    const server = '162.55.215.235';
    const navigation = useNavigation();
    const [modalVisibleStart, setModalVisibleStart] = useState(false)
    const [modalVisibleEnd, setModalVisibleEnd] = useState(false)
    const [token, onChangeToken] = useState('');
    const [verified, onChangeVerified] = useState('');
    //const navigation = useNavigation();


    //Event data
    const [accountId, setId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescrition] = useState('');
    const [url, setUrl] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [potsCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');

    const image = 'Test';
    const eventType = 'Freizeit';
    const facilityId = null;

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

    const CreateEvent = async () => {

        if(startTime!==null){
            if(title&&potsCode&&city&&address&&image&&description!==''){

                const dateObjStart = await new Date(startTime);
                const mysqlDatetimeStart = await dateObjStart.toISOString().slice(0, 19).replace('T', ' ');
                const dateObjEnd = await new Date(endTime);
                const mysqlDatetimeEnd = await dateObjEnd.toISOString().slice(0, 19).replace('T', ' ');


                console.log('Daten:');
                console.log(accountId);
                console.log(facilityId);
                console.log(title);
                console.log(startTime);
                console.log(endTime);
                console.log(url);
                console.log(phone);
                console.log(email);
                console.log(potsCode);
                console.log(city);
                console.log(address);
                console.log(image);
                console.log(description);
                console.log(eventType);

                const query = {
                    account_id : accountId,
                    facility_id : facilityId,
                    title : title,
                    starting_time : mysqlDatetimeStart,
                    ending_time : mysqlDatetimeEnd,
                    website_url : url,
                    phone_nr : phone,
                    emal : email,
                    postal_code : potsCode,
                    city : city,
                    address : address,
                    image_path : image,
                    description : description,
                    event_type : eventType
                };    

                try{
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
                    const response = await axios.post('http://'+server+'/api/events',query,{
                        headers: {
                        'Authorization': `Bearer ${token}`
                    }});
                    await console.log(response.data)
                }
                catch(e){
                    await console.log(e)
                }
            }
        }
    }

    useFocusEffect(
        useCallback(() => {
            getSave()
        },[])
    );

    const getCurrentDate=()=>{
 
        var date = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var year = new Date().getDate();

        if(month < 10){
            return date + '-0' + month + '-' + year;
        }
        return date + '-' + month + '-' + year;//format: d-m-y;
    }

    return (
        <SafeAreaView style={SafeView.droidSafeArea}>
            {token == '' ? (
                <View>
                    <Text>Nicht angemeldet</Text>
                </View>
            ) : ( verified == '' ? (
                <View>
                    <Text>Nicht verifiziert</Text>
                </View>
                ) : (
                    <ScrollView>
                        <Modal
                            style={[{
                                margin:0,
                                padding:0,
                                alignItems: undefined,
                                justifyContent: undefined,
                            }]}
                            //presentationStyle="pageSheet"
                            animationType="slide"
                            transparent={true}
                            visible={modalVisibleStart}
                            onRequestClose={() => {
                            setModalVisibleStart(!modalVisibleStart);
                            }}>
                            <View style={[{
                                backgroundColor:'white',
                                height:'100%'
                            }]}>
                                <View style={[{flexDirection:'row',justifyContent:'center',marginTop:'10%'}]}>
                                    <Text style={[{fontSize:25, color:'#FFAC00', fontWeight:'bold'}]}>Startzeit</Text>
                                </View>
                                <View style={[{marginLeft:'5%',marginRight:'5%',borderColor:'#FFAC00', borderRadius:5, marginTop:'15%'}]}>
                                    <DatePicker
                                        onSelectedChange={(date: any) => setStartTime(date)}
                                        options={{
                                            backgroundColor: 'white',
                                            borderColor: '#FFAC00',
                                            mainColor : '#FFAC00',
                                        }}
                                        minimumDate = {getCurrentDate()}
                                        current = {getCurrentDate()}
                                        locale = {'de'}
                                    />
                                </View>
                                <View style={[{flexDirection:'row',justifyContent:'center'}]}>
                                    <Pressable onPress={() => setModalVisibleStart(!modalVisibleStart)} style={[{flexDirection:'row',justifyContent:'center', backgroundColor:'#FFAC00', width:'45%', borderRadius:6}]}>
                                        <Text style={[{fontSize:25, color:'white', fontWeight:'bold'}]}>Schließen</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            style={[{
                                margin:0,
                                padding:0,
                                alignItems: undefined,
                                justifyContent: undefined,
                            }]}
                            //presentationStyle="pageSheet"
                            animationType="slide"
                            transparent={true}
                            visible={modalVisibleEnd}
                            onRequestClose={() => {
                            setModalVisibleEnd(!modalVisibleEnd);
                            }}>
                            <View style={[{
                                backgroundColor:'white',
                                height:'100%'
                            }]}>
                                <View style={[{flexDirection:'row',justifyContent:'center',marginTop:'10%'}]}>
                                    <Text style={[{fontSize:25, color:'#FFAC00', fontWeight:'bold'}]}>Endzeit</Text>
                                </View>
                                <View style={[{marginLeft:'5%',marginRight:'5%',borderColor:'#FFAC00', borderRadius:5, marginTop:'15%'}]}>
                                    <DatePicker
                                        onSelectedChange={(date: any) => setEndTime(date)}
                                        options={{
                                            backgroundColor: 'white',
                                            borderColor: '#FFAC00',
                                            mainColor : '#FFAC00',
                                        }}
                                        minimumDate = {getCurrentDate()}
                                        current = {getCurrentDate()}
                                        locale = {'de'}
                                    />
                                </View>
                                <View style={[{flexDirection:'row',justifyContent:'center'}]}>
                                    <Pressable onPress={() => setModalVisibleEnd(!modalVisibleEnd)} style={[{flexDirection:'row',justifyContent:'center', backgroundColor:'#FFAC00', width:'45%', borderRadius:6}]}>
                                        <Text style={[{fontSize:25, color:'white', fontWeight:'bold'}]}>Schließen</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                        <View style={styles.inputmargin}>
                            <View style={styles.inputcontainerwi}>
                                <TextInput 
                                style = {styles.inputstylewi}
                                placeholder = 'Name des Events'
                                placeholderTextColor={'#A8A8A8'}
                                onChangeText={setTitle}
                                value={title}
                                />
                            </View>
                            <View style={styles.inputcontainerwi}>
                                <TextInput 
                                style = {styles.inputstylewi}
                                placeholder = 'Beschreibung des Events'
                                placeholderTextColor={'#A8A8A8'}
                                onChangeText={setDescrition}
                                value={description}
                                />
                            </View>
                            <Pressable style={styles.imagecontainer}>
                                <Text style={styles.imagetext}>Bild anfügen</Text>
                            </Pressable>
                            <View style={styles.inputcontainer}>
                                <Feather name='mail' style={styles.inputicon} size={28}/>
                                <TextInput 
                                style = {styles.inputstyle}
                                placeholder = 'Email'
                                placeholderTextColor={'#A8A8A8'}
                                onChangeText={setEmail}
                                value={email}
                                />
                            </View>
                            <View style={styles.inputcontainer}>
                                <Feather name='link' style={styles.inputicon} size={28}/>
                                <TextInput 
                                style = {styles.inputstyle}
                                placeholder = 'Link (optional)'
                                placeholderTextColor={'#A8A8A8'}
                                onChangeText={setUrl}
                                value={url}
                                />
                            </View>
                            <View style={styles.inputcontainer}>
                                <MaterialIcon name='phone' style={styles.inputicon} size={28}/>
                                <TextInput 
                                style = {styles.inputstyle}
                                placeholder = 'Telefon (optional)'
                                placeholderTextColor={'#A8A8A8'}
                                onChangeText={setPhone}
                                value={phone}
                                />
                            </View>
                            <View style={[{flexDirection:'row', justifyContent:'center'}]}>
                                <Pressable style={[styles.timecontainer,styles.timemargin]} onPress={() => setModalVisibleStart(!modalVisibleStart)}>
                                    <Text style={styles.timetext}>Start</Text>
                                </Pressable>
                                <Pressable style={styles.timecontainer} onPress={() => setModalVisibleEnd(!modalVisibleEnd)}>
                                    <Text style={styles.timetext}>Ende</Text>
                                </Pressable>
                            </View>
                            <View style={styles.inputcontainer}>
                                <IonIcons name='location-sharp' style={styles.inputicon} size={28}/>
                                <TextInput 
                                style = {styles.inputstyle}
                                placeholder = 'Postleitzahl'
                                placeholderTextColor={'#A8A8A8'}
                                onChangeText={setPostCode}
                                value={potsCode}
                                />
                            </View>
                            <View style={styles.inputcontainer}>
                                <IonIcons name='location-sharp' style={styles.inputicon} size={28}/>
                                <TextInput 
                                style = {styles.inputstyle}
                                placeholder = 'Stadt'
                                placeholderTextColor={'#A8A8A8'}
                                onChangeText={setCity}
                                value={city}
                                />
                            </View>
                            <View style={styles.inputcontainer}>
                                <IonIcons name='location-sharp' style={styles.inputicon} size={28}/>
                                <TextInput 
                                style = {styles.inputstyle}
                                placeholder = 'Straße + Nummer'
                                placeholderTextColor={'#A8A8A8'}
                                onChangeText={setAddress}
                                value={address}
                                />
                            </View>
                            <Pressable style={styles.createcontainer} onPress={() => [CreateEvent(),navigation.navigate('EventsMain')]}>
                                <Text style={styles.createtext}>{'Event anmelden'}</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                )
            )};
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    timecontainer:{
        backgroundColor:'#FFAC00',
        marginTop : '4%',
        padding : '1.5%',
        width: '20%',
        justifyContent : 'center',
        flexDirection:'row',
        borderRadius : 10
    },
    timetext:{
        color:'white',
        justifyContent : 'center',
        fontWeight:'bold'
    },
    timemargin:{
        marginRight:'20%'
    },
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
    inputcontainerwi : {
        flexDirection : 'row',
        alignSelf : 'center',
        borderWidth : 1,
        borderColor : '#FFAC00',
        borderRadius : 10,
        marginTop : '4%',
        width : '90%',
        backgroundColor:'white'
    },
    inputmargin : {
        marginTop : '1%'
    },
    inputstylewi : {
        padding : '2%',
        fontSize : 23,
        paddingLeft : '3%',
        paddingRight : '3%',
        color : '#A8A8A8'
    },
    inputicon : {
        paddingRight : 1,
        paddingLeft : 5,
        //padding : '2%',
        paddingTop : '2%',
        paddingBottom : '2%',
        color : '#FFAC00'
    },
    imagecontainer : {
        alignSelf : 'center',
        marginTop : '4%',
        borderWidth : 1,
        borderColor : '#FFAC00',
        borderRadius : 10,
        width : '90%',
        backgroundColor : '#FFAC00'
    },
    imagetext : {
        fontSize : 23,
        padding : '3%',
        paddingLeft : '30%',
        paddingRight : '30%',
        color : 'white'
    },
    inputcontainer : {
        flexDirection : 'row',
        alignSelf : 'center',
        borderWidth : 1,
        borderColor : '#FFAC00',
        borderRadius : 10,
        marginTop : '4%',
        width : '90%',
        backgroundColor : 'white'
    },
    inputstyle : {
        padding : '2%',
        fontSize : 23,
        paddingLeft : '0%',
        paddingRight : '3%',
        color : '#A8A8A8',
        marginLeft : '1%'
    },
    datecontainer : {
        width : '90%',
        alignSelf : 'center',
        borderColor : '#FFAC00',
        borderWidth : 1,
        borderRadius : 2,
        marginTop : '4%'
    },
    createcontainer : {
        alignSelf : 'center',
        marginTop : '3%',
        borderWidth : 1,
        borderColor : '#FFAC00',
        borderRadius : 10,
        width : '90%',
        backgroundColor : '#FFAC00',
        marginBottom: '4%'
    },
    createtext : {
        fontSize : 18,
        padding : '3%',
        paddingLeft : '30%',
        paddingRight : '30%',
        color : 'white',
        fontWeight:'bold'
    }
})

export default FormFreetime;