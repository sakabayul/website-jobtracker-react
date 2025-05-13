import React from "react";
import { formatShortNumber } from "../../utils/utility";
import ComponentStatsData from "../ComponentStatsData";

const PageMainA = ({ data }) => {
  const [statsData, setStatsData] = React.useState({});

  React.useEffect(() => {
    const totalProfit = data.projects.reduce(
      (acc, item) => acc + (item.status === "Complete" ? (parseFloat(item.salary) || 0) : 0), 0
    );

    setStatsData({
      job: data.jobs.length,
      project: data.projects.length,
      project_complete: data.projects.filter((project) => project.status === "Complete").length,
      project_total_profit: formatShortNumber(totalProfit)
    });
  }, [data]);

  const stats = [
    { title: "Total Applied Jobs", data: statsData.job },
    { title: "Total Projects", data: statsData.project },
    { title: "Projects Complete", data: statsData.project_complete },
    { title: "Total Profit", data: statsData.project_total_profit },
  ];

  return (
    <>
      <div className="flex flex-col">
        <ComponentStatsData stats={stats} />
      </div>
    </>
  );
};

export default PageMainA;
