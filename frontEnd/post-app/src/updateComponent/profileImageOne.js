import React, { useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';

const ProfileImageEditor = ({ profileImage }) => {
  const editorRef = useRef(null);

  const handleSave = () => {
    const canvas = editorRef.current.getImage();
    const blob = canvas.toBlob();
    // Upload the blob to the server
  };

  return (
    <div>
      <AvatarEditor
        ref={editorRef}
        image={profileImage}
        width={250}
        height={250}
        border={50}
        borderRadius={125}
        color={[255, 255, 255, 0.6]} // RGBA
        scale={1.2}
        rotate={0}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ProfileImageEditor;
