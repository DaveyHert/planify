import "./Dashboard.css";

const filterList = ["all", "development", "design", "sales", "marketing"];

export const ProjectFilter = ({ currentFilter, changeFilter }) => {
  // handle filter update on click
  const handleClick = (filter) => {
    console.log(filter);
    changeFilter(filter);
  };
  return (
    <nav className='project-filter'>
      {filterList.map((filter) => (
        <button
          key={filter}
          className={currentFilter === filter ? "active" : ""}
          onClick={() => handleClick(filter)}
        >
          {filter}
        </button>
      ))}
    </nav>
  );
};
