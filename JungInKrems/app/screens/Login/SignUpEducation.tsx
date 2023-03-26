import React, { useCallback, useState } from 'react';
import SafeView from '../../styles/SafeView';
import LoginStyles from '../../styles/LoginStyles';
import { View, Text, SafeAreaView, StyleSheet, Pressable, ImageBackground, TextInput, ScrollView, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

function SignUpEducation({}){

    const navigation = useNavigation();
    const [token, onSetToken] = useState('');
    const [name, onChangeName] = useState('');
    const [email, onChangeEmail] = useState('');
    const [description, onChangeDscription] = useState('');
    const [website, onChangeWebsite] = useState('');
    const [phone, onChangePhone] = useState('');
    const [postcode, onChangePostcode] = useState('');
    const [city, onChangeCity] = useState('');
    const [address, onChangeAddress] = useState('');
    const [type, onChangeType] = useState('BHS');
    const [image, setImage] = React.useState<any>(null);
    var formData = new FormData();
    const server = '162.55.215.235';

    const GetToken = async () => {
        const val = await AsyncStorage.getItem('token');
        if(val!==null){
            var obj = await JSON.parse(val);
            onSetToken(obj.token);
        }
    }

    useFocusEffect(
        useCallback(() => {
            GetToken();
        },[])
    );

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.3,
        });
        console.log(result);

        if (result.canceled) {
            return;
        }

        let localUri = result.assets[0].uri;
        let filename = localUri.split('/').pop();

        if (typeof filename === 'string' ){
        let match = /\.(\w+)$/.exec(filename);
        const typephoto = match ? `image/${match[1]}` : `image`;

        setImage({
            uri: localUri,
            type: typephoto,
            name: filename,
        });
        console.log(image);
        }
        else{
            return
        }
    };


    const CreateFacility = async () => {

        /*
        TestCase:
            NAME :Test Facility
            DESCRIPTION : Test der App
            WEBSITE_URL : https://www.htlkrems.ac.at/
            PHONE_NR : +4366488423074
            EMAIL : j.spindelberger@htlkrems.at 
            POSTAL_CODE : 3500
            CITY : Krems an der Donau
            ADDRESS : Gasse 187
            FACILITY_TYPE : BHS - Dropdown
            IMAGE: Image - fetch Image
        */

        formData.append('NAME', name);
        formData.append('DESCRIPTION', description);
        formData.append('WEBSITE_URL', website);
        formData.append('PHONE_NR', phone);
        formData.append('EMAIL', email);
        formData.append('POSTAL_CODE', postcode);
        formData.append('CITY', city);
        formData.append('ADDRESS', address);
        formData.append('FACILITY_TYPE', type);

        if(image!==null){ 
            console.log(image.uri);
            console.log(image.name);
            console.log(image.type);
            // Create a File object
            //const file = new File([image.uri], image.name, { type: image.type });
            //console.log(file);
            formData.append("IMAGE", {
                uri : image.uri,
                name : image.name,
                type : image.type
            });

            console.log(formData);
            console.log('http://'+server+'/api/facilities')
            console.log(token);
            /*axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.post('http://'+server+'/api/facilities', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
                },
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });*/

            fetch('http://'+server+'/api/facilities',{
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+token,
            },
            body: formData
            }).then(response => {
                console.log('Res: '+JSON.stringify(response))
            }).catch(err => {
                console.log('Error'+err)
            });  
        }
    }

    return (
        <SafeAreaView style={SafeView.droidSafeArea}>
            <ScrollView>
                <View style={styles.inputmargin}>
                    <View style={styles.inputcontainerwi}>
                        <TextInput 
                        style = {styles.inputstylewi}
                        placeholder = 'Name der Einrichtung'
                        placeholderTextColor={'#A8A8A8'}
                        onChangeText={onChangeName}
                        value={name}
                        />
                    </View>
                    <View style={styles.pickerborder}>
                        <Picker
                        selectedValue={type}
                        style={styles.pickerstyle}
                        onValueChange={(itemValue, itemIndex) =>
                            onChangeType(itemValue)
                        }>
                        <Picker.Item label="BHS" value="BHS"/>
                        <Picker.Item label="Gymnasium" value="Gymnasium"/>
                        <Picker.Item label="Realschule" value="Realschule"/>
                        <Picker.Item label="Hauptschule" value="Hauptschule"/>
                        <Picker.Item label="Grundschule" value="Grundschule"/>
                        <Picker.Item label="Kindergarten" value="Kindergarten"/>
                        <Picker.Item label="Universität" value="Universität"/>
                        </Picker>
                    </View>
                    <View style={styles.inputcontainerwi}>
                        <TextInput 
                        style = {styles.inputstylewi}
                        placeholder = 'Beschreibung über die Einrichtung'
                        placeholderTextColor={'#A8A8A8'}
                        onChangeText={onChangeDscription}
                        value={description}
                        multiline={true}
                        numberOfLines={8}
                        />
                    </View>
                    <Pressable style={styles.imagecontainer} onPress={pickImage}>
                        <Text style={styles.imagetext}>Bild anfügen</Text>
                    </Pressable>
                    <View style={styles.inputcontainer}>
                        <Feather name='mail' style={styles.inputicon} size={28}/>
                        <TextInput 
                        style = {styles.inputstyle}
                        placeholder = 'Email'
                        placeholderTextColor={'#A8A8A8'}
                        onChangeText={onChangeEmail}
                        value={email}
                        />
                    </View>
                    <View style={styles.inputcontainer}>
                        <Feather name='link' style={styles.inputicon} size={28}/>
                        <TextInput 
                        style = {styles.inputstyle}
                        placeholder = 'Link zur Seite'
                        placeholderTextColor={'#A8A8A8'}
                        onChangeText={onChangeWebsite}
                        value={website}
                        />
                    </View>
                    <View style={styles.inputcontainer}>
                        <MaterialIcon name='phone' style={styles.inputicon} size={28}/>
                        <TextInput 
                        style = {styles.inputstyle}
                        placeholder = 'Telefon'
                        placeholderTextColor={'#A8A8A8'}
                        onChangeText={onChangePhone}
                        value={phone}
                        />
                    </View>
                    <View style={styles.inputcontainer}>
                        <IonIcons name='location-sharp' style={styles.inputicon} size={28}/>
                        <TextInput 
                        style = {styles.inputstyle}
                        placeholder = 'Postleitzahl'
                        placeholderTextColor={'#A8A8A8'}
                        onChangeText={onChangePostcode}
                        value={postcode}
                        />
                    </View>
                    <View style={styles.inputcontainer}>
                        <IonIcons name='location-sharp' style={styles.inputicon} size={28}/>
                        <TextInput 
                        style = {styles.inputstyle}
                        placeholder = 'Stadt'
                        placeholderTextColor={'#A8A8A8'}
                        onChangeText={onChangeCity}
                        value={city}
                        />
                    </View>
                    <View style={styles.inputcontainer}>
                        <IonIcons name='location-sharp' style={styles.inputicon} size={28}/>
                        <TextInput 
                        style = {styles.inputstyle}
                        placeholder = 'Straße + Nummer'
                        placeholderTextColor={'#A8A8A8'}
                        onChangeText={onChangeAddress}
                        value={address}
                        />
                    </View>
                    <Pressable style={styles.createcontainer} onPress={() => [CreateFacility(),/*navigation.navigate('EducationMain')*/]}>
                        <Text style={styles.createtext}>{'Registrieren'}</Text>
                    </Pressable>
                    {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pickerborder:{
        //borderColor : 'black',
        //borderRadius : 10,
    },
    pickerstyle:{
        //color: '#FFAC00',
        marginTop : '4%',
        width : '90%',
        //backgroundColor:'white',
        alignSelf:'center',
        fontWeight : 'bold',
        fontSize : 35,
    },
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

export default SignUpEducation;