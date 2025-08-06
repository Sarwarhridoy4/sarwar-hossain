// app/projects/page.tsx
import EachProject from "@/components/EachProject";
// import ""

export interface Image {
  public_id: string;
  url: string;
  _id: string;
}

type Project = {
  id: string;
  projectName: string;
  slogan: string;
  LiveLink: string;
  gitHubLink: string;
  images: Image[];
};

const getProjects = async (): Promise<Project[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT_PORTFOLIO}/projects`,
      {
        cache: "force-cache", // Ensure SSR fresh data
      }
    );
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (error) {
    console.error("SSR fetch error:", error);
    return [];
  }
};

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <div className='w-5/6 mx-auto m-8'>
      <h2 className='text-center my-4 text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500'>
        Projects
      </h2>
      <div className='my-8'>
        <div className='w-11/12 mx-auto flex items-center justify-center flex-col md:flex-row gap-5 flex-wrap'>
          {projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            projects.map((project, i) => (
              <EachProject key={i} project={project} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
