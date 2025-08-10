import React, { useEffect, useState } from 'react'
import Photo from './Photo'
import './styles/Photos.css'
import axios from 'axios'

const Photos = ({loading, error, photos, onPhotoDeleted}) => {

    if (loading) {
        return <h2 className='loading'>Loading Photos...</h2>
    }

    if (error) {
        return <h2>{error}</h2>
    }

    if (photos.length === 0){
        return <h2>No photos found.</h2>
    }
    return (
        <div className='photos'>
            {
                photos.map((photo) => {
                    return <Photo
                    key={photo.id}
                        image={`data:${photo.contentType};base64,${photo.data}`}
                        title={photo.fileName}
                        photo={photo.id}
                        imageId={photo.id}
                        onPhotoDeleted={onPhotoDeleted}
                    />
                })
            }
        </div>
    )
}

export default Photos
