import axios from "axios";
import { decodeJwt } from "./decodeJWT";
import { logout } from "../redux/actions/user-actions";
import store from "../store";

const setupAxiosInterceptors = () => {
    axios.interceptors.request.use(function (config) {
        const { exp } = decodeJwt(localStorage['jwt']);
        if (Date.now() >= exp * 1000) {
            dispatch(logout());
            return Promise.reject("JWT has expired");
        } else {
            return config;
        }
    });
}

export default setupAxiosInterceptors;

const {dispatch} = store;
// setupAxiosInterceptors(()=>{
//   dispatch(logout())
// });
