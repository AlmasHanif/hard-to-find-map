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
  Alert,
} from "react-native";
import { USER, DUMP } from "../../actions/ActionTypes";
import constant from "../../constants";
import utility from "../../utility";
import { NavigationContext } from "@react-navigation/native";
import { push } from "../../services/NavigationService";
import { LoginContext } from "../../";
import { SafeAreaConsumer } from "react-native-safe-area-context";
import { connect } from "react-redux";
import {
  TextFieldPlaceholder,
  FormHandler,
  AppTextButton,
} from "../../reuseableComponents";
import { request, generalUpdate } from "../../actions/ServiceAction";
import { INPUT_TYPES } from "../../reuseableComponents/FormHandler/Constants";
import HttpServiceManager from "../../services/HttpServiceManager";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import { Images, Colors, AppStyles, Metrics } from "../../theme";
import { WithKeyboardListener } from "../../HOC";
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from "react-native-fbsdk";

import {
  statusCodes,
  GoogleSignin,
} from "@react-native-google-signin/google-signin";

class Login extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      is_visible: true,
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        "597446303335-r8afm4jbpktdaik77dajigucpl4pfo9m.apps.googleusercontent.com",
    });
  }
  safeAreaBottomInset = 0;

  cbOnRequestLogin = (setLogin, setRole) => {
    const formData = this.formHandler.onSubmitForm();
    formData && this.onSubmit(formData, setLogin, setRole);
  };

  onSubmit = (formData, setLogin, setRole) => {
    let payload = {
      token: "U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT",
      email: formData.email,
      password: formData.password,
    };


    console.log("payload", payload);
    this.props.request(
      constant.login,
      "post",
      payload,
      USER,
      true,
      (success) => this.onLoginSuccess(setLogin, setRole, success),
      this.onLoginError
    );
  };
  onLoginSuccess = (setLogin, setRole, success) => {
    console.log("success", success);
    setRole(success.data[0]?.Role);
    setLogin();
  };
  onLoginError = (error) => {
    console.log("🚀 ~ file: index.js ~ line 94 ~ Login ~ error", error)
    // if (error) {
    //   utility.showFlashMessage("Login Failed", "danger");
    // }
  };

  handleLoginGoogle = async (setLogin, setRole) => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // Alert.alert("SUCCESS", userInfo.user.name);
      const accessToken = userInfo.idToken.toString();
      this.setState({ userInfo: userInfo });
      this.props.generalUpdate(USER.SUCCESS, { data: userInfo.user });
      // this.props.generalUpdate(USER.SUCCESS, { data: userInfo.user });
      setRole("");
      // push("BottomTab")
      setLogin();
      // const { idToken } = await GoogleSignin.signIn();
      // const { data } = await axios.get(
      //     `${GOOGLE_LOGIN}?idToken=${idToken}`
      // );
      // handleAfterLogin(data, idToken, dispatch, navigation);
    } catch (error) {
      if (
        error.code !== statusCodes.NETWORK_ERROR &&
        error.code !== statusCodes.SIGN_IN_CANCELLED &&
        error.code !== statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      ) {
        // popupError();
      } else if (error.code === statusCodes.NETWORK_ERROR) {
        // popupError(
        //     "Make sure your device is connected to the internet"
        // );
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // popupError("Google play services not found");
      }
    } finally {
    }
  };

  getInfoFromToken = (token, setLogin, setRole) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: "id,email,name,first_name,last_name",
      },
    };
    const profileRequest = new GraphRequest(
      "/me",
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.log("login info has error: " + JSON.stringify(error));
        } else {
          const userData = [
            {
              Email: user && user.email,
              Id: user && user.id,
              Name: user && user.name,
              Role: "Mobile User",
              Status: "Active",
            },
          ];
          this.setState({ userInfo: user });
          this.props.generalUpdate(USER.SUCCESS, { data: userData });
          setLogin();
          setRole("");
          console.log("result:", user);
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  signInFacebook = (setLogin, setRole) => {
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      (login) => {
        if (login.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            this.getInfoFromToken(accessToken, setLogin, setRole);
          });
        }
      },
      (error) => {
        console.log("Login fail with error: " + error);
      }
    );
  };

  scrollToInitialPosition = () => {
    const { isKeyboardVisible, keyboardHeight } = this.props;
    this.scrollViewRef && this.scrollViewRef.scrollToEnd();
  };

  componentDidUpdate(prevProps, prevState) {
    const { isKeyboardVisible, keyboardHeight } = this.props;
    if (isKeyboardVisible !== prevProps.isKeyboardVisible) {
      setTimeout(() => this.scrollToInitialPosition(), 1000);
    }
  }

  render() {
    const { is_visible } = this.state;
    const { isKeyboardVisible, keyboardHeight, route } = this.props;
    console.log("isKeyboardVisible", keyboardHeight, isKeyboardVisible);
    return (
      <LoginContext.Consumer>
        {({ isLogin, setLogin, setRole }) => {
          return (
            <View
              style={{
                flex: 1,
                paddingBottom:
                  isKeyboardVisible && utility.isPlatformAndroid()
                    ? keyboardHeight - 50
                    : 0,
              }}
            >
              <ScrollView
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
                //contentContainerStyle={{ flexGrow: 1 }}
                ref={(ref) => {
                  this.scrollViewRef = ref;
                }}
              >
                <ImageBackground
                  source={Images.loginBg}
                  style={styles.image}
                  resizeMode="cover"
                >
                  <View style={styles.overlay}>
                    <View>
                      <View style={styles.logoSec}>
                        <Image
                          style={
                            isKeyboardVisible
                              ? {
                                  width: Metrics.heightRatio(150),
                                  height: Metrics.heightRatio(180),
                                }
                              : styles.imgSec
                          }
                          source={Images.loginLogo}
                          resizeMode="contain"
                        />
                        {/*<Text style={styles.topError}>
                      Incorrect username or password.
                    </Text>*/}
                      </View>
                      <View style={styles.buttonSec}>
                        <View style={styles.buttonSec1}>
                          <FormHandler ref={(ref) => (this.formHandler = ref)}>
                            <TextFieldPlaceholder
                              label="Email Address"
                              error="Invalid email format"
                              type={INPUT_TYPES.EMAIL}
                              identifier="email"
                              blurOnSubmit={false}
                            />
                            <TextFieldPlaceholder
                              label="Password"
                              error="Invalid password format"
                              type={INPUT_TYPES.PASSWORD}
                              showPassword={
                                this.state.is_visible ? false : true
                              }
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
                          </FormHandler>
                        </View>
                      </View>
                    </View>
                    <View style={styles.submitBtn}>
                      <AppTextButton
                        title="LOGIN"
                        style={styles.btnStyle}
                        onPress={() => this.cbOnRequestLogin(setLogin, setRole)}
                      />
                      <AppTextButton
                        onPress={() => this.signInFacebook(setLogin, setRole)}
                        style={styles.fbButton}
                        title="FACEBOOK"
                      />
                      <AppTextButton
                        onPress={() =>
                          this.handleLoginGoogle(setLogin, setRole)
                        }
                        style={[styles.googleBtn]}
                        title="GOOGLE"
                      />
                    </View>
                    <View style={styles.txtSec}>
                      <Text style={styles.separatorTxt}>Or</Text>
                    </View>
                    <View style={styles.buttonSec2}>
                      <TouchableOpacity
                        style={styles.btnTxt}
                        onPress={() => push("register")}
                      >
                        <Text style={styles.text}>Create New Account</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
              </ScrollView>
            </View>
          );
        }}
      </LoginContext.Consumer>
    );
  }
}

const actions = { request, generalUpdate };
const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, actions)(WithKeyboardListener(Login));
