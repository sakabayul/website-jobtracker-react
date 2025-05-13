import React from "react";
import ComponentTable from "../ComponentTable";
import ComponentModal from "../ComponentModal";
import ComponentHeaderTitle from "../ComponentHeaderTitle";

const PageAppliedJobsA = () => {
  const [data, setData] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [fromData, setfromData] = React.useState({
    id: null,
    date_applied: "",
    name_company: "",
    jobTitle: "",
    info_source: "",
    application_status: "",
    link_job: "",
    contact_person: "",
    description: "",
    created: ""
  });

  // Load data dari localStorage saat pertama kali
  React.useEffect(() => {
    const saved = localStorage.getItem("jobs");
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
    localStorage.setItem("jobs", JSON.stringify(data));
  };

  const handleShowModal = (row) => {
    setShowModal(true);
    if (!row.id) return setfromData(null);
    setfromData({
      id: row.id,
      date_applied: row.date_applied,
      name_company: row.name_company,
      jobTitle: row.jobTitle,
      info_source: row.info_source,
      application_status: row.application_status,
      link_job: row.link_job,
      contact_person: row.contact_person,
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
    { label: "Description", key: "description", type: "textarea" },
    {
      label: "Actions",
      key: "actions",
      render: (row) => (
        <td className="space-x-8 text-base text-gray-700 font-medium min-w-50 text-center">
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
    }
  ];

  const fields = [
    {
      label: "Date Applied",
      name: "date_applied",
      type: "date",
      defaultValue: new Date().toISOString().split("T")[0]
    },
    { label: "Company Name", name: "name_company", required: true },
    { label: "Applied Positions", name: "jobTitle", required: true },
    {
      label: "Information Source",
      name: "info_source",
      type: "select",
      defaultValue: "Official Website",
      options: [
        { label: "Official Website", value: "Official Website" },
        { label: "LinkedIn", value: "LinkedIn" },
        { label: "Social Media", value: "Social Media" },
        { label: "Jobstreet", value: "Jobstreet" },
        { label: "Glints", value: "Glints" },
        { label: "Indeed", value: "Indeed" },
        { label: "Karir", value: "Karir" }
      ]
    },
    {
      label: "Application Status",
      name: "application_status",
      type: "select",
      defaultValue: "Sending",
      options: [
        { label: "Sending", value: "Sending" },
        { label: "In Process", value: "In_Process" },
        { label: "Interview", value: "Interview" },
        { label: "Approved", value: "Approved" },
        { label: "Denied", value: "Denied" }
      ]
    },
    { label: "Link Job", name: "link_job", type: "url", required: true },
    { label: "Contact Person", name: "contact_person", required: true },
    { label: "Description", name: "description", type: "textarea", required: true },
    {
      label: "Created",
      name: "created",
      type: "date",
      defaultValue: new Date().toISOString().split("T")[0],
      disabled: true,
      hidden: true
    },
  ];

  const statusClassMap = {
    Sending: "dark:bg-cyan-700",
    In_Process: "dark:bg-orange-600",
    Interview: "dark:bg-yellow-600",
    Approved: "dark:bg-green-700",
    Denied: "dark:bg-red-700"
  };
  
  return (
    <>
      <ComponentHeaderTitle
        title="All Applied Jobs"
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

export default PageAppliedJobsA;
