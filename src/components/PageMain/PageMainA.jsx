import React from "react";
import { formatShortNumber } from "../../utils/utility";
import { useLocation } from "react-router-dom";
import ComponentStatsData from "../ComponentStatsData";

const PageMainA = ({ data }) => {
  const [statsData, setStatsData] = React.useState({});
  const [isVisible, setIsVisible] = React.useState(false);

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
    { title: "Total Applied Projects", data: statsData.project },
    { title: "Projects Complete", data: statsData.project_complete },
    { title: "Total Profit Projects", data: statsData.project_total_profit },
  ];
  
  const location = useLocation();
  React.useEffect(() => {
    setIsVisible(false); // Reset dulu
    const timeout = setTimeout(() => {
      setIsVisible(true); // Aktifkan lagi untuk trigger animasi
    }, 10);

    return () => clearTimeout(timeout);
  }, [location.pathname]); // Trigger ulang saat path berubah
  return (
    <>
      <div className={`flex flex-col transition-all duration-800 ease-in-out ${
        isVisible? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <ComponentStatsData stats={stats} />
      </div>
    </>
  );
};

export default PageMainA;
