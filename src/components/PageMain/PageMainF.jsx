import React from "react";
import ComponentTable from "../ComponentTable";
import ComponentHeaderTitle from "../ComponentHeaderTitle";

const PageMainF = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const saved = localStorage.getItem("projects");
    if (saved) setData(JSON.parse(saved));
  }, []);

  const statusClassMap = {
    Complete: "dark:bg-green-700",
    In_Progress: "dark:bg-orange-600",
    Pending_Payment: "dark:bg-red-700",
  };

  const columns = [
    { label: "Company Name", key: "name" },
    { label: "Project Name", key: "project_name" },
    { label: "Positions", key: "jobTitle" },
    { label: "Task", key: "task", type: "textarea" },
    { label: "Start Date", key: "start_date" },
    { label: "End Date", key: "end_date" },
    { label: "Tech Stack/Tools", key: "tech_stack" },
    { label: "Output/Deliverables", key: "output" },
    { label: "Salary", key: "salary", type: "cash" },
    {
      label: "Status",
      key: "status",
      render: (row) => {
        const value = row.status;
        const badgeClass = statusClassMap[value] || "dark:bg-gray-500";

        return (
          <td className="py-3 px-4 text-xs text-gray-400 font-medium">
            <span
              className={`px-2 py-1 font-semibold leading-tight text-white rounded-full ${badgeClass}`}
            >
              {value.replace(/_/g, ' ')}
            </span>
          </td>
        );
      },
    },
    { label: "Link Project", key: "link_project", type: "url" }
  ];

  return (
    <>
      <ComponentHeaderTitle
        title="All Projects"
        description="Display a complete list of all projects in your account,
          including associated companies, job roles, tasks, and their current statuses."
      />
      <ComponentTable columns={columns} data={data} />
    </>
  );
};

export default PageMainF;