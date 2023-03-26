import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet,ScrollView, Pressable, Modal, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvenTypeComp from './EventType';
import FetchEvent from './FetchEvent';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const FetchAllEvents = () => {
  const server = '162.55.215.235';
  const [display,SetDisplay] = React.useState('all');
  const [data , setData] = useState([]);
  const [bookmarks, onChangeBookmarks] = useState([1]);
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [accountId, setAId] = useState('');
  const [bookmarkupdate, updateBookmarks] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  //const [searchText, setSearchText] = useState('');

  const getBookmarks = async () => {
    const value = await AsyncStorage.getItem('token');
    


    if(value!==null){
        var temp = [];
        var temp2 = [];
        var obj = await JSON.parse(value);
        //console.log(obj.token);
        //var token = obj.token;
        //console.error(token);
        //console.log(obj.token);
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${obj.token}`; 
            const response = await axios.get('http://'+server+'/api/bookmarks', {
                headers: {
                'Authorization': `Bearer ${obj.token}`
            }})
            //onChangeBookmarks(response.data);
            temp = response.data;
            //console.log(temp);
            temp.forEach(element => {
              if(element.event!==null)
              {
                //console.log('event: '+element.event.EVENT_ID)
                temp2.push(element.event.EVENT_ID)
              }
            });
            if(temp2.length!==0){
              onChangeBookmarks(temp2);
            }
            console.log('bookmarks fetched events')
            
        } catch (error) {
            console.log('bookmarks: '+error);
        }      
    }
    else{
      onChangeBookmarks([]);
    }
  }

  const GetAccountId = async () => {
    const id = await AsyncStorage.getItem('ACCOUNT_ID');
    if(id!==null){
      await setAId(id);
      //await console.log(id);
    }
  }

  const CreateBookmark =async (id:any) => {
    const value = await AsyncStorage.getItem('token');
    if(value!==null){
        var obj = await JSON.parse(value);
        axios.defaults.headers.common['Authorization'] = `Bearer ${obj.token}`;
        axios.post('http://'+server+'/api/bookmarks/'+id,{
          headers: {
          'Authorization': `Bearer ${obj.token}`
        }})
        .then((response) => {
            console.log('Bookmark created: Eventid: '+id)
            updateBookmarks('created:'+id);
        })
        .catch((error) => {
            console.log(error);
        }); 
    }
    else{
      console.log('no token');
    }
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
            console.log('Bookmark deleted: Eventid: '+id)
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

  const handleSearch = (text:any) => {
    // Filter data based on search input
    const filtered = data.filter(item => item.TITLE.toLowerCase().includes(text.toLowerCase()));
    setSearchText(text);
    setFilteredData(filtered);
  };

  useFocusEffect(
    useCallback(() => {
      axios.get('http://'+server+'/api/events/')
        .then((response) => [setData(response.data),setFilteredData(response.data),console.log('events fetched')])
        .catch((error) => console.log(error));
      getBookmarks();
      GetAccountId();
      setSearchText('');
    },[bookmarkupdate])
  );


  const getEvent = (eventid:any) => {
    var ev=null;
    //console.error(eventid);

    axios.get('http://'+server+'/api/events/'+eventid)
      .then((response) => ev=response.data)
      .catch((error) => console.log(error));

    if(ev!==null){
      return (
        <View style={[{backgroundColor : 'gray',borderWidth : 1,borderRadius : 5}]}>
          <Text style={[{paddingLeft : '1%', paddingRight : '1%', color:'white'}]}>{ev.TITLE}</Text>
        </View>
      );
    }
    return(<View></View>);
  }

  const CloseModalEvents = () => {
    setModalVisible(false);
    //console.log(modalVisible);
  }

  return (
    <ScrollView>
      <View style={styles.wrappersearch}>
            <Ionicons name='search' color='gray' size={22} style={styles.iconstyle}/>
            <TextInput
            onChangeText={handleSearch}
            value={searchText}
            placeholder = "Search"
            style={styles.inputstyle}
        />
      </View>
      <View style={styles.buttoncontainerfilter}>
          <Pressable onPress={() => SetDisplay('all')}
          style={({pressed}) => [
              {
                  backgroundColor : pressed ? "#FFCD00" : "#FFFFFF",
                  borderWidth : 1,
                  borderRadius : 5
              }
          ]}>
              <Text style={styles.buttonsfilter}>{"Alle Events"}</Text>
          </Pressable>
          <Pressable onPress={() => SetDisplay('Bildung')}
          style={({pressed}) => [
              {
                  backgroundColor : pressed ? "#FFCD00" : "#FFFFFF",
                  borderWidth : 1,
                  borderRadius : 5
              }
          ]}>
              <Text style={styles.buttonsfilter}>{"Bildungs - Events"}</Text>
          </Pressable>
          <Pressable onPress={() => SetDisplay('Freizeit')}
          style={({pressed}) => [
              {
                  backgroundColor : pressed ? "#FFCD00" : "#FFFFFF",
                  borderWidth : 1,
                  borderRadius : 5
              }
          ]}>
              <Text style={styles.buttonsfilter}>{"Freizeit Events"}</Text>
          </Pressable>
      </View>
      <View>
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
            setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalcontainer}>
                <FetchEvent  target={id} CloseModal={CloseModalEvents} marks={bookmarks} account={accountId} updateBookmarks={updateBookmarks}/>
                <Pressable onPress={() => setModalVisible(!modalVisible)} style={[{
                  justifyContent : 'center',
                  flexDirection : 'row',
                  borderTopLeftRadius : 30,
                  borderTopRightRadius : 30,
                  marginTop : '0%',
                  backgroundColor : '#FFCC00'
                }]}>
                <Text style={styles.hidetext}>Andere Events</Text>
                </Pressable>
            </View>
        </Modal>
        <View>
          {Array.isArray(filteredData) && filteredData.map((item,index) =>(
            display !== 'all' ? (
              item.EVENT_TYPE == display ? (
                <View key={index} style={styles.wrapper}>
                <ImageBackground source={{ uri:item.IMAGE_PATH }} resizeMode="cover" style={styles.imagestyle}>
                  <View style={styles.buttoncontainer}>
                  <Pressable onPress={() => [setModalVisible(true),setId(item.EVENT_ID)]}
                      style={({pressed}) => [
                          {
                              backgroundColor : 'white',
                              borderWidth : 1,
                              borderRadius : 5,
                              padding : '0.7%',
                          }
                      ]}>
                          <Text style={styles.buttons}>{"ÖFFNEN"}</Text>
                      </Pressable>
                      {bookmarks.includes(item.EVENT_ID) ? (
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
                      <Pressable onPress={()=>CreateBookmark(item.EVENT_ID)}
                      style={({pressed}) => [
                          {
                              
                            backgroundColor : 'white',
                            borderWidth : 1,
                            borderRadius : 5,
                            padding : '0.7%',
                            width: '12%',
                            flexDirection : 'row',
                            justifyContent : 'center'

                          }
                      ]}>
                          <AntDesign name='staro' size={17}/>
                      </Pressable>
                    )}
                  </View>
                  </ImageBackground>
                  <View style={styles.titlecontainer}>
                    <Text style={[{fontSize:15, fontWeight : 'bold'}]}>{item.TITLE}</Text>
                    {getEvent(item.EVENT_ID)}
                    <EvenTypeComp type={item.EVENT_TYPE}/>
                  </View>
                  <View style={styles.addresscontainer}>
                    <Text style={styles.addressstyle}>{item.ADDRESS}, {item.POSTAL_CODE} {item.CITY}</Text>
                  </View>
                </View>
                ) : null
              ) : (
                <View key={index} style={styles.wrapper}>
                <ImageBackground source={{ uri:item.IMAGE_PATH }} resizeMode="cover" style={styles.imagestyle}>
                  <View style={styles.buttoncontainer}>
                  <Pressable onPress={() => [setModalVisible(true),setId(item.EVENT_ID)]}
                      style={({pressed}) => [
                          {
                              backgroundColor : 'white',
                              borderWidth : 1,
                              borderRadius : 5,
                              padding : '0.7%',
                          }
                      ]}>
                          <Text style={styles.buttons}>{"ÖFFNEN"}</Text>
                      </Pressable>
                      {bookmarks.includes(item.EVENT_ID) ? (
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
                      <Pressable onPress={()=>CreateBookmark(item.EVENT_ID)}
                      style={({pressed}) => [
                          {
                              
                            backgroundColor : 'white',
                            borderWidth : 1,
                            borderRadius : 5,
                            padding : '0.7%',
                            width: '12%',
                            flexDirection : 'row',
                            justifyContent : 'center'

                          }
                      ]}>
                          <AntDesign name='staro' size={17}/>
                      </Pressable>
                    )}
                  </View>
                  </ImageBackground>
                  <View style={styles.titlecontainer}>
                    <Text style={[{fontSize:15, fontWeight : 'bold'}]}>{item.TITLE}</Text>
                    {getEvent(item.EVENT_ID)}
                    <EvenTypeComp type={item.EVENT_TYPE}/>
                  </View>
                  <View style={styles.addresscontainer}>
                    <Text style={styles.addressstyle}>{item.ADDRESS}, {item.POSTAL_CODE} {item.CITY}</Text>
                  </View>
                </View>
              )
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagestyle : {
    height : 170,
    //margin : '1%'
  },
  buttoncontainer : {
    justifyContent : 'space-between',
    flexDirection : 'row',
    //width : '96%',
    marginLeft : '2%',
    marginRight : '2%',
    marginTop : '1%' 
  },
  buttons : {
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
  modalcontainer : {
    justifyContent : 'center',
    flexDirection : 'column',
  },
  wrappersearch : {
    flexDirection : 'row',
    alignSelf : 'center',
    marginTop: 10,
    borderWidth : 1,
    padding: 5,
    borderRadius: 10,
    backgroundColor : "#FFFFFF"
  },
  inputstyle : {
      width: 300,
      fontSize : 20
  },
  iconstyle : {
      marginRight : 5
  },
  buttoncontainerfilter : {
    justifyContent : 'space-between',
    flexDirection : 'row',
    marginLeft : 15,
    marginRight : 15,
    marginTop : 15,
    marginBottom :'3%'
  },
  buttonsfilter : {
      //color : "#9F9F9F",
      //backgroundColor : "#FFFFFF",
      fontSize : 14,
      //borderWidth : 1,
      //borderRadius : 5,
      padding: 6
  }
})

export default FetchAllEvents;