import React, { useEffect, useState } from 'react'
import './styles/AppBody.css'
import Photos from './Photos'
import PhotoForm from './PhotoForm'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE;

const AppBody = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPhotos = async () => {
        const url = `${API_BASE}api/photoz`;
        // console.log(url);
        try {
            const response = await axios.get(url);

            setPhotos(response.data);
            setLoading(false);
        } catch (error) {
            console.log(`Error fetching images...${error}`)
            setError("Falied to load photos.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    return (
        <div className='appBody flex flex-col'>
            <PhotoForm onPhotoUploaded={fetchPhotos}/>
            <div className="px-8 py-4">
                <h3 className='font-bold'>Photos</h3>
                <Photos loading={loading} photos={photos} error={error} onPhotoDeleted={fetchPhotos}/>
            </div>
        </div>
    )
}

export default AppBody
