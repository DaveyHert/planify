import { useCollection } from "../../hooks/useCollections";
import "./Dashboard.css";
import ProgressIcon from "../../components/ProgressIcon";
import ProjectList from "../../components/ProjectList";
function Dashboard() {
  const { data: projects, error, isPending } = useCollection("projects");

  return (
    <div className="dashboard">
      <div className="container">
        <h2 className="page-title">Dashboard Page</h2>
        {error && <p>{error}</p>}
        {isPending && <ProgressIcon />}
        {projects && <ProjectList projects={projects} />}
      </div>
    </div>
  );
}

export default Dashboard;
