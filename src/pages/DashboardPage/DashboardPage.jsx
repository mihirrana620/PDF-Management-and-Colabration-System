import React, { useState } from 'react'
import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Navbar from '../../components/DashboardComponents/Navbar/Navbar'
import SubBar from '../../components/DashboardComponents/SubBar/SubBar'
import HomeComponent from '../../components/HomeComponent/HomeComponent'
import CreateFolder from '../../components/DashboardComponents/CreateFolder/CreateFolder'
import { getFiles, getFolders } from '../../redux/actionCreators/fileFoldersActionCreator'
import FolderComponent from '../../components/DashboardComponents/FolderComponent/FolderComponent'
import UploadFile from '../../components/DashboardComponents/UploadFile/UploadFile'
import FileComponent from '../../components/DashboardComponents/FileComponent/FileComponent'
import { useLocation } from 'react-router-dom'

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [isCreateFolderModelOpen, setIsCreateFolderModelOpen] = useState(false);
  const [isFileUploadModelOpen,setIsFileUploadModelOpen] = useState(false);

  const [showsubBar,SetShowSubar] = useState(true);
  const { isLoggedIn, isLoading, userId } = useSelector((state) => ({
    isLoggedIn: state.auth.isAuthenticated,
    isLoading: state.filefolders.isLoading,
    userId: state.auth.user.uid,
  }), shallowEqual);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (isLoading && userId) {
      dispatch(getFolders(userId));
      dispatch(getFiles(userId));
    }
  }, [isLoading, userId, dispatch])

  useEffect(()=>{
    if(pathname.includes("/file/")){
      SetShowSubar(false);
    }else{
      SetShowSubar(true);
    }
  },[pathname])
  return (
    <>

      {
        isCreateFolderModelOpen &&
        (<CreateFolder setIsCreateFolderModelOpen={setIsCreateFolderModelOpen} />)
      }

      {
        isFileUploadModelOpen &&
         <UploadFile setIsFileUploadModelOpen={setIsFileUploadModelOpen}/>
      }
      <Navbar />

      {showsubBar && (
         <SubBar setIsCreateFolderModelOpen={setIsCreateFolderModelOpen} setIsFileUploadModelOpen={setIsFileUploadModelOpen} />
      )}
   
     <Routes>
        <Route path="" element={<HomeComponent />}></Route>
        <Route path='folder/:folderId' element={<FolderComponent/>} />
        <Route path='file/:fileId' element={<FileComponent/>} />
      
      </Routes>

    </>
  )
}

export default DashboardPage