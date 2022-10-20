import { StyleSheet, Dimensions } from "react-native";
import { Colors, Metrics, AppStyles } from "../../theme";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.primary.white,
    // paddingTop: Metrics.baseMargin,
    justifyContent: "center",
    // alignItems: "center",
  },
  image: {
    // flex: 1,
    height: "100%",
    width: "100%",
    // justifyContent: "center",
    // resizeMode: 'cover'
  },
  topError: {
    backgroundColor: Colors.primary.errorBg,
    borderBottomWidth: 1,
    borderColor: Colors.gray,
    borderColor: Colors.pink,
    paddingHorizontal: Metrics.baseMargin,
    color: Colors.errorColor,
  },

  topNav: {
    borderBottomWidth: 1,
    borderColor: Colors.gray,
  },
  logoSec: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: Metrics.xxDoubleBaseMargin,
  },
  imgSec: {
    // height: Metrics.screenHeight / 2 + Metrics.xSmallMargin,
    // width: "75%",
    // height: 100,
    width: Metrics.heightRatio(150),
    height: Metrics.heightRatio(180),
  },
  buttonSec: {
    // backgroundColor: Colors.primary.white,
    // // position: "relative",
    // // top: -40,
    // borderTopLeftRadius: Metrics.radius.xLarge,
    // borderTopRightRadius: Metrics.radius.xLarge,
    // paddingHorizontal: Metrics.baseMargin,
    // paddingTop: Metrics.baseMargin,
    // paddingVertical: Metrics.smallMargin,
  },
  selectedTab: {
    ...AppStyles.gbBold(20, Colors.primary.black),
  },
  secondTab: {
    ...AppStyles.gbRe(20, Colors.lightGray),
    marginLeft: Metrics.xDoubleBaseMargin,
  },
  title: {
    color: Colors.primary.white,
  },
  button1: {
    width: Metrics.screenWidth / 3,
    borderRadius: Metrics.radius.large,
  },
  icons: {
    fontSize: 15,
  },
  inputSec: {
    alignItems: "center",
  },
  buttonSec1: {
    alignItems: "center",
    marginTop: Metrics.doubleBaseMargin,
  },
  buttonSec2: {
    marginLeft: Metrics.doubleBaseMargin,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainter: {
    width: Dimensions.get("window").width, //for full screen
    height: "100%" //for full screen
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 10
  },
  text: {
    ...AppStyles.gbLight(12, Colors.secondary.mixRed),
    marginLeft: Metrics.baseMargin,
    marginTop: Metrics.baseMargin,
  },
  overlay: {
    backgroundColor: "rgba(255,255,255,.5)",
    // height: viewportHeight,
    height: "100%",
    paddingTop: Metrics.xxxDoubleBaseMargin,
    paddingBottom: Metrics.xxxDoubleBaseMargin,
  },
  submitBtn: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: Metrics.xxDoubleBaseMargin + Metrics.baseMargin,
    // marginTop: 30,
  },
  btnStyle: {
    width: Metrics.screenWidth / 3,
    backgroundColor: Colors.secondary.btnColor,
    color: Colors.primary.white,
    borderRadius: Metrics.xxDoubleBaseMargin,
    width: "100%",
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
  fbButton: {
    width: Metrics.screenWidth / 3,
    backgroundColor: Colors.secondary.fbBtn,
    borderRadius: Metrics.xxDoubleBaseMargin,
    color: Colors.primary.white,
    width: "100%",
    fontWeight: "700",
  },
  txtSec: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Metrics.baseMargin,
  },
  separatorTxt: {
    ...AppStyles.gbLight(16, Colors.primary.black),
    fontWeight: "700",
  },
});

export default styles;
