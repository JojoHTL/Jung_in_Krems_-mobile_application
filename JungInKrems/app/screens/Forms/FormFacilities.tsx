import React, {useCallback, useEffect, useState } from 'react';
import SafeView from '../../styles/SafeView';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-modern-datepicker';
import { View, Text, SafeAreaView, StyleSheet, Pressable, TextInput, ScrollView, Modal} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function FormFacilities({navigation}){
    
    const server = '162.55.215.235';
    const [modalVisibleStart, setModalVisibleStart] = useState(false)
    const [modalVisibleEnd, setModalVisibleEnd] = useState(false)
    //const navigation = useNavigation();


    //Event data
    const [token, setToken] = useState('')
    const [facilityId, setFacilityId] = useState(Number);
    const [accountId, setId] = useState(Number);
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
    const eventType = 'Bildung';


    const getFacilityId = async () => {
        const Id = await AsyncStorage.getItem('FACILITY_ID');
        if(Id!==null){
            await console.log(Id);
            await setFacilityId(Id);
        }
    }

    const GetAccountId = async () => {
        const id = await AsyncStorage.getItem('ACCOUNT_ID');
        if(id!==null){
          await setId(id);
          await console.log(id);
        }
      }

    const GetToken = async () => {
    const val = await AsyncStorage.getItem('token');
    if(val!==null){
        var obj = await JSON.parse(val);
        await setToken(obj.token);
        await console.log(obj.token);
    }
    }

    const CreateEvent = async (
        aid:any,
        fid:any,
        title:any,
        start:any,
        end:any,
        url:any,
        phone:any,
        email:any,
        postcode:any,
        city:any,
        address:any,
        image:any,
        description:any,
        etype:any
        ) => {

        if(startTime!==null){
            if(title!==''&&potsCode!==''&&city!==''&&address!==''&&image!==''&&description!==''&&token!==''){

                const dateObjStart = await new Date(start);
                const mysqlDatetimeStart = await dateObjStart.toISOString().slice(0, 19).replace('T', ' ');
                const dateObjEnd = await new Date(end);
                const mysqlDatetimeEnd = await dateObjEnd.toISOString().slice(0, 19).replace('T', ' ');

                const query = {
                    account_id : aid,
                    facility_id : fid,
                    title : title,
                    starting_time : mysqlDatetimeStart,
                    ending_time : mysqlDatetimeEnd,
                    website_url : url,
                    phone_nr : phone,
                    emal : email,
                    postal_code : postcode,
                    city : city,
                    address : address,
                    image_path : image,
                    description : description,
                    event_type : etype
                };    

                try{
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
                    const response = await axios.post('http://'+server+'/api/events',query,{
                        headers: {
                        'Authorization': `Bearer ${token}`
                    }});
                    console.log(response.data)
                }
                catch(e){
                    console.log(e)
                }
            }
        }
    }

    useFocusEffect(
        useCallback(() => {
            getFacilityId();
            GetAccountId();
            GetToken();
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
            <View style={styles.titlecontainer}>
            <Pressable  onPress={() => navigation.navigate('EducationMain')}>
                <MaterialIcon name='arrow-back-ios' size={32} color={'black'} style={styles.backicon}/>
            </Pressable>
                <Text style={styles.titlestyle}>{"Event anmelden"}</Text>
            </View>
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
                    <Pressable style={styles.createcontainer} onPress={() => [CreateEvent(
                        accountId,
                        facilityId,
                        title,
                        startTime,
                        endTime,
                        url,
                        phone,
                        email,
                        potsCode,
                        city,
                        address,
                        image,
                        description,
                        eventType
                    ),navigation.navigate('EventsMain')]}>
                        <Text style={styles.createtext}>{'Event anmelden'}</Text>
                    </Pressable>
                </View>
            </ScrollView>
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

export default FormFacilities;