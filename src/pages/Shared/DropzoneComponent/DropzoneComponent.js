import React, { useCallback, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from "react-icons/ai";
const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out'
};
 
const activeStyle = {
  borderColor: '#2196f3'
};
 
const acceptStyle = {
  borderColor: '#00e676'
};
 
const rejectStyle = {
  borderColor: '#ff1744'
};
 
function DropzoneComponent({files, setFiles}) {
    
    
  const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
    
  }, []);
 
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
  });
 
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);
 
  const thumbs = files.map(file => (
    <div key={file.name}>
      <h1 className='text-center '>{file.name}</h1>
    </div>
  ));
 
  // clean up
  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
   
  return (
    <section>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <div>Upload your photo</div>
        <AiOutlineCloudUpload className='text-4xl'></AiOutlineCloudUpload>
      </div>
      <aside>
        {thumbs}
      </aside>
    </section>
  )
}
 
export default DropzoneComponent;
