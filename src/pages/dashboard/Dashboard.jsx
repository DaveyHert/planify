import { useCollection } from "../../hooks/useCollections";
import OnlineUsers from "../../components/OnlineUsers";
import "./Dashboard.css";
import ProgressIcon from "../../components/ProgressIcon";

function Dashboard() {
  const { data, error, isPending } = useCollection("project");
  return (
    <div>
      <h2 className='page-title'>Dashboard Page</h2>
      {data && <OnlineUsers users={data} />}
      {error && <p>{error}</p>}
      {isPending && <ProgressIcon />}
    </div>
  );
}

export default Dashboard;
