"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ProjectData {
  projectName: string;
  slogan: string;
  LiveLink: string;
  gitHubLink: string;
  projectDescription: string;
  images: File[];
}

const AddProject: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProjectData>();

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setValue("images", acceptedFiles);
      },
      accept: {
        "image/*": ["image/jpeg", "image/png", "image/gif"],
      },
      multiple: true,
    });

  const onSubmit = async (data: ProjectData) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("projectName", data.projectName);
      formData.append("slogan", data.slogan);
      formData.append("LiveLink", data.LiveLink);
      formData.append("gitHubLink", data.gitHubLink);
      formData.append("projectDescription", data.projectDescription);
      data.images.forEach((image) => formData.append("images", image));

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_PORTFOLIO}/upload-project`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        toast.success("Project upload Success!");
        router.push("/projects");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error((error as { message: string }).message);
    }

    reset();
  };

  return (
    <div className='backdrop-blur-2xl bg-transparent py-10'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-md mx-auto p-6 bg-gray-800 rounded shadow-md'
      >
        <div className='mb-6'>
          <label
            htmlFor='projectName'
            className='text-white text-sm font-medium mb-2 block'
          >
            Project Name
          </label>
          <Controller
            name='projectName'
            control={control}
            defaultValue=''
            rules={{ required: "Project Name is required" }}
            render={({ field, fieldState }) => (
              <input
                {...field}
                type='text'
                className={`w-full px-4 py-2 rounded border ${
                  fieldState.invalid ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:border-blue-500 bg-gray-900 text-white`}
              />
            )}
          />
          <p className='text-red-500 text-xs mt-1'>
            {errors.projectName?.message}
          </p>
        </div>

        <div className='mb-6'>
          <label
            htmlFor='slogan'
            className='text-white text-sm font-medium mb-2 block'
          >
            Slogan
          </label>
          <Controller
            name='slogan'
            control={control}
            defaultValue=''
            rules={{ required: "Slogan is required" }}
            render={({ field, fieldState }) => (
              <input
                {...field}
                type='text'
                className={`w-full px-4 py-2 rounded border ${
                  fieldState.invalid ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:border-blue-500 bg-gray-900 text-white`}
              />
            )}
          />
          <p className='text-red-500 text-xs mt-1'>{errors.slogan?.message}</p>
        </div>

        <div className='mb-6'>
          <label
            htmlFor='LiveLink'
            className='text-white text-sm font-medium mb-2 block'
          >
            Live Link
          </label>
          <Controller
            name='LiveLink'
            control={control}
            defaultValue=''
            rules={{ required: "Live Link is required" }}
            render={({ field, fieldState }) => (
              <input
                {...field}
                type='text'
                className={`w-full px-4 py-2 rounded border ${
                  fieldState.invalid ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:border-blue-500 bg-gray-900 text-white`}
              />
            )}
          />
          <p className='text-red-500 text-xs mt-1'>
            {errors.LiveLink?.message}
          </p>
        </div>

        <div className='mb-6'>
          <label
            htmlFor='gitHubLink'
            className='text-white text-sm font-medium mb-2 block'
          >
            GitHub Link
          </label>
          <Controller
            name='gitHubLink'
            control={control}
            defaultValue=''
            rules={{ required: "GitHub Link is required" }}
            render={({ field, fieldState }) => (
              <input
                {...field}
                type='text'
                className={`w-full px-4 py-2 rounded border ${
                  fieldState.invalid ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:border-blue-500 bg-gray-900 text-white`}
              />
            )}
          />
          <p className='text-red-500 text-xs mt-1'>
            {errors.gitHubLink?.message}
          </p>
        </div>

        <div className='mb-6'>
          <label
            htmlFor='projectDescription'
            className='text-white text-sm font-medium mb-2 block'
          >
            Project Description
          </label>
          <Controller
            name='projectDescription'
            control={control}
            defaultValue=''
            rules={{ required: "Project Description is required" }}
            render={({ field, fieldState }) => (
              <textarea
                {...field}
                rows={4}
                className={`w-full px-4 py-2 rounded border ${
                  fieldState.invalid ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:border-blue-500 bg-gray-900 text-white`}
              />
            )}
          />
          <p className='text-red-500 text-xs mt-1'>
            {errors.projectDescription?.message}
          </p>
        </div>

        {/* Multiple Image Input using react-dropzone */}
        <div className='mb-6'>
          <label
            htmlFor='images'
            className='text-white text-sm font-medium mb-2 block'
          >
            Images
          </label>
          <div
            {...getRootProps()}
            className={`w-full px-4 py-2 rounded border ${
              isDragActive ? "border-blue-500" : "border-gray-700"
            } focus:outline-none focus:border-blue-500 bg-gray-900 text-white`}
          >
            <input {...getInputProps()} />
            {acceptedFiles.length > 0 ? (
              <ul className='mt-2'>
                {acceptedFiles.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            ) : (
              <div className='flex items-center justify-center'>
                <svg
                  width='64px'
                  height='64px'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  stroke='#55d9e2'
                >
                  <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                  <g
                    id='SVGRepo_tracerCarrier'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></g>
                  <g id='SVGRepo_iconCarrier'>
                    {" "}
                    <path
                      d='M7 11C8.10457 11 9 10.1046 9 9C9 7.89543 8.10457 7 7 7C5.89543 7 5 7.89543 5 9C5 10.1046 5.89543 11 7 11Z'
                      stroke='#43c3f9'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>{" "}
                    <path
                      d='M5.56055 21C11.1305 11.1 15.7605 9.35991 21.0005 15.7899'
                      stroke='#43c3f9'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>{" "}
                    <path
                      d='M12.28 3H5C3.93913 3 2.92172 3.42136 2.17157 4.17151C1.42142 4.92165 1 5.93913 1 7V17C1 18.0609 1.42142 19.0782 2.17157 19.8284C2.92172 20.5785 3.93913 21 5 21H17C18.0609 21 19.0783 20.5785 19.8284 19.8284C20.5786 19.0782 21 18.0609 21 17V12'
                      stroke='#43c3f9'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>{" "}
                    <path
                      d='M18.75 8.82996V0.829956'
                      stroke='#43c3f9'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>{" "}
                    <path
                      d='M15.5508 4.02996L18.7508 0.829956L21.9508 4.02996'
                      stroke='#43c3f9'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>{" "}
                  </g>
                </svg>
              </div>
            )}
          </div>
        </div>

        <button
          name='submit'
          type='submit'
          disabled={loading}
          className='w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none'
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
export default AddProject;
