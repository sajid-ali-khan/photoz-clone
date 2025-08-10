import React, { useState } from 'react'
import './styles/PhotoForm.css'
import { PhotoLibrary } from '@mui/icons-material'
import axios from 'axios';

const PhotoForm = ({onPhotoUploaded}) => {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  }
  const uploadFile = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file first.')
      return;
    }

    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);
      formData.append('title',fileName);

      const response = await axios.post(`${API_BASE}api/photoz`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onPhotoUploaded();
      setFileName('');
      setSelectedFile(null);
    } catch (error) {
      console.log(`Error while uploading the file, ${error}`);
    }
  }
  return (
    <div className='photoForm'>
      <h3 className='font-bold'>Upload your photo</h3>
      <form className='flex flex-col gap-4'>
        <div className='flex gap-2'>
          <label className='custom__file__upload'>
            <PhotoLibrary />
            {selectedFile ? fileName : 'Browse'}
            <input
              type='file'
              className='hidden'
              accept='image/*'
              onChange={handleFileChange} />
          </label>
          <div className='title__input'>
            <input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              type='text'
              placeholder='Photo Title' />
          </div>
        </div>

        <button onClick={uploadFile} className='block lg:hidden px-[20px] py-[10px] bg-black rounded-[999px] cursor-pointer' type='submit'>Upload</button>
      </form>
    </div>
  )
}

export default PhotoForm
