import React, { useState, useCallback } from 'react';
import Dropzone from 'react-dropzone';

const ProfileImageUpload = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleDrop = useCallback(acceptedFiles => {
    setProfileImage(acceptedFiles[0]);
  }, []);

  return (
    <div>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <img src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' height="200"/>
            {/* <p style={{color:"black"}}>Drag and drop a profile image here or click to select file</p> */}
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default ProfileImageUpload;
