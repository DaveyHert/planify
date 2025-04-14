import "./ProjectList.css";
import ProjectCard from "./ProjectCard";

function ProjectList({ projects }) {
  if (projects.length < 1) {
    return <p className='page-title'>No projects yet!</p>;
  }
  return (
    <div className='project-list'>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectList;
