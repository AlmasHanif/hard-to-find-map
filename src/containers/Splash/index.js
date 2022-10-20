import React, { Component } from "react";
import {
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import styles from "./styles";
import { Images } from "../../theme";
import { push } from "../../services/NavigationService";
import Carousel, { Pagination } from "react-native-snap-carousel";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContext } from "@react-navigation/native";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const { width, height } = Dimensions.get("screen");
const ITEM_SIZE = 60;

class Splash extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      push("login");
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={Images.splashFull}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    );
  }
}

export default Splash;
