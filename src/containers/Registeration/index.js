import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Picker,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { Metrics } from "../../theme";
import { USER, DUMP } from "../../actions/ActionTypes";
import constant from "../../constants";
import utility from "../../utility";
import { NavigationContext } from "@react-navigation/native";
import { push } from "../../services/NavigationService";
import { LoginContext } from "../../";
import { connect } from "react-redux";
import {
  TextFieldPlaceholder,
  FormHandler,
  AppTextButton,
  Header,
} from "../../reuseableComponents";
import { request } from "../../actions/ServiceAction";
import { INPUT_TYPES } from "../../reuseableComponents/FormHandler/Constants";
import HttpServiceManager from "../../services/HttpServiceManager";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import { Images, Colors, AppStyles } from "../../theme";
import { WithKeyboardListener } from "../../HOC";

class Registeration extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      is_visible: true,
      c_visible: true,
    };
  }

  componentDidMount() {}
  safeAreaBottomInset = 0;

  cbOnRequestLogin = () => {
    const formData = this.formHandler.onSubmitForm();

    formData && this.onSubmit(formData);
  };

  onSubmit = (formData) => {
    const { street, firstName, lastName, email, password, phone, zip } =
      formData;

    let payload = {
      token: "U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT",
      name: `${firstName} ${lastName}`,
      email: email,
      password: password,
      phone,
      street: street,
      zip,
    };
    console.log("payload", payload)

    this.props.request(
      constant.signUp,
      "post",
      payload,
      DUMP,
      true,
      (success) => this.onSignUpSuccess(success),
      (err) => this.onSignUpError
    );
  };
  onSignUpSuccess = (success) => {
    console.log("success", success);
    push("login");
  };

  onSignUpError = (error) => {
    if (error) {
      utility.showFlashMessage("Register Failed", "danger");
    }
  };

  render() {
    const { is_visible } = this.state;
    const { isKeyboardVisible, keyboardHeight, route } = this.props;
    console.log("isKeyboardVisible", keyboardHeight, isKeyboardVisible);

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          marginBottom:
            isKeyboardVisible && utility.isPlatformAndroid()
              ? keyboardHeight - 50
              : 0,
        }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          //  contentContainerStyle={{ paddingBottom: 20 }}
        >
          <ImageBackground
            style={[styles.fixed, styles.imageContainter]}
            source={Images.loginBg}
          />
          {/* <ImageBackground
            source={Images.loginBg}
            style={styles.image}
            resizeMode="cover"
          > */}
          <View style={styles.overlay}>
            <View>
              <View style={styles.logoSec}>
                <Image
                  style={styles.imgSec}
                  source={Images.loginLogo}
                  resizeMode="contain"
                />
                {/*<Text style={styles.topError}>
                    Incorrect username or password.
                  </Text>*/}
              </View>
              <View style={styles.buttonSec1}>
                <FormHandler ref={(ref) => (this.formHandler = ref)}>
                  <TextFieldPlaceholder
                    label="First Name"
                    error="First Name is required"
                    type={INPUT_TYPES.TEXT}
                    identifier="firstName"
                    blurOnSubmit={false}
                  />
                  <TextFieldPlaceholder
                    label="Last Name"
                    error="Last Name is required"
                    type={INPUT_TYPES.TEXT}
                    identifier="lastName"
                    blurOnSubmit={false}
                  />
                  <TextFieldPlaceholder
                    label="Email Address"
                    error="Email is required"
                    type={INPUT_TYPES.EMAIL}
                    identifier="email"
                    blurOnSubmit={false}
                  />
                  <TextFieldPlaceholder
                    label="Mobile no"
                    error="Mobile no is required"
                    type={INPUT_TYPES.PHONE}
                    identifier="phone"
                    blurOnSubmit={false}
                  />
                  <TextFieldPlaceholder
                    label="Street Name"
                    type={INPUT_TYPES.Text}
                    identifier="street"
                    blurOnSubmit={false}
                  />
                  <TextFieldPlaceholder
                    label="Zipcode"
                    type={INPUT_TYPES.TEXT}
                    identifier="zip"
                    blurOnSubmit={false}
                  />
                  <TextFieldPlaceholder
                    label="Password"
                    error="Password is required"
                    type={INPUT_TYPES.PASSWORD}
                    showPassword={this.state.is_visible ? false : true}
                    identifier="password"
                    onRightPress={() =>
                      this.setState({
                        is_visible: !this.state.is_visible,
                      })
                    }
                    rightIcon={
                      this.state.is_visible
                        ? Images.ic_invisible
                        : Images.ic_pass
                    }
                  />
                  <TextFieldPlaceholder
                    label="Confirm Password"
                    showPassword={this.state.c_visible ? false : true}
                    error="Password & Confirm password should be same"
                    type={INPUT_TYPES.CONFIRM_PASSWORD}
                    identifier="c_password"
                    blurOnSubmit={false}
                    onRightPress={() =>
                      this.setState({
                        c_visible: !this.state.c_visible,
                      })
                    }
                    rightIcon={
                      this.state.c_visible
                        ? Images.ic_invisible
                        : Images.ic_pass
                    }
                  />
                </FormHandler>
              </View>
            </View>
            <View style={styles.submitBtn}>
              <AppTextButton
                title="Submit"
                style={styles.btnStyle}
                // onPress={() => push("dashboard")}
                onPress={this.cbOnRequestLogin}
              />
            </View>
          </View>
          {/* </ImageBackground> */}
        </ScrollView>
      </View>
    );
  }
}

const actions = { request };
const mapStateToProps = ({}) => ({});
export default connect(
  mapStateToProps,
  actions
)(WithKeyboardListener(Registeration));
