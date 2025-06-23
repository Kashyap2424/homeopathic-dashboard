// React Imports
import React, { useCallback, useState } from "react";

// React Icons Imports
import { AiOutlineCloudUpload, AiOutlineDelete } from "react-icons/ai";

// React Dropzone Imports
import { useDropzone } from "react-dropzone";

const FileUploader = ({ register }) => {
  const [images, setImage] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const binaryStr = reader.result;

          const file2 = new File([binaryStr], file.name, { type: file.type });
          const base64String = btoa(
            new Uint8Array(binaryStr).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          const dataUrl = `data:${file2.type};base64,${base64String}`;
          setImage(dataUrl);

          // Pass the image to parent component using react hook form's register
          if (register) {
            register("image", { value: file2 });
          }
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [register]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveImage = () => {
    setImage(null);

    // Clear the image from parent component
    if (register) {
      register("image", { value: null });
    }
  };

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center p-12 border-2 border-gray-300 border-dashed rounded"
    >
      <input {...getInputProps()} />
      <AiOutlineCloudUpload className="mb-4 text-gray-500" size={48} />
      <p>Drag 'n' drop some files here, or click to select files</p>
      {images && (
        <div className="relative mt-8">
          <button
            type="button"
            className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 bg-cyan-500 hover:bg-cyan-600 rounded-lg"
            onClick={handleRemoveImage}
          >
            <AiOutlineDelete className="h-6 w-6 text-white" />
          </button>
          <img
            src={images}
            alt="Selected"
            className="mt-4 w-64 h-64 object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
