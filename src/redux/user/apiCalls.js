import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance";
import * as actions from "./user";

const apiUrl = process.env.REACT_APP_API_URL;

export const getUser = async (payload, dispatch) => {
    dispatch(actions.getUserStart());
    try {
        const { data } = await axiosInstance.get(apiUrl + "/user/" + payload);
        dispatch(actions.getUserSuccess(data.data));
        return true;
    } catch (error) {
        dispatch(actions.getUserFailure());
        return false;
    }
};

export const updateUser = async (payload, dispatch) => {
    dispatch(actions.updateUserStart());
    try {
        const url = process.env.REACT_APP_API_URL + "/user/" + payload.id;
        const { data } = await axiosInstance.put(url, payload);
        dispatch(actions.updateUserSuccess(data.data));
        toast.success(data.message);
        return true;
    } catch (error) {
        dispatch(actions.updateUserFailure());
        return false;
    }
};

export const likeSong = async (payload, dispatch) => {
    dispatch(actions.likeSongStart());
    try {
        const { data } = await axiosInstance.put(apiUrl + "/song/like", payload);
        dispatch(actions.likeSongSuccess(payload));
        toast.success(data.message);
        return true;
    } catch (error) {
        dispatch(actions.likeSongFailure());
        return false;
    }
};