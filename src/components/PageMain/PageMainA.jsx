import React from "react";
import ComponentTable from "../ComponentTable";
import ComponentHeaderTitle from "../ComponentHeaderTitle";

const PageMainA = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const saved = localStorage.getItem("jobs");
    if (saved) setData(JSON.parse(saved));
  }, []);

  const statusClassMap = {
    Approved: "dark:bg-green-700",
    Pending: "dark:bg-orange-600",
    Expired: "dark:bg-gray-600",
    Denied: "dark:bg-red-700",
  };

  const columns = [
    { label: "Company", key: "name" },
    { label: "Job Title", key: "jobTitle" },
    { label: "Description", key: "description", type: "textarea" },
    { label: "Email", key: "email" },
    { label: "From", key: "from" },
    { label: "Link", key: "link", type: "url" },
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
              {value}
            </span>
          </td>
        );
      },
    }
  ];

  return (
    <>
      <ComponentHeaderTitle
        title="All Job"
        description="Display a complete list of all job opportunities you are currently
          tracking in your account, including related companies, job roles,
          descriptions, contact emails, source information, links, and their
          current statuses."
      />
      <ComponentTable columns={columns} data={data} />
    </>
  );
};

export default PageMainA;
