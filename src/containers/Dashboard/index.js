import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Picker,
  TouchableWithoutFeedback,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedbackBase,
  FlatList,
} from "react-native";
import {
  LOCATION,
  DUMP,
  RECENT_SERVICES_LIST,
} from "../../actions/ActionTypes";
import constant from "../../constants";
import utility from "../../utility";
import { push, pop } from "../../services/NavigationService";
import { connect } from "react-redux";
import { request } from "../../actions/ServiceAction";
import { INPUT_TYPES } from "../../reuseableComponents/FormHandler/Constants";
import HttpServiceManager from "../../services/HttpServiceManager";
import { NavigationContext } from "@react-navigation/native";
import { WithKeyboardListener } from "../../HOC";
import {
  Header,
  AppTextButton,
  Avatar,
  FormHandler,
  TextFieldPlaceholder,
} from "../../reuseableComponents";
import styles from "./styles";
import { Images, Metrics, Colors, AppStyles } from "../../theme";

class Dashboard extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }

  onSubmit = () => {
    const { user } = this.props;
    const { title } = this.state;

    let val = this.textInput.getValue();

    let payload = {
      token: "U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT",
      email: user && user[0] && user[0].Email,
      keyword: val,
      start: "0",
      limit: "40",
    };

    this.props.request(
      constant.location,
      "post",
      payload,
      LOCATION,
      true,
      (success) => this.onLoginSuccess(success),
      this.onLoginError
    );
  };
  onLoginSuccess = (success) => {
    console.log("success", success);
    push("locations", {
      locations: success.data,
    });
  };

  onLoginError = (error) => {
    if (error) {
      utility.showFlashMessage("Get Location Failed", "danger");
    }
  };

  render() {
    const { user, isKeyboardVisible, keyboardHeight } = this.props;

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
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.contentSec}>
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
                resizeMode="contain"
                source={Images.loginLogo}
              />
            </View>
            <View style={styles.buttonSec}>
              <View style={styles.buttonSec1}>
                <TextFieldPlaceholder
                  label="Street Address OR Apartment Name"
                  ref={(input) => (this.textInput = input)}
                  type={INPUT_TYPES.OPTIONAL}
                  identifier="address"
                  returnKeyType="done"
                  onSubmitEditing={this.onSubmit}
                  clearButtonMode="while-editing"
                  rightIcon={Images.icSearchCross}
                  onRightPress={() => this.textInput.onClearInput()}
                  style={{
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,
                    elevation: 4,
                    width: Metrics.screenWidth - Metrics.xDoubleBaseMargin,
                  }}
                />
                {/*<TextFieldPlaceholder
                    label="City Or Zipcode"
                    error="City Error"
                    type={INPUT_TYPES.OPTIONAL}
                    identifier="city"
                    blurOnSubmit={false}
                  />*/}
              </View>
            </View>
            <View style={styles.submitBtn}>
              <AppTextButton
                title="Search"
                style={styles.btnStyle}
                onPress={() => this.onSubmit()}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const actions = { request };
const mapStateToProps = ({ user }) => ({
  user: user.data,
});
export default connect(
  mapStateToProps,
  actions
)(WithKeyboardListener(Dashboard));
