import { Platform, Dimensions } from "react-native";
import DeviceInfo from "react-native-device-info";
export const isAndroid = Platform.OS === "android" ? true : false;
export const isIos = !isAndroid;
var moment = require("moment-timezone");
export const APP_STATE = {
    PUBLIC: "PUBLIC_LOGIN",
    PRIVATE: "MAIN_APP",
    AUTH: "CHECKING_LOGIN",
    UNKNOWN: "UNKNOWN",
};

export const STATUS = {
    SUCCESS: "SUCCESS",
    NOT_STARTED: "NOT_STARTED",
    FETCHING: "FETCHING",
    FAILED: "FAILED",
};

export const LOCALES = {
    ENGLISH: { id: 1, name: "en", label: "ENGLISH" },
    HINDI: { id: 2, name: "hi", label: "हिंदी" },
};

export const DEVICE_ID = DeviceInfo.getUniqueID();
export const deviceOSVersion = DeviceInfo.getSystemVersion();
export const deviceModel = DeviceInfo.getModel();
export const DEVICE_TIME_ZONE = moment(new Date())
    .tz(DeviceInfo.getTimezone())
    .format("Z");
export const DEVICE_LANGUAGE = DeviceInfo.getDeviceLocale();
export const DEVICE_GAME_VERSION = DeviceInfo.getVersion();
export const DEVICE_OS_VERSION = DeviceInfo.getSystemVersion();
export const DEVICE_MODEL = DeviceInfo.getModel();

export const endpointURL = "";

export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const SCREEN_WIDTH = Dimensions.get("window").width;
