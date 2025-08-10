import React from 'react'
import './styles/Photo.css'
import { DownloadOutlined, Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import axios from 'axios'
const Photo = ({ title = 'title', image, imageId, onPhotoDeleted }) => {
    const exportPhoto = async () => {
        console.log("Yup")
        try {
            const response = await axios.get(`http://localhost:8080/api/download/${imageId}`, {
                responseType: 'blob',
            });

            // 1. Get the Content-Type from the response headers
            const contentType = response.headers['content-type'];

            // 2. Create the Blob, specifying its type
            const blob = new Blob([response.data], { type: contentType });


            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;

            const contentDisposition = response.headers['content-disposition'];
            let filename = 'download'; // Fallback filename
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                if (filenameMatch.length === 2) {
                    filename = filenameMatch[1];
                }
            }
            link.setAttribute('download', filename);

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log(`Error exporting the photo.${error}`)
        }
    }

    const deletePhoto = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/photoz/${imageId}`)
            console.log("Photo deleted successfully");
            onPhotoDeleted();
        }catch (error){
            console.log('Error deleting the photo', error);
        }
    }
    return (
        <div
            className='photo'
            style={{ backgroundImage: `url(${image})` }}>
            <div className='photo__front'>
                <h4>{title.length > 15 ? title.slice(0, 13) + '...' : title}</h4>
                <div className='image__options'>
                    <IconButton onClick={deletePhoto} className='iconButton'>
                        <Delete />
                    </IconButton>
                    <IconButton onClick={exportPhoto} className='iconButton'>
                        <DownloadOutlined />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Photo
