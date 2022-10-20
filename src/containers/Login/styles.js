import { StyleSheet, Dimensions } from "react-native";
import { Colors, Metrics, AppStyles } from "../../theme";
const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    // paddingTop: Metrics.baseMargin,
    justifyContent: "center",
    // alignItems: "center",
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
    width: Metrics.heightRatio(200),
    height: Metrics.heightRatio(250),
    // height: 100,
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

  input: {
    width: Metrics.screenWidth - Metrics.xDoubleBaseMargin * 3,
    borderRadius: Metrics.radius.xLarge,
    backgroundColor: Colors.gray,
    borderColor: Colors.gray,
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin,
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
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: Metrics.screenHeight,
    width: Metrics.screenWidth,
    // justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(255,255,255,.5)",
    height: viewportHeight,
    paddingTop: Metrics.xxxDoubleBaseMargin,
  },
  text: {
    ...AppStyles.gbBold(18, Colors.primary.theme),
    marginLeft: Metrics.baseMargin,
    // fontWeight: "700",
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
  googleBtn: {
    width: Metrics.screenWidth / 3,
    backgroundColor: Colors.secondary.lRed,
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
