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
  USER,
  SET_HISTORY,
  ADD_HISTORY,
  DUMP,
} from "../../../actions/ActionTypes";
import constant from "../../../constants";
import utility from "../../../utility";
import { push, pop } from "../../../services/NavigationService";
import { connect } from "react-redux";
import { request, generalUpdate } from "../../../actions/ServiceAction";
import { INPUT_TYPES } from "../../../reuseableComponents/FormHandler/Constants";
import HttpServiceManager from "../../../services/HttpServiceManager";
import { NavigationContext } from "@react-navigation/native";
import { WithKeyboardListener } from "../../../HOC";
import {
  Header,
  AppTextButton,
  Avatar,
  FormHandler,
  TextFieldPlaceholder,
} from "../../../reuseableComponents";
import styles from "./styles";
import { Images, Metrics, Colors, AppStyles } from "../../../theme";

class LocationList extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    const { route } = this.props;
    const locations = route.params.locations;
    this.setState({ list: locations });
  }

  onSubmit = (item) => {
    const { user } = this.props;

    let payload = {
      token: "U0FTQUlORk9URUNILUhBUkRUT0ZJTkRNQVBT",
      email: user && user[0] && user[0].Email,
      location_id: item.Id,
    };

    this.props.request(
      constant.addHistory,
      "post",
      payload,
      DUMP,
      true,
      () =>
        push("locationDetail", {
          detail: item,
        }),
      () => {}
    );
  };

  render() {
    const { user } = this.props;
    const { list } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.contentSec}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {list.length ? (
            list.map((item) => {
              return (
                <TouchableOpacity
                  style={styles.historyItemSec}
                  onPress={() => this.onSubmit(item)}
                >
                  <Text style={styles.historyItemTitle}>{item.Apartment}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: Metrics.smallMargin,
                    }}
                  >
                    <Image
                      source={Images.m_location}
                      style={{
                        width: Metrics.heightRatio(22),
                        height: Metrics.heightRatio(22),
                      }}
                    />
                    <Text style={styles.historyItemDesc}>
                      {item.StreetAddress}, {item.City}, {item.State}{" "}
                      {item.ZipCode}
                      {item.Country}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text>"No Location Found"</Text>
          )}
        </ScrollView>
      </View>
    );
  }
}

const actions = { request, generalUpdate };
const mapStateToProps = ({ user }) => ({
  user: user.data,
});
export default connect(mapStateToProps, actions)(LocationList);
