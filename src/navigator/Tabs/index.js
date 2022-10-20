import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Dashboard,
  Favorites,
  History,
  Profile,
  Logout,
} from "../../containers";
import { Images, Metrics, Colors, Fonts, AppStyles } from "../../theme";
import { toggleDrawer } from "../../services/NavigationService";
import utility from "../../utility";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const defaultScreenOptions = (transparent = false) => {
  return {
    headerTitleStyle: {
      fontSize: Metrics.generatedFontSize(20),
      fontFamily: Fonts.Type.Bold,
      color: Colors.primary.white,
    },

    headerTransparent: transparent,
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: Colors.primary.theme,
      borderBottomWidth: 0,
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
    },
  };
};

const tabBarOptions = () => {
  return {
    //   inactiveTintColor: Colors.icon.white,
    //showLabel: false,
    keyboardHidesTabBar: true, //If true hide the tab bar when keyboard opens.
    safeAreaInsets: { bottom: 0 },
    style: {
      backgroundColor: Colors.primary.white,
      height: Metrics.heightRatio(60),
    },
    labelStyle: {
      fontSize: Metrics.generatedFontSize(9),
      fontFamily: Fonts.Type.Regular,
      letterSpacing: 1,
      marginBottom: utility.isPlatformAndroid()
        ? Metrics.widthRatio(0)
        : Metrics.heightRatio(25),
    },

    activeTintColor: Colors.primary.theme,
    inactiveTintColor: Colors.primary.black,
    showLabel: false,
    //    ...hideTabBarBottom()
  };
};

//====================================================================

const TabBarIcon = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let icon;
    switch (route.name) {
      case "DashBoardStack":
        icon = focused ? Images.ic_home_active : Images.ic_home_in;
        break;
      case "HistoryStack":
        icon = focused ? Images.ic_history_active : Images.ic_history_in;
        break;
      case "FavoritesStack":
        icon = focused ? Images.ic_favorite_active : Images.ic_favorite_in;
        break;
      case "ProfileStack":
        icon = focused ? Images.ic_user_active : Images.ic_user_in;
        break;
      // case "LogoutStack":
      //   icon = focused ? Images.ic_logout_active : Images.ic_logout_in;
      //   break;
    }
    return (
      <Image
        resizeMode="contain"
        source={icon}
        style={{
          width: Metrics.widthRatio(24),
          height: Metrics.heightRatio(20),
        }}
      />
    );
  },
});

const DashBoardStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        title: "Search",
        ...defaultScreenOptions(),
      }}
    />
  </Stack.Navigator>
);

const HistoryStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="History"
      component={History}
      options={{
        title: "History",
        ...defaultScreenOptions(),
      }}
    />
  </Stack.Navigator>
);

const FavoritesStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Favorites"
      component={Favorites}
      options={{
        title: "Favorites",
        ...defaultScreenOptions(),
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        title: "Profile",
        ...defaultScreenOptions(),
      }}
    />
  </Stack.Navigator>
);

// const LogoutStack = ({ navigation }) => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Logout"
//       component={Logout}
//       options={{
//         headerShown: false,
//       }}
//     />
//   </Stack.Navigator>
// );

export default BottomTab = () => (
  <Tab.Navigator
    initialRouteName="DashBoardStack"
    backBehavior={"initialRoute"}
    screenOptions={TabBarIcon}
    tabBarOptions={tabBarOptions()}
  >
    <Tab.Screen
      name="DashBoardStack"
      component={DashBoardStack}
      options={{
        tabBarLabel: "Search",
      }}
    />
    <Tab.Screen
      name="HistoryStack"
      component={HistoryStack}
      options={{
        tabBarLabel: "History",
      }}
    />
    <Tab.Screen
      name="FavoritesStack"
      component={FavoritesStack}
      options={{
        tabBarLabel: "Favorites",
      }}
    />
    <Tab.Screen
      name="ProfileStack"
      component={ProfileStack}
      options={{
        tabBarLabel: "Profile",
      }}
    />
    {/* <Tab.Screen
      name="LogoutStack"
      component={LogoutStack}
      options={{
        tabBarLabel: "",
      }}
    /> */}
  </Tab.Navigator>
);
