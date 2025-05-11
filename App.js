import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import Login from './final/Login';
import Dashboard from './final/Dashboard';
import Sidebar from './final/Sidebar';
import MainContainer from './final/MainContainer';
import Container21 from './final/Container21';
import ClaimDetails from './final/ClaimDetails';
import Container2 from './final/Container2';
import Container3 from './final/Container3';
import Container9 from './final/Container9';
import Container8 from './final/Container8';
import ContainerRecommendations from './final/ContainerRecommendations';
import Container4 from './final/Container4';
import Container11 from './final/Container11';
import Container12 from './final/Container12';
import Container13 from './final/Container13';
import Container14 from './final/Container14';
import UserRegistration from './final/UserRegistration';
import Container16 from './final/Container16';
import AdminUserManagement from './final/AdminUserManagement';
import Container5 from './final/Container5';
import Container6 from './final/Container6';
import Title from './final/Title';
import Details from './final/Details';
import HospitalDashboard from './final/screens/HospitalDashboard';
import SubmitClaimScreen from './final/screens/SubmitClaimScreen';
import PermissionRequestScreen from './final/screens/PermissionRequestScreen';
import ClaimStatusScreenHospital from './final/screens/ClaimStatusScreenHospital';
import FraudResultsScreen from './final/FraudResultsScreen';
import ClaimStatusScreen from './final/ClaimStatusScreen';
import PolicyUpdateForm from './final/PolicyUpdateForm';
import ImageViewScreen from './final/ImageViewScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={({ navigation }) => ({
          headerShown: true, // Show the header
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ marginLeft: 10 }}>← </Text> 
            </TouchableOpacity>
          ),
        })}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Sidebar" component={Sidebar} />
        <Stack.Screen name="MainContainer" component={MainContainer} />
        <Stack.Screen name="ClaimDetails" component={ClaimDetails}/>
        <Stack.Screen name="Container2" component={Container2} />
        <Stack.Screen name="Container21" component={Container21} />
        <Stack.Screen name="Container3" component={Container3} />
        <Stack.Screen name="Container5" component={Container5} />
        <Stack.Screen name="Container6" component={Container6} />
        <Stack.Screen name="Container9" component={Container9} />
        <Stack.Screen name="Container8" component={Container8} />
        <Stack.Screen name="UserRegistration" component={UserRegistration} />
         <Stack.Screen name="AdminUserManagement" component={AdminUserManagement}/>
        <Stack.Screen name="Container4" component={Container4} />
        <Stack.Screen name="Container11" component={Container11} />
        <Stack.Screen name="Container12" component={Container12} />
        <Stack.Screen name="Container13" component={Container13} />
        <Stack.Screen name="Container14" component={Container14} />
        <Stack.Screen name="ContainerRecommendations" component={ContainerRecommendations} />
        <Stack.Screen name="Container16" component={Container16} />
        <Stack.Screen name="FraudResults" component={FraudResultsScreen} />
        <Stack.Screen name="ClaimStatus" component={ClaimStatusScreen} />   
        <Stack.Screen name="Title" component={Title} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="HospitalDashboard" component={HospitalDashboard} />
        <Stack.Screen name="SubmitClaim" component={SubmitClaimScreen} />
        <Stack.Screen name="PermissionRequest" component={PermissionRequestScreen} />
        <Stack.Screen name="ClaimStatusHospital" component={ClaimStatusScreenHospital} />
        <Stack.Screen name="PolicyUpdateForm" component={PolicyUpdateForm} />
        <Stack.Screen name='ImageViewScreen' component={ImageViewScreen}/>




      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
