import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ComponentHeaderTitle from '../ComponentHeaderTitle';

const PageMainB = ({ data }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  
  const chartSeries1 = () => {
    const summary = {};
    const fetchData = data.jobs;

    // Hitung jumlah lamaran per bulan
    fetchData.forEach(({ date_applied }) => {
      const date = new Date(date_applied);
      const month = date.getMonth(); // 0–11
      const year = date.getFullYear();
      const key = `${year}-${month + 1}`; // Contoh: "2025-5"

      if (!summary[key]) {
        summary[key] = 0;
      }
      summary[key] += 1;
    });

    // Sort berdasarkan waktu (ascending)
    const sortedKeys = Object.keys(summary).sort((a, b) => {
      const [aYear, aMonth] = a.split('-').map(Number);
      const [bYear, bMonth] = b.split('-').map(Number);
      return new Date(aYear, aMonth - 1) - new Date(bYear, bMonth - 1);
    });

    const categories = sortedKeys.map(key => {
      const [year, month] = key.split('-').map(Number);
      const date = new Date(year, month - 1);
      return date.toLocaleString('default', { month: 'long', year: 'numeric' }); // Contoh: "May 2025"
    });

    const dataSeries = sortedKeys.map(key => summary[key]);

    return {
      chart: {
        type: 'column',
        backgroundColor: '#1E2A39'
      },
      title: {
        text: 'Applied Jobs/Month',
        style: { color: '#fff' }
      },
      xAxis: {
        categories: categories,
        labels: { style: { color: '#fff' } }
      },
      yAxis: {
        title: {
          text: 'Number of Applied',
          style: { color: '#fff' },
        },
        labels: { style: { color: '#fff' } }
      },
      series: [
        {
          name: 'Applied Jobs',
          data: dataSeries,
          color: '#4ade80',
          cursor: "pointer"
        }
      ],
      legend: {
        itemStyle: { color: '#fff' }
      },
      credits: {
        enabled: false
      }
    };
  }
  const chartSeries2 = () => {
    const summary = {};
    const fetchData = data.projects;

    // Hitung jumlah Project per bulan
    fetchData.forEach(({ start_date }) => {
      const date = new Date(start_date);
      const month = date.getMonth(); // 0–11
      const year = date.getFullYear();
      const key = `${year}-${month + 1}`; // Contoh: "2025-5"

      if (!summary[key]) {
        summary[key] = 0;
      }
      summary[key] += 1;
    });

    // Sort berdasarkan waktu (ascending)
    const sortedKeys = Object.keys(summary).sort((a, b) => {
      const [aYear, aMonth] = a.split('-').map(Number);
      const [bYear, bMonth] = b.split('-').map(Number);
      return new Date(aYear, aMonth - 1) - new Date(bYear, bMonth - 1);
    });

    const categories = sortedKeys.map(key => {
      const [year, month] = key.split('-').map(Number);
      const date = new Date(year, month - 1);
      return date.toLocaleString('default', { month: 'long', year: 'numeric' }); // Contoh: "May 2025"
    });

    const dataSeries = sortedKeys.map(key => summary[key]);

    return {
      chart: {
        type: 'column',
        backgroundColor: '#1E2A39'
      },
      title: {
        text: 'Applied Projects/Month',
        style: { color: '#fff' }
      },
      xAxis: {
        categories: categories,
        labels: { style: { color: '#fff' } }
      },
      yAxis: {
        title: {
          text: 'Number of Projects',
          style: { color: '#fff' },
        },
        labels: { style: { color: '#fff' } }
      },
      series: [
        {
          name: 'Applied Projects',
          data: dataSeries,
          color: '#4ade80',
          cursor: "pointer"
        }
      ],
      legend: {
        itemStyle: { color: '#fff' }
      },
      credits: {
        enabled: false
      }
    };
  }
  
  React.useEffect(() => {
    setIsVisible(true); // Mengubah state menjadi true setelah halaman dimuat
  }, []);
 
  return (
    <>
      <ComponentHeaderTitle title="Monitoring" description="" />
      <div className={`flex flex-wrap gap-2 transition-all duration-800 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}>
        <div className="bg-gray-800 p-4 rounded-lg w-[calc(100%-0.25rem)] lg:w-[calc(50%-0.375rem)]">
          <HighchartsReact highcharts={Highcharts} options={chartSeries1()} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg w-[calc(100%-0.25rem)] lg:w-[calc(50%-0.375rem)]">
          <HighchartsReact highcharts={Highcharts} options={chartSeries2()} />
        </div>
      </div>
    </>
  );
};

export default PageMainB;
