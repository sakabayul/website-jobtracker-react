import React from "react";
import ComponentTable from "../ComponentTable";
import ComponentModal from "../ComponentModal";
import ComponentHeaderTitle from "../ComponentHeaderTitle";

const PageProjectsA = () => {
  const [data, setData] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [fromData, setfromData] = React.useState({
    id: null,
    name: "",
    jobTitle: "",
    task: "",
    start_date: "",
    end_date: "",
    status: "",
    salary: 0
  });

  // Load data dari localStorage saat pertama kali
  React.useEffect(() => {
    const saved = localStorage.getItem("projects");
    if (saved) setData(JSON.parse(saved));
    
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup saat komponen unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  const saveJobsToStorage = (data) => {
    localStorage.setItem("projects", JSON.stringify(data));
  };

  const handleShowModal = (row) => {
    setShowModal(true);
    if (!row.id) return setfromData(null);
    setfromData({
      id: row.id,
      name: row.name,
      jobTitle: row.jobTitle,
      task: row.task,
      start_date: row.start_date,
      end_date: row.end_date,
      status: row.status,
      salary: row.salary
    });
  };

  const handleSave = (row) => {
    let updatedJobs;
    if (fromData) {
      updatedJobs = data.map((j) => (j.id === row.id ? row : j));
    } else {
      row.id = Date.now();
      updatedJobs = [...data, row];
    }
    setData(updatedJobs);
    saveJobsToStorage(updatedJobs);
    setShowModal(false);
  };

  const handleDelete = (row) => {
    if (confirm(`Yakin hapus data: ${row.name}?`)) {
      const updatedJobs = data.filter((j) => j.id !== row.id);
      setData(updatedJobs);
      saveJobsToStorage(updatedJobs);
      setShowModal(false);
    }
  };

  const statusClassMap = {
    Complete: "dark:bg-green-700",
    InProgress: "dark:bg-orange-600",
    Pending: "dark:bg-red-700",
  };

  const columns = [
    { label: "Company", key: "name" },
    { label: "Job Title", key: "jobTitle" },
    { label: "Task", key: "task", type: "textarea" },
    { label: "Start Date", key: "start_date" },
    { label: "End Date", key: "end_date" },
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
              {value === "InProgress" ? "In Progress" : value}
            </span>
          </td>
        );
      },
    },
    {
      label: "Actions",
      key: "actions",
      render: (row) => (
        <td className="py-3 px-4 space-x-6 text-base text-gray-700 font-medium">
          <button
            onClick={() => handleShowModal(row)}
            type="button"
            className="text-sm text-indigo-400 font-semibold hover:underline hover:text-indigo-500 cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row)}
            type="button"
            className="text-sm text-red-400 font-semibold hover:text-red-500 cursor-pointer"
          >
            Delete
          </button>
        </td>
      ),
    },
  ];

  const fields = [
    { label: "Company", name: "name", required: true },
    { label: "Job Title", name: "jobTitle", required: true },
    { label: "Task", name: "task", type: "textarea", required: true },
    {
      label: "Start Date",
      name: "start_date",
      type: "date",
      defaultValue: new Date().toISOString().split("T")[0],
      disabled: false,
    },
    {
      label: "End Date",
      name: "end_date",
      type: "date",
      defaultValue: new Date().toISOString().split("T")[0],
      disabled: false,
    },
    { label: "Salary", name: "salary", type: "number", required: true },
    {
      label: "Status",
      name: "status",
      type: "select",
      defaultValue: "Complete",
      options: [
        { label: "Complete", value: "Complete" },
        { label: "In Progress", value: "InProgress" },
        { label: "Pending", value: "Pending" },
      ],
    },
  ];
  return (
    <>
      <ComponentHeaderTitle
        title="All Projects"
        description="Display a complete list of all projects in your account,
          including associated companies, job roles, tasks, and their current statuses."
        handleShowModal={handleShowModal}
        button={true}
      />

      <ComponentTable columns={columns} data={data} />

      {showModal && (
        <ComponentModal
          onClose={() => setShowModal(false)}
          fields={fields}
          onSave={handleSave}
          onDelete={handleDelete}
          fromData={fromData}
        />
      )}
    </>
  );
};

export default PageProjectsA;
