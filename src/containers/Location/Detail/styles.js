import { StyleSheet } from "react-native";
import { Colors, Metrics, AppStyles } from "../../../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentSec: {
    backgroundColor: Colors.primary.white,
    width: "100%",
    height: "100%",
    paddingTop: Metrics.baseMargin,

    paddingHorizontal: Metrics.baseMargin,
  },
  historyItemSec: {
    backgroundColor: Colors.secondary.pink,
    width: "100%",
    marginVertical: Metrics.baseMargin,
    borderRadius: Metrics.smallMargin,
    padding: Metrics.baseMargin,
  },
  historyItemTitle: {
    fontSize: 20,
    color: Colors.primary.white,
  },
  title: {
    ...AppStyles.gbBold(22, Colors.secondary.lOrange),
  },
  address: {
    ...AppStyles.gbRe(14, Colors.xGray),
    marginBottom: Metrics.xGray,
  },
  linkTxt: {
    fontSize: Metrics.baseMargin,
    color: Colors.secondary.linkColor,
    marginBottom: Metrics.xGray,
  },
  mgContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    // paddingHorizontal: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
  },
  mgHo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Metrics.smallMargin,
  },
  mgHorizontal: {
    marginLeft: Metrics.baseMargin,
  },
  mapImg: {
    width: Metrics.screenWidth - Metrics.doubleBaseMargin,
    height: Metrics.heightRatio(200),
  },
  historyItemDesc: {
    color: Colors.primary.white,
  },
  logoSec: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: Metrics.xxDoubleBaseMargin,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: Metrics.doubleBaseMargin,
  },
  btnStyle: {
    width: Metrics.screenWidth / 2,
    backgroundColor: Colors.secondary.btnColor,
    color: Colors.primary.white,
    borderRadius: Metrics.doubleBaseMargin,
    // width: "100%",
    fontWeight: "700",
  },
  submitBtn: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: Metrics.xxDoubleBaseMargin + Metrics.baseMargin,
    // marginTop: 30,
  },
  searchContainer: {
    alignItems: "center",
    marginTop: Metrics.xDoubleBaseMargin,
    marginBottom: Metrics.baseMargin,
  },
  itemContainer: {
    alignItems: "center",
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.doubleBaseMargin,
    borderRadius: Metrics.doubleBaseMargin,
    shadowColor: Colors.xGray,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  dText: {
    ...AppStyles.gbLight(10, Colors.primary.black),
  },
  itemText: {
    ...AppStyles.gbLight(10, Colors.primary.black),
  },
  myServices: {
    ...AppStyles.gbLight(10, Colors.primary.black),
  },
  columeStyle: {
    marginLeft: Metrics.xDoubleBaseMargin * 2,
    marginTop: Metrics.smallMargin,
  },
  serviceContainer: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.shadow,
    marginTop: Metrics.xDoubleBaseMargin * 4,
  },
  serText: {
    width: 40,
    textAlign: "center",
    ...AppStyles.gbLight(6, Colors.primary.black),
  },
  pickerStyle: {
    marginTop: Metrics.smallMargin,
    marginBottom: Metrics.baseMargin,
    paddingVertical: Metrics.baseMargin,
    paddingRight: Metrics.smallMargin,
    alignSelf: "center",
    marginRight: Metrics.smallMargin,
  },
  servicesStyle: {
    marginTop: Metrics.smallMargin,
    marginBottom: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.smallMargin + Metrics.xSmallMargin,
    borderRadius: 20,
    backgroundColor: Colors.primary.white,
    alignItems: "center",
    shadowColor: Colors.xGray,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginRight: Metrics.baseMargin,
    marginLeft: Metrics.smallMargin,
  },
});

export default styles;
