import { StyleSheet } from "react-native";
import { Colors, AppStyles, Metrics } from "../../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    marginBottom: 0,
    paddingBottom: 0,
  },
  tabsSection: {
    display: "flex",
    flexDirection: "row",
  },
  tabBtnSec: {
    flex: 1,
  },
  tabButton: {
    width: "100%",
    textAlign: "center",
    fontSize: 18,
  },
  activeTab: {
    backgroundColor: Colors.secondary.btnColor,
    color: Colors.primary.white,
  },
  notActiveTab: {
    backgroundColor: Colors.cGray,
    color: Colors.primary.black,
  },
  topNav: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "#fff",
  },
  formStyle: {
    alignItems: "center",
  },
  titleIcon: {
    fontSize: 38,
    color: "#f39B89",
  },
  titleWithIcon: {
    flexDirection: "row",
    marginRight: 20,
    marginBottom: 40,
  },
  topHeaderText: {
    fontSize: 16,
  },
  headerTitleSec: {
    flex: 1,
    alignItems: "center",
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    opacity: 0.75,
    position: "absolute",
    zIndex: 100,
    width: "100%",
    height: "100%",
  },
  dropDown: {
    width: 300,
    borderRadius: 40,
    backgroundColor: "#eee",
    borderColor: "#eee",
    paddingHorizontal: 20,
  },
  imgSec: {
    height: 200,
    width: "100%",
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Metrics.doubleBaseMargin,
    marginTop: Metrics.doubleBaseMargin,
  },
  buttonSec: {
    backgroundColor: "#fff",
    position: "relative",
    // top: -20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 15,
    paddingTop: Metrics.xxxDoubleBaseMargin,
    paddingBottom: 20,
    height: "100%",
  },
  textSec: {
    ...AppStyles.gbLight(20, Colors.primary.black),
    marginLeft: 60,
    marginBottom: 30,
  },
  btnStyle: {
    width: Metrics.screenWidth / 2,
    backgroundColor: Colors.secondary.btnColor,
    color: Colors.primary.white,
    borderRadius: Metrics.xxDoubleBaseMargin,
    fontWeight: "700",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  button1: {
    width: 200,
    borderRadius: 20,
  },

  btnText: {
    flex: 1,
    color: "#777",
  },
  btnIcon: {
    marginTop: 2,
    color: "#777",
  },
  input: {
    width: 300,
    borderRadius: 20,
    backgroundColor: "#eee",
    borderColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  icons: {
    fontSize: 15,
  },
  // historyItemSec: {
  //   backgroundColor: Colors.secondary.pink,
  //   marginBottom: Metrics.baseMargin,
  //   borderRadius: Metrics.doubleBaseMargin,
  //   padding: Metrics.baseMargin,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   shadowOpacity: 0.22,
  //   shadowRadius: 2.22,

  //   elevation: 3,
  // },
  // historyItemDesc: {
  //   // color: Colors.primary.white
  // },
  inputSec: {
    marginBottom: 20,
    alignItems: "center",
  },
  buttonSec1: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  buttonSec2: {
    alignItems: "center",
    // color: '#000000',
  },
  settingsSec: {
    backgroundColor: Colors.primary.white,
    height: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
    alignSelf: "center",
  },
  logoutSec: {
    flex: 1,
  },
  logoutSecBtn: {
    backgroundColor: Colors.secondary.blueish,
    // width: 200,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutTxt: {
    // flex:2,
    marginLeft: 10,
    fontSize: 18,
    color: Colors.primary.white,
  },
  logoutIcon: {
    // flex:1,
    resizeMode: "contain",
  },
  simpleInpt: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    // borderBottomWidth: 1,
    // borderBottomColor: "#eee",
    borderRadius: 0,
    width: "80%",
  },
  inputFieldSec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    flex: 1,
    justifyContent: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    height: 50,
  },
  label: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.xGray,
    flex: 1,
    justifyContent: "flex-start",
  },
  profilePicSec: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  profilePic: {
    borderWidth: 3,
    borderColor: Colors.secondary.btnColor,
    borderRadius: 40,
    width: 80,
    height: 80,
  },
});

export default styles;
