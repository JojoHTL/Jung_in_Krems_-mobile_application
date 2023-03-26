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

function GetLink(link:any){
  if(link==null){
    return null
  }
  return(
    <View style={[{flexDirection:'row', justifyContent:'flex-start'}]}>
      <Feather name='link' /*style={styles.inputicon}*/ size={28} color={'#2655CA'}/>
      <Text>{link}</Text>
    </View>
  );
}

const FetchBildung = (props:any) => {
  const server = '162.55.215.235';
  const [data , setData] = useState([]);
  const [accountId, setId] = useState('');
  const [managers, setManagers] = useState([]);
  const navigation = useNavigation();

  const GetAccountId = async () => {
    const id = await AsyncStorage.getItem('ACCOUNT_ID');
    if(id!==null){
      await setId(id);
      //await console.log(typeof(id));
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
            console.log('Bookmark created: Facilityid: '+id)
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
            console.log('Bookmark deleted: Facilityid: '+id)
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
    axios.get('http://'+server+'/api/facilities/'+props.target)
      .then((response) => [setData(response.data),setManagers(response.data.managers),props.bookmark == true ? (console.log('fetched bookmark facility : '+props.target)):(console.log('fetched facility : '+props.target))])
      .catch((error) => console.log(error));
    GetAccountId();
  },[]);

  const CreateButton = () => {
    if (managers !== null) {
      for (let i = 0; i < managers.length; i++) {
        const element = managers[i];
        if (element.ACCOUNT_ID.toString() === accountId.toString()) {
          return true;
        }
      }
      return false;
    }
    return false;
  };

  const SaveFacilityId = async (value:any) => {
    if(value!==null){
      await AsyncStorage.setItem('FACILITY_ID',JSON.stringify(value));
    }
  }

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
          <Text style={styles.titletext}>{data.NAME}</Text>
        </View>
        <View style={[{flexDirection : 'row'}]}>
          <View style={[{backgroundColor : '#989898',borderWidth : 1,borderRadius : 5, justifyContent:'center'}]}>
            <Text style={[{paddingLeft : '2%', paddingRight : '2%', color:'white'}]}>{data.FACILITY_TYPE}</Text>
          </View>
          {props.marks.includes(data.FACILITY_ID) ? (
              <Pressable onPress={()=>DeleteBookmark(data.FACILITY_ID)}
              style={({pressed}) => [
                  {
                      
                    backgroundColor : '#FFCD00',
                    borderWidth : 1,
                    borderRadius : 5,
                    padding : '0.7%',
                    width: '17%',
                    flexDirection : 'row',
                    justifyContent : 'center',
                    marginLeft : '2%'

                  }
              ]}>
              <AntDesign name='star' size={19} color={'white'}/>
            </Pressable>
          ) : (
            <Pressable onPress={()=>CreateBookmark(data.FACILITY_ID)}
              style={({pressed}) => [
              {
                  
                backgroundColor : 'white',
                borderWidth : 1,
                borderRadius : 5,
                padding : '0.7%',
                width: '17%',
                flexDirection : 'row',
                justifyContent : 'center',
                marginLeft : '2%'

              }
            ]}>
              <AntDesign name='staro' size={19}/>
            </Pressable>
          )}
        </View>
        {CreateButton() == true ? (
          <Pressable onPress={() => [navigation.navigate('Event anmleden'),props.CloseModal(), SaveFacilityId(data.FACILITY_ID)]}
            style={[{
              marginTop:'3%',
              backgroundColor : '#2655CA',
              justifyContent : 'center',
              width : '31.2%',
              flexDirection:'row',
              padding : '1.2%',
              borderRadius : 5
            }]}>
            <Text style={[{
              color : 'white',
              fontWeight : 'bold'
            }]}>Event erstellen</Text>
          </Pressable>
        ) : (
          null
        )}
      </View>
      <ScrollView>
        <View style={[{flexDirection:'column', marginTop:'4%', marginLeft:'5%'}]}>
          <View style={[{flexDirection:'row', justifyContent:'flex-start'}]}>
            <IonIcons name='location-sharp' style={styles.inputicon} size={28} color={'#2655CA'}/>
            <Text>{data.ADDRESS}, {data.POSTAL_CODE} {data.CITY}</Text>
          </View>
          <View style={[{flexDirection:'row', justifyContent:'flex-start'}]}>
            <MaterialIcon name='phone' style={styles.inputicon} size={28} color={'#2655CA'}/>
            <Text>{data.PHONE_NR}</Text>
          </View>
          <View style={[{flexDirection:'row', justifyContent:'flex-start'}]}>
            <Feather name='mail' style={styles.inputicon} size={28} color={'#2655CA'}/>
            <Text>{data.EMAIL}</Text>
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

export default FetchBildung;