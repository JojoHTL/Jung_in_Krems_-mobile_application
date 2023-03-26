import EventScreen from "./app/screens/EventScreen";
import EducationScreen from './app/screens/EducationScreen';
import FavoriteScreen from './app/screens/FavoriteScreen';
import LoginScreen from "./app/screens/Login/LoginScreen";
import ResetPassword from './app/screens/Login/ResetPassword';
import SignUpNormal from "./app/screens/Login/SignUpNormal";
import SignUpEducation from "./app/screens/Login/SignUpEducation";
import SuccessEducation from "./app/screens/Login/SuccessEducation";
import FormFreetime from "./app/screens/Forms/FormFreetime";
import SettingScreen from "./app/screens/SettingScreen";
import UsingRightsScreen from "./app/screens/Rights/UsingRights";
import DataRightsScreen from "./app/screens/Rights/DataRights";
import FormFacilities from "./app/screens/Forms/FormFacilities";
import ChangePasswordScreen from "./app/screens/Login/ChangePassword";
import EditEvent from "./app/screens/Forms/EditEvent";
import VerifiyEmail from "./app/screens/Forms/VerifiyEmail";

import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { StyleSheet, LogBox} from 'react-native';
import React from "react";
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";








const EventName = "EventsMain";
const EducationName = "EducationMain";
const FavoriteName = "FavoriteMain";
const SettingName = "SettingsMain"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Stack2 = createStackNavigator();


function LoginNavigation(){
  return(
    <Stack2.Navigator initialRouteName="Login" >
      <Stack2.Screen name="Signupnorm" component={SignUpNormal} options={{ headerShown: false }}/>
      <Stack2.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack2.Screen name="SettingsLoginNav" component={SettingsNavigation} options={{ headerShown: false }}/>
      <Stack2.Screen name="SuccessFacilities" component={SuccessEducation} options={{ headerShown: false }}/>
    </Stack2.Navigator>
  );
}


function SettingsNavigation() {
  return (
    <Stack.Navigator initialRouteName="Settings" >
      <Stack.Screen name="ResetPass" component={ResetPassword} options={{ headerShown: false }}/>
      <Stack.Screen name="Settings" component={SettingScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="DataRights" component={DataRightsScreen}  options={{headerTitle:'Datenschutzbestimmungen'}} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{headerTitle:'Passwort ändern'}}/>
      <Stack.Screen name="UseRights" component={UsingRightsScreen}  options={{headerTitle:'Nutzungsbedingungen'}}/>
      <Stack.Screen name="CreateEvent" component={FormFreetime} options={{headerTitle:'Event anmelden'}}/>
      <Stack.Screen name="CreateFacility" component={SignUpEducation} options={{headerTitle:'Bildungseinrichtung registrieren'}}/>
      <Stack.Screen name="VerifiyEmail" component={VerifiyEmail} options={{headerTitle:'Email verifizieren'}}/>
      <Stack.Screen name="LoginSettingsNav" component={LoginNavigation} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default function App() {
  
  //Ignore Errors and Warnings
  LogBox.ignoreAllLogs();

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={EventName} screenOptions={({route}) => ({
        tabBarIcon : ({focused, color, size}) => {
          let IconName : string = "";
          let rn = route.name;
          color = focused ? "#FFCC00" : "#999999"
          size = 35;

          if(rn === EventName) {
            IconName = "calendar";
            //IconName = focused ? 'calendar' : 'calendar-outline';
          } else if (rn === EducationName) {
            IconName = "school";
            //IconName = focused ? 'school' : 'school-outline';
          } else if (rn === FavoriteName) {
            IconName = "bookmark";
            //IconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (rn === SettingName) {
            IconName = "settings";
            //IconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={IconName} size={size} color={color}/>
        },
        headerShown : false,
        tabBarShowLabel : false,
        tabBarStyle : {
          padding : 10,
          height : 80,
          //display: "none"
          //display : visibility
        },
        tabBarLabelStyle : {
          fontSize : 12,
          color : "#FFCC00",
          fontWeight : "bold"
        }
      })}>

        <Tab.Screen name={EventName} component={EventScreen}/>
        <Tab.Screen name={EducationName} component={EducationScreen}/>
        <Tab.Screen name={FavoriteName} component={FavoriteScreen}/>
        <Tab.Screen name={SettingName} component={SettingsNavigation} options={() => ({tabBarStyle: {display: "none"}})}/>
        <Tab.Screen name='Event anmleden' component={FormFacilities} options={() => ({tabBarStyle: {display: "none"},tabBarItemStyle:{display:'none'}})}/>
        <Tab.Screen name='Event bearbeiten' component={EditEvent} options={() => ({tabBarStyle: {display: "none"},tabBarItemStyle:{display:'none'}})}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
