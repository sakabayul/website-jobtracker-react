import React from "react";
import { formatShortNumber, filterThisMonth, filterThisYear, filterLastYear } from "../../utils/utility";
import ComponentHeaderTitle from "../ComponentHeaderTitle";
import ComponentButton from "../ComponentButton";
import ComponentStatsData from "../ComponentStatsData";

const PageMainA = () => {
  const [statsData, setStatsData] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [filterByMonth, setFilterByMonth] = React.useState("");

  React.useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");

    if (filterByMonth === "This-Month") {
      setJobs(filterThisMonth(storedJobs));
      setProjects(filterThisMonth(storedProjects));
    } else if (filterByMonth === "This-Year") {
      setJobs(filterThisYear(storedJobs));
      setProjects(filterThisYear(storedProjects));
    } else if (filterByMonth === "Last-Year") {
      setJobs(filterLastYear(storedJobs));
      setProjects(filterLastYear(storedProjects));
    } else {
      setJobs(storedJobs);
      setProjects(storedProjects);
    }
  }, [filterByMonth]);

  React.useEffect(() => {
    const totalProfit = projects.reduce((acc, curr) => acc + (parseFloat(curr.salary) || 0), 0);

    const statsData = {
      project: projects.length,
      project_panding: projects.filter((project) => project.status === "Pending").length,
      project_complete: projects.filter((project) => project.status === "Complete").length,
      project_total_profit: formatShortNumber(totalProfit),
      job: jobs.length,
      job_approved: jobs.filter((job) => job.status === "Approved").length,
      job_panding: jobs.filter((job) => job.status === "Pending").length,
      job_denied: jobs.filter((job) => job.status === "Denied").length,
    };

    setStatsData(statsData);
  }, [jobs, projects]);

  const stats1 = [
    { title: "Total Projects", data: statsData.project },
    { title: "Projects Pending", data: statsData.project_panding },
    { title: "Projects Complete", data: statsData.project_complete },
    { title: "Total Profit", data: statsData.project_total_profit },
  ];

  const stats2 = [
    { title: "Total Job Find", data: statsData.job },
    { title: "Job Approved", data: statsData.job_approved },
    { title: "Job Pending", data: statsData.job_panding },
    { title: "Job Denied", data: statsData.job_denied },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <ComponentHeaderTitle title="Show Data" description="" />
        <div className="flex gap-4 flex-col md:flex-row">
          <ComponentButton type="button" onClick={() => setFilterByMonth("All-Time")}>
            Show All Time
          </ComponentButton>

          <ComponentButton type="button" onClick={() => setFilterByMonth("This-Month")}>
            Show This Month
          </ComponentButton>

          <ComponentButton type="button" onClick={() => setFilterByMonth("This-Year")}>
            Show This Year
          </ComponentButton>

          <ComponentButton type="button" onClick={() => setFilterByMonth("Last-Year")}>
            Show Last Year
          </ComponentButton>
        </div>
        <ComponentStatsData stats={stats1} />
        <ComponentStatsData stats={stats2} />
      </div>
    </>
  );
};

export default PageMainA;
