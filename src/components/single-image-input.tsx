import React, { useState, useCallback, FC } from "react";
import { useDropzone } from "react-dropzone";
import { AiFillPicture } from "react-icons/ai";
import { Tooltip } from "./tooltip";
import { FaCircleInfo } from "react-icons/fa6";

interface Props {
  label: string;
  setImage: React.Dispatch<React.SetStateAction<Array<File> | undefined>>;
  containerClass?: string;
  prevValue?: string | null;
  alert?: string | null;
}
const SingleImageInput: FC<Props> = ({
  label,
  setImage,
  containerClass,
  prevValue,
  alert
}) => {
  const [preview, setPreview] = useState<any>(prevValue);
  //   handle drag and drop
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    setImage(acceptedFiles);
    const file = new FileReader();
    file.onload = function () {
      setPreview(file.result);
    };
    file.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <>
      <div className={`${containerClass}`}>
        <span className="flex gap-3">
          <p className="text-[#767676] fw-500 mb-2">{label}</p>
          {alert && (
            <Tooltip text={alert} position="top">
              <FaCircleInfo className="text-xl shrink-0 cursor-pointer -mt-3 text-[#fc819f]" />
            </Tooltip>
          )}
        </span>
        <div
          {...getRootProps()}
          className="w-full border bg-white dark:bg-darkColorLight border-gray-400 rounded-lg min-h-[120px] p-4 flex justify-between items-center"
        >
          <input {...getInputProps()} />
          {preview ? (
            ""
          ) : isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div className="flex items-center gap-x-4">
              <div className="w-12 h-12 rounded-[5px] bg-[#f7c8d46d] grid place-content-center">
                <AiFillPicture className="text-[#FC819F] text-xl" />
              </div>
              <p className="text-[#767676] fs-400">
                Drop files here or browse pictures to upload. Max 1MB
              </p>
            </div>
          )}
          {preview && (
            <img
              src={preview as string}
              alt="Upload preview"
              className="w-24 mx-auto"
              width={200}
              height={200}
            />
          )}
          <div>
            <div className="border border-[#D2D2D2] rounded-[4px] px-7 py-2 lg:px-12 cursor-pointer">
              <p>Browse</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleImageInput;
