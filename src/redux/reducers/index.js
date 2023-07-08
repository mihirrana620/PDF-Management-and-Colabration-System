import authReducer from "./authReducer";
import fileFoldersReducer from "./fileFoldersReducer";
import {combineReducers} from "redux"

const rootreducer = combineReducers(
    {auth:authReducer,
    filefolders:fileFoldersReducer});

export default rootreducer