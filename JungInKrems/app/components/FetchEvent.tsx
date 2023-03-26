import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet,ScrollView, Pressable, SafeAreaView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvenTypeComp from './EventType';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/de';
import SafeView from '../styles/SafeView';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function formatDate(dateString:any) {
  if(dateString==null){
    return 'Offen';
  }
  const date = moment.utc(dateString).locale('de'); // set German locale
  const formattedDate = date.format('D. MMMM YYYY HH:mm');
  return formattedDate;
}

function GetLink(link:any){
  if(link==null){
    return null
  }
  return(
    <View style={[{flexDirection:'row', justifyContent:'center'}]}>
      <Feather name='link' /*style={styles.inputicon}*/ size={28}/>
      <Text>{link}</Text>
    </View>
  );
}

const FetchEvent = (props:any) => {
  const server = '162.55.215.235';
  const [data , setData] = useState([]);
  const navigation = useNavigation();
  
  const SaveEventId = async (value:any) => {
    if(value!==null){
      await AsyncStorage.setItem('EVENT_ID',JSON.stringify(value));
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
            props.updateBookmarks('created:'+id);
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
            props.updateBookmarks('deleted:'+id);
        })
        .catch((error) => {
            console.log(error);
        }); 
    }
    else{
      console.log('no token');
    }
  }

  useEffect(() => {
    axios.get('http://'+server+'/api/events/'+props.target)
      .then((response) => [setData(response.data),props.bookmark == true ? (console.log('fetched bookmark event : '+props.target)):(console.log('fetched event : '+props.target))])
      .catch((error) => console.log(error));
  },[]);

  return (
    <View style={[{margin:0 , padding:0, backgroundColor:'white', height:'90%', marginBottom:0}]}>
      <View style={styles.imagecontainer}>
        <ImageBackground source={{ uri:data.IMAGE_PATH }} resizeMode="cover" style={styles.imagestyle}>
          <SafeAreaView style={SafeView.droidSafeArea}>
            <Pressable style={styles.backcontainer} onPress={()=> props.CloseModal()}>
              <MaterialIcon name='arrow-back-ios' size={25} color={'white'} style={styles.backicon}/>
            </Pressable>
          </SafeAreaView>
        </ImageBackground>
      </View>
      <View style={styles.titlecontainer}>
        <View style={[{marginBottom:'1%'}]}>
          <Text style={styles.titletext}>{data.TITLE}</Text>
        </View>
        <View style={[{flexDirection : 'row'}]}>
          <EvenTypeComp type={data.EVENT_TYPE}/>
          {props.marks.includes(data.EVENT_ID) ? (
              <Pressable onPress={()=>DeleteBookmark(data.EVENT_ID)}
              style={({pressed}) => [
                  {
                      
                    backgroundColor : '#FFCD00',
                    borderWidth : 1,
                    borderRadius : 5,
                    padding : '0.3%',
                    width: '17%',
                    flexDirection : 'row',
                    justifyContent : 'center',
                    marginLeft : '2%'

                  }
              ]}>
              <AntDesign name='star' size={19} color={'white'}/>
            </Pressable>
          ) : (
            <Pressable onPress={()=>CreateBookmark(data.EVENT_ID)}
              style={({pressed}) => [
              {
                  
                backgroundColor : 'white',
                borderWidth : 1,
                borderRadius : 5,
                padding : '0.3%',
                width: '17%',
                flexDirection : 'row',
                justifyContent : 'center',
                marginLeft : '2%'

              }
            ]}>
              <AntDesign name='staro' size={19}/>
            </Pressable>
          )}
          {props.account == data.ACCOUNT_ID ? (
            <Pressable onPress={() => [navigation.navigate('Event bearbeiten'),props.CloseModal(), SaveEventId(data.EVENT_ID)]}
            style={({pressed}) => [
              {
                  
                backgroundColor : '#FFCD00',
                borderWidth : 1,
                borderRadius : 5,
                padding : '0.3%',
                width: '11%',
                flexDirection : 'row',
                justifyContent : 'center',
                marginLeft : '2%'

              }
            ]}>
              <AntDesign name='edit' size={19} color={'white'}/>
            </Pressable>
          ) : null
        }
        </View>
      </View>
      <ScrollView>
        <View style={[{flexDirection:'column', marginTop:'4%'}]}>
          <View style={[{flexDirection:'row', justifyContent:'center', marginRight:'1%'}]}>
            <IonIcons name='location-sharp' size={28}/>
            <Text>{data.ADDRESS}, {data.POSTAL_CODE} {data.CITY}</Text>
          </View>
          <View style={[{flexDirection:'row', justifyContent:'center'}]}>
            <AntDesign name='calendar' size={28}/>
            <View>
              <Text>Start: {formatDate(data.STARTING_TIME)}</Text>
              <Text>Ende: {formatDate(data.ENDING_TIME)}</Text>
            </View>
          </View>
          {GetLink(data.WEBSITE_URL)}
        </View>
        <View style={styles.descriptioncontainer}>
          <Text style={[{fontWeight:'bold', fontSize:18, marginBottom:'1%'}]}>Beschreibung:</Text>
          <Text>{data.DESCRIPTION}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptioncontainer:{
    marginLeft:'2%',
    marginRight:'2%',
    marginTop : '6%'
  },
  titletext : {
    fontSize : 19,
    fontWeight : 'bold'
  },
  titlecontainer : {
    //justifyContent : 'space-between',
    flexDirection : 'column',
    marginLeft : '2%',
    //marginRight : 0,
    //marginBottom : '1%',
    marginTop : '3%',
    //flex:1
  },
  backicon : {
    textShadowColor: 'rgba(0, 0, 0, 0.68)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 5,
    paddingLeft : '1%'
  },
  backcontainer : {
      marginLeft: '1%'
  },
  wrapper : {
    //marginLeft : '3%',
    //marginRight : '3%',
    borderWidth : 1,
    //marginBottom : '5%',
    borderRadius : 5,
    //paddingBottom : '1%',
    width : '100%',
    height : '100%',
    //backgroundColor : 'white'
  },
  imagestyle : {
    //flex:1,
    margin:0,
    padding:0,
    height : '100%'
  },
  imagecontainer : {
    //width: '100%',
    marginTop : 0,
    height : '45%'
  }
})

export default FetchEvent;