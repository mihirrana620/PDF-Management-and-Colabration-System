import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { shallowEqual } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'


import { Worker } from '@react-pdf-viewer/core';
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';


// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';




const FileComponent = () => {
    
    const { fileId } = useParams();
    const navigate = useNavigate();


    const { currentFile, isAuthenticated } = useSelector((state) => ({
        currentFile: state.filefolders.userFiles.find((file) => file.docId === fileId),
        isAuthenticated: state.auth.isAuthenticated
    }), shallowEqual);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [])

    const downloadFile = () => {
        const element = document.createElement("a");
        element.setAttribute("href", currentFile.data.url);
        element.setAttribute("download", currentFile.data.name);
        element.setAttribute("target", "_blank")
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }



    return (
        <div>
            <Header fileName={currentFile.data.name} />

            <div className='position-fixed w-100 h-100 bg-dark  text-white left-0 top-0'>
                <div className='d-flex justify-content-between align-items-center py-4 px-5 mt-4'>

                    <p title='currentFile.data.name' className='my-0 fw-bold'>
                        {currentFile.data.name.length > 40 ?
                            currentFile.data.name.slice(0, 40) + "... ." + currentFile.data.extension :
                            currentFile.data.name
                        }</p>
                    <div className='d-flex align-items-center me-5 '>
                        <button className='btn btn-sm btn-outline-light me-2' onClick={() => navigate(-1)}>
                            <FontAwesomeIcon icon={faArrowLeftLong} /> Go Back
                        </button>
                        <button className='btn btn-sm btn-primary' onClick={() => downloadFile()}>Download</button>
                    </div>

                </div>


                <div className=' mt-4' style={{ height: "600px", width: "1000px", margin: "auto" }}>
                    {
                        currentFile.data.extension.includes("png") ||
                            currentFile.data.extension.includes("jpg") ||
                            currentFile.data.extension.includes("jpeg") ||
                            currentFile.data.extension.includes("gif") ? (
                            <img
                                src={currentFile.data.url}
                                alt={currentFile.data.name}
                                className='w-100 h-100 img-fluid'
                            ></img>
                        ) :
                            (
                                // <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                                //     <p className='text-center'>
                                //         File type not supported. Please Download the file to view it.
                                //     </p>
                                // </div>



                        


                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                    <div
                                        style={{
                                            border: '1px solid rgba(0, 0, 0, 0.3)',
                                            height: '600px',
                                            marginTop: '10px',
                                            borderColor:'red',
                                            borderWidth:'3px'
                                        }}

                                    >
                                        <Viewer fileUrl={currentFile.data.url} />
                                    </div>


                                </Worker>
                            )

                    }
                </div>
            </div>



        </div>
    )
}
export default FileComponent