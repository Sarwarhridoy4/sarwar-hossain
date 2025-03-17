"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";

interface Image {
  public_id: string;
  url: string;
  _id: string;
}

interface Project {
  _id: string;
  projectName: string;
  slogan: string;
  LiveLink: string;
  gitHubLink: string;
  images: Image[];
}

const DeleteProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  console.log(selectedProjectId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProjectsUrl = `${process.env.NEXT_PUBLIC_ENDPOINT_PORTFOLIO}/projects`;

    axios
      .get(getProjectsUrl)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleDeleteClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async (selectedProjectId: string) => {
    if (!selectedProjectId) return;

    setLoading(true);
    setError(null);

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_ENDPOINT_PORTFOLIO}/delete-project/${selectedProjectId}`
      );
      toast.success("Project deleted successfully.");
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== selectedProjectId)
      );
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Error deleting project.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
      setIsDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
    setSelectedProjectId(null);
  };

  return (
    <div className='bg-gray-50 dark:bg-gray-900 text-white min-h-screen'>
      <div className='max-w-7xl mx-auto p-8'>
        <h1 className='text-3xl font-bold text-center mb-8 dark:text-slate-50 text-slate-900'>
          Delete Projects
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {projects.map((project, i) => (
            <div
              key={i + 0.225}
              className='bg-gray-800 p-6 rounded-lg shadow-lg dark:bg-gray-700'
            >
              <Image
                width={150}
                height={150}
                src={project.images[0]?.url || "/placeholder.png"}
                alt={project.projectName}
                className='w-full h-40 object-cover rounded mb-4'
              />
              <h3 className='text-lg font-semibold mb-2 dark:text-white'>
                {project.projectName}
              </h3>
              <p className='text-gray-400 mb-4 dark:text-gray-300'>
                {project.slogan}
              </p>
              <a
                href={project.LiveLink}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 hover:underline mb-2 block'
              >
                Live Link
              </a>
              <a
                href={project.gitHubLink}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 hover:underline mb-4 block'
              >
                GitHub Link
              </a>
              <button
                name="delete-project"
                className='w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800'
                onClick={() => handleDeleteClick(project?._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {isDialogOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white p-8 rounded-lg shadow-lg text-center dark:bg-gray-800'>
              <p className='text-gray-800 mb-4 dark:text-gray-200'>
                Are you sure you want to delete this project?
              </p>
              {error && (
                <p className='text-red-600 mb-4 text-sm dark:text-red-400'>
                  {error}
                </p>
              )}
              <div className='flex justify-center space-x-4'>
                <button
                  name="confirm-delete"
                  className='py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400 dark:bg-red-700 dark:hover:bg-red-800'
                  onClick={() => handleConfirmDelete(selectedProjectId!)}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Yes, Delete"}
                </button>
                <button
                  name="cancel-delete"
                  className='py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700'
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteProjectPage;
