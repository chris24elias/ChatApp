import { action, thunk, Thunk, Action } from "easy-peasy";
// import { ApiService } from "../../Store";
// import { setLoginCredentials, getLoginCredentials, resetLoginCredentials } from "../../Services/Keychain";
import { STATUS, QR_API_KEY, DEVICE_ID, endpointURL } from "../../Constants";
import { APP_STATE } from "../../Constants/index";
import baseModel, { BaseModel } from "./Base";
import AsyncStorage from "@react-native-community/async-storage";
import { string } from "prop-types";

// import { showErrorToast, showLoading } from "../../Lib/Toast";

export interface LoginModel {}

const loginModel: LoginModel = {};

export default loginModel;
