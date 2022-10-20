import React, { Component, useContext } from "react";
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
  Button,
  Settings,
  Alert,
} from "react-native";
import { USER, DUMP, DELETE_ALL } from "../../../actions/ActionTypes";
import constant from "../../../constants";
import utility from "../../../utility";
import { NavigationContext } from "@react-navigation/native";
import { push } from "../../../services/NavigationService";
import { SafeAreaConsumer } from "react-native-safe-area-context";
import { OutlinedTextField } from "react-native-material-textfield";

import { connect } from "react-redux";
import singleton from "../../../singleton";
import {
  TextFieldPlaceholder,
  FormHandler,
  TextfieldNoPlaceholder,
  AppTextButton,
  AppTabButton,
  Header,
  AddProfileItem,
  BottomActionSheet,
  Avatar,
} from "../../../reuseableComponents";
import {
  TopHeader,
  TopBanner,
  InputField,
  LoaderComp,
} from "../../../components";
import { request, success } from "../../../actions/ServiceAction";
import {
  selectCameraImage,
  selectSingleImage,
} from "../../../services/PickerUtiles";
import { INPUT_TYPES } from "../../../reuseableComponents/FormHandler/Constants";
import HttpServiceManager from "../../../services/HttpServiceManager";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import { Images, Colors, AppStyles, Metrics } from "../../../theme";
import { WithKeyboardListener } from "../../../HOC";
import { logout, generalUpdate } from "../../../actions/ServiceAction";
import { LoginContext } from "../../../../src";
import Reinput from "reinput";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.user && props.user.display_picture_base64,
      display_picture: props.user && props.user.display_picture_url,
      isFetching: false,
      is_visible: true,
      c_visible: true,
      activeTab: "Profile",
      inputFields: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        street: "",
        zip: "",
      },
    };
  }
  static contextType = LoginContext;

  getFilterUserInfo = async () => {
    const userInfo = {};

    const { user } = this.props;
    const info = await AsyncStorage.getItem("profileInfo");
    const parseInfo = JSON.parse(info);

    console.log(
      "🚀 ~ file: index.js ~ line 84 ~ Profile ~ user",
      JSON.parse(info)
    );

    if (user) {
      const name = parseInfo?.Name.split(" ") || user?.Name.split(" ");

      userInfo.first_name = name[0];
      userInfo.last_name = name[1];
      userInfo.email = parseInfo?.Email || user?.Email;
      userInfo.phone = parseInfo?.Phone || user?.Phone;
      userInfo.zipcode = parseInfo?.ZipCode || user?.ZipCode;
      userInfo.street_name = parseInfo?.Street || user?.Street;

      this.setState({
        ...this.state.inputFields,
        inputFields: {
          ...this.state.inputFields,
          first_name: name[0],
          last_name: name[1],
          email: user?.Email,
          phone: user?.Phone,
          zip: user?.ZipCode,
          street: user?.Street,
        },
      });
    }

    return userInfo;
  };

  componentDidMount() {
    this.getFilterUserInfo();
  }

  cbOnUpdateProfileRequest = () => {
    // const formData = this.formHandler.onSubmitForm();
    // formData &&
    this.onSubmit(this.state.inputFields);
  };

  onSubmit = (formData) => {
    const { first_name, last_name, email, phone, street, zip } =
      this.state.inputFields;
    const { user } = this.props;
    console.log("🚀 ~ file: index.js ~ line 126 ~ Profile ~ user", user);

    let payload = {
      token: "U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT",
      user_id: user.Id,
      name: `${first_name} ${last_name}`,
      phone,
      street: street,
      zip,
      // password: formData.password,
      // confirmpassword: formData.confirmPassword,
    };

    console.log("🚀 ~ file: index.js ~ line 163 ~ Profile ~ payload", payload)


    this.props.request(
      constant.updateProfile,
      "post",
      payload,
      DUMP,
      true,
      (success) =>
        this.onProfileUpdateSuccess({
          Name: `${first_name} ${last_name}`,
          // Email: email,
          Phone: phone,
          Street: street,
          ZipCode: zip,
        }),
      this.onSignUpError
    );
  };

  onSignUpError = (error) => {
    if (error) {
      utility.showFlashMessage("Profile Update Failed", "danger");
    }
  };

  onProfileUpdateSuccess = (success) => {
    console.log("🚀 ~ file: index.js ~ line 158 ~ Profile ~ success", success);
    success.Email = this.state.inputFields.email;

    AsyncStorage.setItem("profileInfo", JSON.stringify(success));
    utility.showFlashMessage("Profile Updated Successfully!", "success");
  };

  onTabSelect = (tabVal) => {
    const { activeTab } = this.state;
    this.setState({ activeTab: tabVal });
  };

  onLogout = (setLogin) => {
    this.props.generalUpdate(USER.SUCCESS, { data: {} });
    singleton.storeRef.dispatch(logout());
    singleton.storeRef.dispatch(generalUpdate(DELETE_ALL, []));
    // this.context.
    setLogin(false);
  };

  handleChange = (key, val) => {
    this.setState({
      ...this.state.inputFields,
      inputFields: { ...this.state.inputFields, [key]: val },
    });
  };

  render() {
    const { user } = this.props;
    const { avatar, display_picture, isFetching, activeTab, inputFields } =
      this.state;
    //  Colors.secondary.blueish;
    const inputColor = Colors.secondary.btnColor;

    return (
      <LoginContext.Consumer>
        {({ isLogin, setLogin, setRole }) => {
          return (
            <>
              <View style={styles.tabsSection}>
                <View style={styles.tabBtnSec}>
                  <AppTabButton
                    title="Profile"
                    style={[
                      styles.tabButton,
                      activeTab && activeTab == "Profile"
                        ? styles.activeTab
                        : styles.notActiveTab,
                    ]}
                    onPress={() => this.onTabSelect("Profile")}
                  />
                </View>
                <View style={styles.tabBtnSec}>
                  <AppTabButton
                    title="Settings"
                    style={[
                      styles.tabButton,
                      activeTab && activeTab == "Settings"
                        ? styles.activeTab
                        : styles.notActiveTab,
                    ]}
                    onPress={() => this.onTabSelect("Settings")}
                  />
                </View>
              </View>
              {activeTab == "Profile" && (
                <ScrollView
                  // style={{flex: 1}}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  // contentContainerStyle={{flexGrow: 1}}
                >
                  {/*isFetching && <LoaderComp />*/}

                  <View style={styles.buttonSec}>
                    <View style={styles.profilePicSec}>
                      <Image
                        source={Images.avatarIcon}
                        style={styles.profilePic}
                      />
                    </View>
                    <View style={styles.formStyle}>
                      <FormHandler ref={(ref) => (this.formHandler = ref)}>
                        {/* <Text style={styles.label}>First Name</Text> */}
                        {/* <TextfieldNoPlaceholder
                            error="First name is required"
                            type={INPUT_TYPES.OPTIONAL}
                            style={styles.simpleInpt}
                            identifier="firstName"
                            blurOnSubmit={false}
                            //rightIcon={Images.ic_pass}
                            value={user && user.first_name}
                          /> */}
                        <Reinput
                          label="First Name"
                          style={styles.simpleInpt}
                          underlineActiveColor={inputColor}
                          labelActiveColor={inputColor}
                          identifier="firstName"
                          value={
                            inputFields.first_name || (user && user.first_name)
                          }
                          onChangeText={(e) =>
                            this.handleChange("first_name", e)
                          }
                        />

                        {/* <Text style={styles.label}>Last Name</Text>
                          <TextfieldNoPlaceholder
                            label="Last Name"
                            type={INPUT_TYPES.OPTIONAL}
                            style={styles.simpleInpt}
                            identifier="lastName"
                            blurOnSubmit={false}
                            //rightIcon={Images.ic_pass}
                            value={user && user.last_name}
                          /> */}
                        <Reinput
                          label="Last Name"
                          style={styles.simpleInpt}
                          underlineActiveColor={inputColor}
                          identifier="lastName"
                          labelActiveColor={inputColor}
                          value={
                            inputFields.last_name || (user && user.last_name)
                          }
                          onChangeText={(e) =>
                            this.handleChange("last_name", e)
                          }
                        />
                        <Reinput
                          label="Email"
                          identifier="email"
                          style={styles.simpleInpt}
                          underlineActiveColor={inputColor}
                          labelActiveColor={inputColor}
                          value={inputFields.email || (user && user.email)}
                          onChangeText={(e) => this.handleChange("email", e)}
                          editable={false}
                        />
                        {/* <View style={styles.inputFieldSec}>
                          <Text style={styles.label}>Email</Text>
                          <TextfieldNoPlaceholder
                            label="Email"
                            type={INPUT_TYPES.OPTIONAL}
                            identifier="email"
                            style={styles.simpleInpt}
                            blurOnSubmit={false}
                            value={user && user.email}
                          />
                        </View> */}
                        {/* <View style={styles.inputFieldSec}>
                          <Text style={styles.label}>Mobile</Text>
                          <TextfieldNoPlaceholder
                            label="Mobile"
                            error="Mobile number is required"
                            type={INPUT_TYPES.PHONE}
                            style={styles.simpleInpt}
                            identifier="phone"
                            blurOnSubmit={false}
                            value={user && user.phone}
                          />
                        </View> */}
                        <Reinput
                          identifier="phone"
                          label="phone"
                          style={styles.simpleInpt}
                          underlineActiveColor={inputColor}
                          labelActiveColor={inputColor}
                          value={inputFields.phone || (user && user.phone)}
                          onChangeText={(e) => this.handleChange("phone", e)}
                        />
                        <Reinput
                          label="Street Name"
                          identifier="street_name"
                          style={styles.simpleInpt}
                          underlineActiveColor={inputColor}
                          labelActiveColor={inputColor}
                          value={
                            inputFields.street || (user && user.street_name)
                          }
                          onChangeText={(e) => this.handleChange("street", e)}
                        />
                        {/* <View style={styles.inputFieldSec}>
                          <Text style={styles.label}>City</Text>
                          <TextfieldNoPlaceholder
                            label="City"
                            type={INPUT_TYPES.OPTIONAL}
                            style={styles.simpleInpt}
                            identifier="city"
                            blurOnSubmit={false}
                            //rightIcon={Images.ic_pass}
                            value={user && user.city}
                          />
                        </View> */}
                        <Reinput
                          label="Zip"
                          defaultValue={user && user.zipcode}
                          identifier="zip"
                          style={styles.simpleInpt}
                          underlineActiveColor={inputColor}
                          labelActiveColor={inputColor}
                          value={inputFields.zip || (user && user.zip)}
                          onChangeText={(e) => this.handleChange("zip", e)}
                        />
                      </FormHandler>
                    </View>

                    <View style={styles.submitBtn}>
                      <AppTextButton
                        title="Save"
                        onPress={this.cbOnUpdateProfileRequest}
                        style={styles.btnStyle}
                      />
                    </View>
                  </View>
                </ScrollView>
              )}
              {activeTab == "Settings" && (
                <View style={styles.settingsSec}>
                  <TextFieldPlaceholder
                    label="Licence"
                    type={INPUT_TYPES.OPTIONAL}
                    identifier="Licence"
                    editable={false}
                    value={user && user.licence}
                  />
                  <View style={styles.logoutSec}>
                    <TouchableOpacity onPress={() => this.onLogout(setLogin)}>
                      <View style={styles.logoutSecBtn}>
                        <Image
                          style={styles.logoutIcon}
                          source={Images.m_logout_white}
                        />
                        <Text style={styles.logoutTxt}>Logout</Text>
                      </View>
                    </TouchableOpacity>
                    {/* <AppTextButton title="Logout" style={styles.btnStyle} /> */}
                  </View>
                </View>
              )}
            </>
          );
        }}
      </LoginContext.Consumer>
    );
  }
}

const actions = { request, success, generalUpdate };
const mapStateToProps = ({ user }) => ({ user: user.data[0] });

export default connect(mapStateToProps, actions)(WithKeyboardListener(Profile));
