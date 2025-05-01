import React from "react";
import ComponentTable from "../ComponentTable";
import ComponentModal from "../ComponentModal";
import ComponentHeaderTitle from "../ComponentHeaderTitle";

const PageFindJobsA = () => {
  const [data, setData] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [fromData, setfromData] = React.useState({
    id: null,
    name: "",
    jobTitle: "",
    email: "",
    from: "",
    status: "",
    link: "",
    description: "",
    created: "",
  });

  // Load data dari localStorage saat pertama kali
  React.useEffect(() => {
    const saved = localStorage.getItem("jobs");
    if (saved) setData(JSON.parse(saved));
  }, []);

  const saveJobsToStorage = (data) => {
    localStorage.setItem("jobs", JSON.stringify(data));
  };

  const statusClassMap = {
    Approved: "dark:bg-green-700",
    Pending: "dark:bg-orange-600",
    Expired: "dark:bg-gray-600",
    Denied: "dark:bg-red-700",
  };

  const handleShowModal = (row) => {
    setShowModal(true);
    if (!row.id) return setfromData(null);
    setfromData({
      id: row.id,
      name: row.name,
      jobTitle: row.jobTitle,
      email: row.email,
      from: row.from,
      status: row.status,
      link: row.link,
      description: row.description,
      created: row.created,
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
    {
      label: "Description",
      name: "description",
      type: "textarea",
      required: true,
    },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "From", name: "from", required: true },
    {
      label: "Status",
      name: "status",
      type: "select",
      defaultValue: "Approved",
      options: [
        { label: "Approved", value: "Approved" },
        { label: "Pending", value: "Pending" },
        { label: "Denied", value: "Denied" },
        { label: "Expired", value: "Expired" },
      ],
    },
    { label: "Link", name: "link", type: "url", required: true },
    {
      label: "Created",
      name: "created",
      type: "date",
      defaultValue: new Date().toISOString().split("T")[0],
      disabled: true,
    },
  ];
  return (
    <>
      <ComponentHeaderTitle
        title="All Job"
        description="Display a complete list of all job opportunities you are currently
          tracking in your account, including related companies, job roles,
          descriptions, contact emails, source information, links, and their
          current statuses."
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

export default PageFindJobsA;
