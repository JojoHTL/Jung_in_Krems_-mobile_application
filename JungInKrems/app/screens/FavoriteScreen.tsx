import React, { useCallback, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TitleComponent from '../components/title';
import SafeView from '../styles/SafeView';
import EvenTypeComp from '../components/EventType';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FetchEvent from '../components/FetchEvent';

import { View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView, ImageBackground, Modal } from 'react-native';
import FetchBildung from '../components/FetchBildung';
import { useFocusEffect } from '@react-navigation/native';


function FavoriteScreen({navigation}){

    const server = '162.55.215.235';
    const [bookmarks, onChangeBookmarks] = React.useState([]);
    const [token, onChangeToken] = React.useState('');
    const [modalVisibleEvent, setModalVisibleEvent] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [id, setId] = React.useState('');
    const [type, setType] = React.useState('');
    const [marksEvents, setMarksEvents] = React.useState('');
    const [marksFacilities, setMarksFacilities] = React.useState('');
    const [bookmarkupdate, updateBookmarks] = React.useState('');
    //console.error(type);


    const getBookmarks = async () => {
        const value = await AsyncStorage.getItem('token');
        var temp = [];
        var tempEvents = [];
        var tempFacilities = [];

        if(value!==null){
            var obj = JSON.parse(value);
            //console.log(obj.token);
            //var token = obj.token;
            //console.error(token);
            //console.log(obj.token);
            onChangeToken(obj.token);
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${obj.token}`; 
                const response = await axios.get('http://'+server+'/api/bookmarks', {
                    headers: {
                    'Authorization': `Bearer ${obj.token}`
                }})
                onChangeBookmarks(response.data);

                temp = response.data;
                //console.log(temp);
                temp.forEach(element => {
                if(element.event!==null)
                {
                    //console.log('event: '+element.event.EVENT_ID)
                    tempEvents.push(element.event.EVENT_ID)
                }
                else{
                    tempFacilities.push(element.facility.FACILITY_ID)
                }
                });
                if(tempEvents.length!==0){
                setMarksEvents(tempEvents);
                //console.log(tempEvents);
                }
                if(tempFacilities.length!==0){
                    setMarksFacilities(tempFacilities);
                }

                console.log('bookmarks fetched')
            } catch (error) {
                console.log(error);
            }      
        }
        //onChangeToken('');
        //console.error(token);
        //onChangeToken(token);
        //return token;
    }

    const CloseModal = () => {
        setModalVisible(false);
        //console.log(modalVisible);
    }

    const CloseModalEvents = () => {
        setModalVisibleEvent(false);
        //console.log(modalVisible);
    }
    
    const DeleteBookmark =async (id:any) => {
        const value = await AsyncStorage.getItem('token');
        if(value!==null){
            var obj = await JSON.parse(value);
            axios.defaults.headers.common['Authorization'] = `Bearer ${obj.token}`;
            await axios.delete('http://'+server+'/api/bookmarks/'+id,{
              headers: {
              'Authorization': `Bearer ${obj.token}`
            }})
            .then((response) => {
                console.log('Bookmark deleted: '+id)
                updateBookmarks('deleted:'+id);
            })
            .catch((error) => {
                console.log(error);
            }); 
        }
        else{
          console.log('no token');
        }
      }


    useFocusEffect(
    useCallback(() => {
        getBookmarks();
    },[bookmarkupdate])
    );

    /*const ShowEvents = () => {
        if(type == 'freetime'){
            return();
        }
        if(type== 'education'){
            return(<FetchAllEvents type='Bildung'/>)
        }
        return(<FetchAllEvents/>);
    }*/

    if(token !== '') {
        // token exist
        if(bookmarks.length !== 0){
            return (
                <SafeAreaView style={SafeView.droidSafeArea}>
                    <TitleComponent name="Favoriten"/>
                    <View style={styles.buttoncontainer}>
                        <Pressable onPress={() => setType('Freizeit')}
                        style={({pressed}) => [
                            {
                                backgroundColor : pressed ? "#FFCD00" : "#FFFFFF",
                                borderWidth : 1,
                                borderRadius : 5
                            }
                        ]}>
                            <Text style={styles.buttons}>{"Freizeit - Events"}</Text>
                        </Pressable>
                        <Pressable onPress={() => setType('Bildung')}
                        style={({pressed}) => [
                            {
                                backgroundColor : pressed ? "#FFCD00" : "#FFFFFF",
                                borderWidth : 1,
                                borderRadius : 5
                            }
                        ]}>
                            <Text style={styles.buttons}>{"Bildungs - Events"}</Text>
                        </Pressable>
                        <Pressable onPress={() => setType('facilities')}
                        style={({pressed}) => [
                            {
                                backgroundColor : pressed ? "#FFCD00" : "#FFFFFF",
                                borderWidth : 1,
                                borderRadius : 5
                            }
                        ]}>
                            <Text style={styles.buttons}>{"Bildungsanstalten"}</Text>
                        </Pressable>
                    </View>
                    <ScrollView style={[{marginTop:'3%'}]}>
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
                        visible={modalVisibleEvent}

                        onRequestClose={() => {
                        setModalVisibleEvent(!modalVisibleEvent);
                        }}>
                        <View style={styles.modalcontainer}>
                            <FetchEvent  target={id} bookmark={true} CloseModal={CloseModalEvents} marks={marksEvents}/>
                            <Pressable onPress={() => setModalVisibleEvent(!modalVisibleEvent)} style={styles.hidecontainer}>
                            <Text style={styles.hidetext}>Andere Events</Text>
                            </Pressable>
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
                        visible={modalVisible}

                        onRequestClose={() => {
                        setModalVisible(false);
                        }}>
                        <View style={styles.modalcontainer}>
                            <FetchBildung  target={id} CloseModal={CloseModal} bookmark={true} marks={marksFacilities}/>
                            <Pressable onPress={() => setModalVisible(false)} style={[{
                                justifyContent : 'center',
                                flexDirection : 'row',
                                borderTopLeftRadius : 30,
                                borderTopRightRadius : 30,
                                marginTop : '0%',
                                backgroundColor : '#2655CA'
                            }]}>
                            <Text style={styles.hidetext}>Andere Bildungseinrichtungen</Text>
                            </Pressable>
                        </View>
                    </Modal>
                        {Array.isArray(bookmarks) && bookmarks.map((item,index) =>(
                            //temp = item.event,
                            //Array.isArray(temp) && temp.map((data,index)=>(
                                type !== '' ? (
                                item.event !== null ? (
                                type == item.event.EVENT_TYPE ? (
                                <View key={index} style={styles.wrapper}>
                                    <ImageBackground source={{ uri:item.event.IMAGE_PATH }} resizeMode="cover" style={styles.imagestyle}>
                                    <View style={styles.buttoncontainer2}>
                                    <Pressable onPress={() => [setModalVisibleEvent(true),setId(item.event.EVENT_ID)]}
                                        style={({pressed}) => [
                                            {
                                                backgroundColor : 'white',
                                                borderWidth : 1,
                                                borderRadius : 5,
                                                padding : '0.7%',
                                            }
                                        ]}>
                                            <Text style={styles.buttons2}>{"ÖFFNEN"}</Text>
                                        </Pressable>
                                        {marksEvents.includes(item.event.EVENT_ID) ? (
                                        <Pressable onPress={()=>DeleteBookmark(item.EVENT_ID)}
                                        style={({pressed}) => [
                                            {
                                                
                                                backgroundColor : '#FFCD00',
                                                borderWidth : 1,
                                                borderRadius : 5,
                                                padding : '0.7%',
                                                width: '12%',
                                                flexDirection : 'row',
                                                justifyContent : 'center'

                                            }
                                        ]}>
                                            <AntDesign name='star' size={17} color={'white'}/>
                                        </Pressable>
                                        ) : (
                                        <Pressable
                                        style={({pressed}) => [
                                            {
                                                
                                              backgroundColor : '#FFCD00',
                                              borderWidth : 1,
                                              borderRadius : 5,
                                              padding : '0.7%',
                                              width: '12%',
                                              flexDirection : 'row',
                                              justifyContent : 'center'
                  
                                            }
                                        ]}>
                                            <AntDesign name='star' size={17} color={'white'}/>
                                        </Pressable>
                                        )}
                                    </View>
                                    </ImageBackground>
                                    <View style={styles.titlecontainer}>
                                    <Text style={[{fontSize:15, fontWeight : 'bold'}]}>{item.event.TITLE}</Text>
                                    <EvenTypeComp type={item.event.EVENT_TYPE}/>
                                    </View>
                                    <View style={styles.addresscontainer}>
                                    <Text style={styles.addressstyle}>{item.event.ADDRESS}, {item.event.POSTAL_CODE} {item.event.CITY}</Text>
                                    </View>
                                </View>
                                ) : (null
                                )) : (
                                    type == 'facilities' ? (
                                        <View key={index} style={styles.wrapper}>
                                            <ImageBackground source={{ uri:item.facility.IMAGE_PATH }} resizeMode="cover" style={styles.imagestyle}>
                                                <View style={styles.buttoncontainer2}>
                                                    <Pressable onPress={() => [setModalVisible(true),setId(item.facility.FACILITY_ID)]}
                                                    style={({pressed}) => [
                                                        {
                                                            backgroundColor : 'white',
                                                            borderWidth : 1,
                                                            borderRadius : 5,
                                                            padding : '0.7%',
                                                        }
                                                    ]}>
                                                        <Text style={styles.buttons2}>{"ÖFFNEN"}</Text>
                                                    </Pressable>
                                                    {marksFacilities.includes(item.facility.FACILITY_ID) ? (
                                                    <Pressable onPress={()=>DeleteBookmark(item.facility.FACILITY_ID)}
                                                    style={({pressed}) => [
                                                        {
                                                            
                                                            backgroundColor : '#FFCD00',
                                                            borderWidth : 1,
                                                            borderRadius : 5,
                                                            padding : '0.7%',
                                                            width: '12%',
                                                            flexDirection : 'row',
                                                            justifyContent : 'center'

                                                        }
                                                    ]}>
                                                        <AntDesign name='star' size={17} color={'white'}/>
                                                    </Pressable>
                                                    ) : (
                                                    <Pressable onPress={()=>DeleteBookmark(item.facility.FACILITY_ID)}
                                                    style={({pressed}) => [
                                                        {
                                                            
                                                          backgroundColor : '#FFCD00',
                                                          borderWidth : 1,
                                                          borderRadius : 5,
                                                          padding : '0.7%',
                                                          width: '12%',
                                                          flexDirection : 'row',
                                                          justifyContent : 'center'
                              
                                                        }
                                                    ]}>
                                                        <AntDesign name='star' size={17} color={'white'}/>
                                                    </Pressable>
                                                    )}
                                                </View>
                                            </ImageBackground>
                                            <View style={styles.titlecontainer}>
                                                <Text style={[{fontSize:15, fontWeight : 'bold'}]}>{item.facility.NAME}</Text>
                                                <View style={[{backgroundColor : '#989898',borderWidth : 1,borderRadius : 5}]}>
                                                    <Text style={[{paddingLeft : '1%', paddingRight : '1%', color:'white'}]}>{item.facility.FACILITY_TYPE}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.addresscontainer}>
                                                <Text style={styles.addressstyle}>{item.facility.ADDRESS}, {item.facility.POSTAL_CODE} {item.facility.CITY}</Text>
                                            </View>
                                        </View>
                                    ):(null)
                                )
                                ) : (
                                    item.event !== null ? (
                                    item.event.EVENT_TYPE == 'Freizeit' ? (
                                        <View key={index} style={styles.wrapper}>
                                            <ImageBackground source={{ uri:item.event.IMAGE_PATH }} resizeMode="cover" style={styles.imagestyle}>
                                            <View style={styles.buttoncontainer2}>
                                            <Pressable onPress={() => [setModalVisibleEvent(true),setId(item.event.EVENT_ID)]}
                                                style={({pressed}) => [
                                                    {
                                                        backgroundColor : 'white',
                                                        borderWidth : 1,
                                                        borderRadius : 5,
                                                        padding : '0.7%',
                                                    }
                                                ]}>
                                                    <Text style={styles.buttons2}>{"ÖFFNEN"}</Text>
                                                </Pressable>
                                                <Pressable onPress={()=>DeleteBookmark(item.event.EVENT_ID)}
                                                style={({pressed}) => [
                                                    {
                                                        
                                                      backgroundColor : '#FFCD00',
                                                      borderWidth : 1,
                                                      borderRadius : 5,
                                                      padding : '0.7%',
                                                      width: '12%',
                                                      flexDirection : 'row',
                                                      justifyContent : 'center'
                          
                                                    }
                                                ]}>
                                                    <AntDesign name='star' size={17} color={'white'}/>
                                                </Pressable>
                                            </View>
                                            </ImageBackground>
                                            <View style={styles.titlecontainer}>
                                            <Text style={[{fontSize:15, fontWeight : 'bold'}]}>{item.event.TITLE}</Text>
                                            <EvenTypeComp type={item.event.EVENT_TYPE}/>
                                            </View>
                                            <View style={styles.addresscontainer}>
                                            <Text style={styles.addressstyle}>{item.event.ADDRESS}, {item.event.POSTAL_CODE} {item.event.CITY}</Text>
                                            </View>
                                        </View>
                                ) : null):null )
                            //))
                        ))}
                    </ScrollView>
                </SafeAreaView>
            );
        }
        return (
            <SafeAreaView style={SafeView.droidSafeArea}>
                <TitleComponent name="Favoriten"/>
                <Text>Keine Bookmarks</Text>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={SafeView.droidSafeArea}>
            <TitleComponent name="Favoriten"/>
            <View style={[{
                borderWidth:1,
                //flexDirection:'column',
                width : '80%',
                alignSelf:'center',
                borderRadius : 5,
                height : '70%',
                marginTop : '10%',
                borderColor : '#FFCC00',
                backgroundColor : 'white'
                
            }]}>
                <Text style={[{
                    alignSelf : 'center',
                    
                }]}>Nicht angemeldet!</Text>
            </View>
        </SafeAreaView>
    );
}

function HandleClick(){

}

const styles = StyleSheet.create({
    buttoncontainer : {
        justifyContent : 'space-between',
        flexDirection : 'row',
        marginLeft : 15,
        marginRight : 15,
        marginTop : 15
    },
    buttons : {
        fontSize : 12,
        padding: 6
    },
    imagestyle : {
        height : 170,
        //margin : '1%'
    },
    buttoncontainer2 : {
    justifyContent : 'space-between',
    flexDirection : 'row',
    //width : '96%',
    marginLeft : '2%',
    marginRight : '2%',
    marginTop : '1%' 
    },
    buttons2 : {
    color : '#FFCD00',
    fontWeight : 'bold'
    },
    wrapper : {
    marginLeft : '3%',
    marginRight : '3%',
    borderWidth : 1,
    marginBottom : '5%',
    borderRadius : 5,
    paddingBottom : '1%'
    },
    titlecontainer : {
    justifyContent : 'space-between',
    flexDirection : 'row',
    marginLeft : '2%',
    marginRight : '3%',
    marginBottom : '1%',
    marginTop : '3%',
    },
    addressstyle : {
    color : '#999999'
    },
    addresscontainer : {
    marginLeft : '2%',
    marginRight : '2%'
    },
    hidetext : {
    color : 'white',
    fontSize : 20,
    fontWeight : 'bold',
    paddingTop : '5%',
    paddingBottom : '5%'
    },
    hidecontainer : {
    backgroundColor : '#FFCC00',
    justifyContent : 'center',
    flexDirection : 'row',
    borderTopLeftRadius : 30,
    borderTopRightRadius : 30,
    marginTop : '0%'
    },
    modalcontainer : {
    justifyContent : 'center',
    flexDirection : 'column',
    }
})

export default FavoriteScreen;