import React from "react";
import PageMainA from "../components/PageMain/PageMainA";
import PageMainB from "../components/PageMain/PageMainB";
import PageMainC from "../components/PageMain/PageMainC";
import PageMainD from "../components/PageMain/PageMainD";

const PageMain = () => {
  const [data, setData] = React.useState({ jobs: [], projects: [] });
  const [filteredData, setFilteredData] = React.useState({
    jobs: [],
    projects: []
  });

  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  // Saat pertama kali render, ambil data dari localStorage
  React.useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");

    setData({ jobs: storedJobs, projects: storedProjects });

    // Default: tahun ini
    const now = new Date();
    const year = now.getFullYear();
    const start = `${year}-01-01`;
    const end = `${year}-12-31`;

    setStartDate(start);
    setEndDate(end);
  }, []);

  // Setiap kali data atau filter berubah, lakukan penyaringan
  React.useEffect(() => {
    if (!startDate || !endDate) return;

    const isInRange = (dateStr) => {
      const date = new Date(dateStr);
      return date >= new Date(startDate) && date <= new Date(endDate);
    };

    const jobs = data.jobs.filter((item) => isInRange(item.date_applied));
    const projects = data.projects.filter((item) => isInRange(item.start_date));

    setFilteredData({ jobs, projects });
  }, [data, startDate, endDate]);

  return (
    <>
      {/* Filter Tanggal */}
      <div className="flex sm:justify-start justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-1">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="px-2 py-1 rounded bg-white dark:text-gray-200 dark:bg-gray-700 text-sm"
        />
        <label className="px-2 text-sm font-medium text-gray-800 dark:text-gray-200">To</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="px-2 py-1 rounded bg-white dark:text-gray-200 dark:bg-gray-700 text-sm"
        />
      </div>
      
      <div className="flex flex-col gap-10">
        {/* Komponen yang menerima data hasil filter */}
        <div>
          <PageMainA data={filteredData} />
        </div>
        {(filteredData.jobs.length > 0 && filteredData.projects.length > 0) && (
          <div>
            <PageMainB data={filteredData} />
          </div>
        )}
        {filteredData.jobs.length > 0 && (
          <div>
            <PageMainC data={filteredData} />
          </div>
        )}
        {filteredData.projects.length > 0 && (
          <div>
            <PageMainD data={filteredData} />
          </div>
        )}
      </div>
    </>
  );
};

export default PageMain;
