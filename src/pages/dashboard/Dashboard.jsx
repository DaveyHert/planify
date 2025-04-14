import { useMemo, useState } from "react";
import { useCollection } from "../../hooks/useCollections";
import ProgressIcon from "../../components/ProgressIcon";
import ProjectList from "../../components/ProjectList";
import { ProjectFilter } from "./ProjectFilter";
import "./Dashboard.css";

function Dashboard() {
  const { data: projects, error, isPending } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");

  // return all by default or filter by project category based on current filter option.
  const filteredProjects = useMemo(() => {
    if (currentFilter == "all") return projects;
    return projects.filter(
      (project) => project.category.toLowerCase() === currentFilter
    );
  }, [projects, currentFilter]);

  // handle filter option change
  const changeFilter = (filter) => {
    setCurrentFilter(filter);
  };

  return (
    <div className='dashboard'>
      <div className='container'>
        <h2 className='page-title'>Dashboard Page</h2>
        {error && <p>{error}</p>}
        {isPending && <ProgressIcon />}
        {projects && (
          <ProjectFilter
            currentFilter={currentFilter}
            changeFilter={changeFilter}
          />
        )}
        {projects && <ProjectList projects={filteredProjects} />}
      </div>
    </div>
  );
}

export default Dashboard;
