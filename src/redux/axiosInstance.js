import axios from 'axios';
import { toast } from 'react-toastify';

let token = null;
const root = JSON.parse(window.localStorage.getItem('persist:root'));

if (root) {
    const auth = root.auth;
    const { user } = JSON.parse(auth);
    if (user) {
        token = user.token;
    }
}

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
        "x-auth-token": token ? token : "",
    },
});

axiosInstance.interceptors.request.use(
    (req) => {
        return Promise.resolve(req);
    },
    (err) => {
        if (
            err.response &&
            err.response.status >= 400 &&
            err.response.status < 500
        ) {
            toast.error(err.response.data.message);
        } else {
            console.log(err);
            toast.error("Something went wrong");
        }
        return Promise.reject(err);
    }
);

export default axiosInstance;