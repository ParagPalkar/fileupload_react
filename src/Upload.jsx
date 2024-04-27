import React, { useState } from 'react'
import axios from 'axios'

const Upload = () => {

    const [file, setFile] = useState(null);
    const [status, setStatus] = useState(null);
    const [uploadMsg, setUploadMsg] = useState('');

    const handleChange = (event) => {
        setFile(event.target.files[0]);
        setStatus(null);
        setUploadMsg('');
    }

    const handleSubmit = async (event) => {
        if (file) {
        
            event.preventDefault();
            setUploadMsg('Uploading..'); //Uploading.. as soon as button clicked

            const fd = new FormData();
            const URL = 'https://httpbin.org/post';
            fd.append('file', file);
            fd.append('fileName', file.name);

            axios.post(URL, fd)
                .then((res) => {
                    console.log(res.data);
                    setStatus(res.status);
                    setUploadMsg('File uploaded successfully!'); //if response is fullfilled show the msg on display
                })
                .catch((err) => {
                    console.error(err);
                })
        }
        else {
            setUploadMsg('Please Select a File'); // if no file is selected then ask to select a file 
            return;
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <h2>React File Upload</h2>
                <input className='inp' type='file' onChange={handleChange} />
                <button type="submit" className="btn btn-outline-primary">Submit</button>

            </form>
                {file &&
                    <>
                        <div className="filedetails">
                        <p>Selected File Name : {file.name}</p>
                        <p>Size : {file.size} KB</p>
                        </div>
                    </>
                }


            {
                (file) &&
                <p>{uploadMsg}</p>
                
            }
            {
                (status) &&
                <p>Status Code :  {status}</p>
            }

        </>
    )
}

export default Upload