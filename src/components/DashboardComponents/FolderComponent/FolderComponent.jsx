
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import ShowItems from '../ShowItems/ShowItems';
const FolderComponent = () => {
  const { folderId } = useParams();
  const { currentFolderData, childFolders, childFiles } = useSelector(
    (state) => ({
      currentFolderData: state.filefolders.userFolders.find(
        (folder) => folder.docId === folderId
      ),
      childFolders: state.filefolders.userFolders.filter(
        (folder) => folder.data.parent === folderId
      ),
      childFiles: state.filefolders.userFiles.filter(
        (file) => file.data.parent === folderId
      ),
    }), shallowEqual);

  const uploadedFiles = childFiles && childFiles.filter((file) => file.data.data === null);

  return (

    <div>
      {
        childFolders.length > 0 || childFiles.length > 0 ? (
          <>
            {
              childFolders.length > 0 && (
                <ShowItems
                  title={"Created Folders"}
                  type={"folder"}
                  items={childFolders} />
              )
            }
            {
              uploadedFiles  &&  (
                <ShowItems
                  title={"Uploaded Files"}
                  type={"file"}
                  items={uploadedFiles} />

              )
            }
          </>
        ) : (
          <p className='text-center my-5'>
            Empty Folder
          </p>
        )
      }
    </div>
  )
}

export default FolderComponent