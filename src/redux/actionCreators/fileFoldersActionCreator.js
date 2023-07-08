import * as types from "../actionTypes/fileFolderActionTypes"
import fire from "../../config/firebase";
import { toast } from 'react-toastify';
//actions

const addFolder = (payload) => ({
    type: types.CREATE_FOLDER,
    payload,
});


const addFolders = (payload)=>({
    type:types.ADD_FOLDERS,
    payload,
})

const setLoading = (payload) =>({
    type:types.SET_LOADING,
    payload,
})

const setChangeFolder = (payload)=>({
    type:types.CHANGE_FOLDER,
    payload,
})


const addFiles = (payload) =>({
    type: types.ADD_FILES,
    payload,
})

const addFile = (payload) =>({
    type:types.CREATE_FILE,
    payload,
})
//action creators

export const createFolder = (data) => (dispatch) => {
    fire
      .firestore()
      .collection("folders")
      .add(data)
      .then(async (folder) => {
        const folderData = await (await folder.get()).data();
        const folderId = folder.id;
        dispatch(addFolder({ data: folderData  , docId: folderId }));
        toast.success("Folder created successfully!");
      });
  };


export const getFolders = (userId) => (dispatch) => {
    dispatch(setLoading(true))
    fire
        .firestore()
        .collection("folders")
        .where("userId", "==", userId)
        .get()
        .then(async (folders) => {
            const foldersData =await folders.docs.map((folder)=>({
                data: folder.data(),
                docId: folder.id,
            }));
            dispatch(setLoading(false));
            dispatch(addFolders(foldersData));
           
        })
}



export const changeFolder = (folderId) =>(dispatch)=>{
    dispatch(setChangeFolder(folderId));
}
export const uploadFile = (file, data, setSuccess) => (dispatch) => {
    const user = fire.auth().currentUser;
    const uploadFileRef = fire
      .storage()
      .ref()
      .child(`users/${user.uid}/${data.name}`);
  
    uploadFileRef.put(file).on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("uploading " + progress + "%");
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const fileUrl = await uploadFileRef.getDownloadURL();
        const fullData = { ...data, url: fileUrl };
        console.log(fullData);
        fire
          .firestore()
          .collection("files")
          .add(fullData)
          .then(async (file) => {
            const fileData = await (await file.get()).data();
            const fileId = file.id;
            dispatch(addFile({ data: fileData, docId: fileId }));
            toast.success("File Uploaded Successfully!");
            setSuccess(true);
          })
          .catch(() => {
            setSuccess(false);
          });
      }
    );
  };
 

export const getFiles = (userId) => (dispatch)=>{
    
    fire
        .firestore()
        .collection("files")
        .where("userId", "==", userId)
        .get()
        .then(async (files) => {
            const filesData =await files.docs.map((file)=>({
                data: file.data(),
                docId: file.id,
            }));
            dispatch(setLoading(false));
            dispatch(addFiles(filesData));
           
        })
}

export const createFile = (data) => (dispatch) =>{
   console.log(data,setSuccess);
}