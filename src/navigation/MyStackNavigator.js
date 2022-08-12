import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Register from "../screens/Register";
import BookDetail from "../screens/BookDetail";
import MyDrawerNavigator from "./MyDrawerNavigator";
import UserContext from "../contexts/UserContext";
import NoteDetails from "../screens/NoteDetails";
import ForgetPassword from "../screens/ForgetPassword";
import NewPassword from "../screens/NewPassword";
import MyTopNavigator from "./MyTopNavigator";

const Stack = createStackNavigator();
export default () => {
  const state = useContext(UserContext);
  return (
    <Stack.Navigator initialRouteName="Login">
      {state.isLoggedIn ? (
        <>
          <Stack.Screen
            name="Home"
            component={MyDrawerNavigator}
            options={{
              headerShown: false,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="Detail"
            component={BookDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NoteDetails"
            component={NoteDetails}
            options={{
              headerShown: false,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="Notes"
            component={MyTopNavigator}
            options={{
              headerShown: false,
              headerBackVisible: false,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewPassword"
            component={NewPassword}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
