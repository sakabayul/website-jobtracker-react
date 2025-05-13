import React from "react";
import ComponentTable from "../ComponentTable";
import ComponentHeaderTitle from "../ComponentHeaderTitle";

const PageMainE = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const saved = localStorage.getItem("jobs");
    if (saved) setData(JSON.parse(saved));
  }, []);

  const statusClassMap = {
    Sending: "dark:bg-cyan-700",
    In_Process: "dark:bg-orange-600",
    Interview: "dark:bg-yellow-600",
    Approved: "dark:bg-green-700",
    Denied: "dark:bg-red-700"
  };

  const columns = [
    { label: "Date Applied", key: "date_applied" },
    { label: "Company Name", key: "name_company" },
    { label: "Applied Positions", key: "jobTitle" },
    {
      label: "Information Source",
      key: "info_source",
      render: (row) => {
        const value = row.info_source;

        return (
          <td className="py-3 px-4 text-base font-semibold text-gray-200 max-w-45 overflow-hidden text-ellipsis">
              {value.replace(/_/g, ' ')}
          </td>
        );
      }
    },
    {
      label: "Application Status",
      key: "application_status",
      render: (row) => {
        const value = row.application_status;
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
      }
    },
    { label: "Link Job", key: "link_job", type: "url" },
    { label: "Contact Person", key: "contact_person" },
    { label: "Description", key: "description", type: "textarea" }
  ];

  return (
    <>
      <ComponentHeaderTitle
        title="All Applied Jobs"
        description="Display a complete list of all job opportunities you are currently
          tracking in your account, including related companies, job roles,
          descriptions, contact emails, source information, links, and their
          current statuses."
      />
      <ComponentTable columns={columns} data={data} />
    </>
  );
};

export default PageMainE;
