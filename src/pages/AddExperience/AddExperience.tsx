"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
  title: string;
  company: string;
  span: string;
  location: string;
  file: FileList;
  link: string;
}

const AddExperienceContainer: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("company", data.company);
      formData.append("span", data.span);
      formData.append("location", data.location);
      formData.append("link", data.link);
      if (data.file && data.file[0]) {
        formData.append("image", data.file[0]);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ENDPOINT_PORTFOLIO}/experiences`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create experience");
      }

      toast.success("Experience created successfully!");
      reset();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Error creating experience");
    }
  };

  return (
    <div className='min-h-[80dvh] p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md max-w-2xl mx-auto my-20'>
      <h1 className='text-2xl font-bold mb-4'>Create Experience</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label htmlFor='title' className='block text-sm font-medium'>
            Title
          </label>
          <input
            id='title'
            type='text'
            className={`w-full p-2 mt-1 border rounded-md dark:bg-gray-700 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className='text-red-500 text-sm mt-1'>{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor='company' className='block text-sm font-medium'>
            Company
          </label>
          <input
            id='company'
            type='text'
            className={`w-full p-2 mt-1 border rounded-md dark:bg-gray-700 ${
              errors.company ? "border-red-500" : "border-gray-300"
            }`}
            {...register("company", { required: "Company is required" })}
          />
          {errors.company && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.company.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor='span' className='block text-sm font-medium'>
            Span
          </label>
          <input
            id='span'
            type='text'
            className={`w-full p-2 mt-1 border rounded-md dark:bg-gray-700 ${
              errors.span ? "border-red-500" : "border-gray-300"
            }`}
            {...register("span", { required: "Span is required" })}
          />
          {errors.span && (
            <p className='text-red-500 text-sm mt-1'>{errors.span.message}</p>
          )}
        </div>

        <div>
          <label htmlFor='location' className='block text-sm font-medium'>
            Location
          </label>
          <input
            id='location'
            type='text'
            className={`w-full p-2 mt-1 border rounded-md dark:bg-gray-700 ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.location.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor='link' className='block text-sm font-medium'>
            Link
          </label>
          <input
            id='link'
            type='text'
            className={`w-full p-2 mt-1 border rounded-md dark:bg-gray-700 ${
              errors.link ? "border-red-500" : "border-gray-300"
            }`}
            {...register("link", { required: "Link is required" })}
          />
          {errors.link && (
            <p className='text-red-500 text-sm mt-1'>{errors.link.message}</p>
          )}
        </div>

        <div>
          <label htmlFor='file' className='block text-sm font-medium'>
            Upload Image
          </label>
          <input
            id='file'
            type='file'
            className='w-full p-2 mt-1 border rounded-md dark:bg-gray-700'
            {...register("file")}
          />
        </div>

        <button
          name='submit'
          type='submit'
          className='w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-800'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddExperienceContainer;
