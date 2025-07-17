import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import screens
import SplashScreen from './src/screens/SplashScreen';
import GetStartedScreen from './src/screens/GetStartedScreen';
import GetStarted2 from './src/screens/GetStarted2';
import GetStarted3 from './src/screens/GetStarted3';
import LoginSignup from './src/screens/LoginSignup';
import EnterOTP from './src/screens/EnterOTP';
import SetupProfile from './src/screens/SetupProfile';
import Dashboard from './src/screens/Dashboard';
import Journals from './src/screens/Journals';
import RequestFeedback from './src/screens/RequestFeedback';
import SelfAssessment from './src/screens/SelfAssessment';
import Settings from './src/screens/Settings';
import Coaches from './src/screens/Coaches';
import DoctorProfile from './src/screens/DoctorProfile';
import DoctorSessionBooking from './src/screens/DoctorSessionBooking';
import PaymentSelection from './src/screens/PaymentSelection';
import PaymentSuccess from './src/screens/PaymentSuccess';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator 
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
          <Stack.Screen name="GetStarted2" component={GetStarted2} />
          <Stack.Screen name="GetStarted3" component={GetStarted3} />
          <Stack.Screen name="LoginSignup" component={LoginSignup} />
          <Stack.Screen name="EnterOTP" component={EnterOTP} />
          <Stack.Screen name="SetupProfile" component={SetupProfile} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Journals" component={Journals} />
          <Stack.Screen name="RequestFeedback" component={RequestFeedback} />
          <Stack.Screen name="SelfAssessment" component={SelfAssessment} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Coaches" component={Coaches} />
          <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
          <Stack.Screen name="DoctorSessionBooking" component={DoctorSessionBooking} />
          <Stack.Screen name="PaymentSelection" component={PaymentSelection} />
          <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
