import React from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ComponentHeaderTitle from '../ComponentHeaderTitle';

const PageMainC = ({ data }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const chartSeries1 = () => {
    const summary = {};
    const fetchData = data.jobs;

    // Hitung jumlah setiap jobTitle
    fetchData.forEach(({ jobTitle }) => {
      if (!summary[jobTitle]) {
        summary[jobTitle] = 0;
      }
      summary[jobTitle] += 1;
    });

    // Ubah menjadi array dan urutkan dari yang paling banyak
    const statusChartData = Object.entries(summary)
      .map(([jobTitle, count]) => ({
        name: jobTitle,
        y: count,
      }))
      .sort((a, b) => b.y - a.y) // Urutkan descending
      .slice(0, 6); // Ambil 4 teratas

    return {
      chart: {
        type: 'pie',
        backgroundColor: '#1E2A39'
      },
      title: {
        text: 'Most Applied Positions',
        style: { color: '#fff' }
      },
      series: [
        {
          name: 'Jumlah',
          colorByPoint: true,
          data: statusChartData,
          cursor: "pointer"
        },
      ],
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: false
              },
              showInLegend: true
          }
      },
      legend: {
        itemStyle: { color: '#fff', fontWeight: 'normal' },
        itemHoverStyle: { color: '#f39c12', fontWeight: 'bold' }
      },
      credits: {
        enabled: false // Menghilangkan credit Highcharts
      }
    };
  };
  const chartSeries2 = () => {
    const summary = {};
    const fetchData = data.jobs;
    
    // Hitung jumlah setiap info_source
    fetchData.forEach(({ info_source }) => {
      if (!summary[info_source]) {
        summary[info_source] = 0;
      }
      summary[info_source] += 1;
    });

    // Ubah menjadi array dan urutkan dari yang paling banyak
    const statusChartData = Object.entries(summary)
      .map(([info_source, count]) => ({
        name: info_source.replace(/_/g, ' '),
        y: count,
      }))
      .sort((a, b) => b.y - a.y) // Urutkan descending
      .slice(0, 6); // Ambil 4 teratas

    return {
      chart: {
        type: 'pie',
        backgroundColor: '#1E2A39'
      },
      title: {
        text: 'Information Source',
        style: { color: '#fff' }
      },
      series: [
        {
          name: 'Jumlah',
          colorByPoint: true,
          data: statusChartData,
          cursor: "pointer"
        },
      ],
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: false
              },
              showInLegend: true
          }
      },
      legend: {
        itemStyle: { color: '#fff', fontWeight: 'normal' },
        itemHoverStyle: { color: '#f39c12', fontWeight: 'bold' }
      },
      credits: {
        enabled: false // Menghilangkan credit Highcharts
      }
    };
  }
  const chartSeries3 = () => {
    const summary = {};
    const fetchData = data.jobs;
    
    // Hitung jumlah per status
    fetchData.forEach(({ application_status }) => {
      if (!summary[application_status]) {
        summary[application_status] = 0;
      }
      summary[application_status] += 1;
    });

    // Ubah hasil summary menjadi array untuk chart
    const statusChartData = Object.entries(summary).map(([application_status, count]) => ({
      name: application_status.replace(/_/g, ' '), //Ubah Underscore menjadi Space
      y: count,
    }));

    return {
      chart: {
        type: 'pie',
        backgroundColor: '#1E2A39'
      },
      title: {
        text: 'Application Status',
        style: { color: '#fff' }
      },
      series: [
        {
          name: 'Jumlah',
          colorByPoint: true,
          data: statusChartData,
          cursor: "pointer"
        },
      ],
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: false
              },
              showInLegend: true
          }
      },
      legend: {
        itemStyle: { color: '#fff', fontWeight: 'normal' },
        itemHoverStyle: { color: '#f39c12', fontWeight: 'bold' }
      },
      credits: {
        enabled: false // Menghilangkan credit Highcharts
      }
    };
  }

  React.useEffect(() => {
    setIsVisible(true); // Mengubah state menjadi true setelah halaman dimuat
  }, []);

  return (
    <>
      <ComponentHeaderTitle title="Monitoring Applied Jobs" description="" />
      <div className={`flex flex-wrap gap-2 transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}>
        <div className="bg-gray-800 p-4 rounded-lg w-[calc(100%-0.25rem)] sm:w-[calc(50%-0.25rem)] lg:w-[calc(33%-0.375rem)]">
          <HighchartsReact highcharts={Highcharts} options={chartSeries1()} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg w-[calc(100%-0.25rem)] sm:w-[calc(50%-0.25rem)] lg:w-[calc(33%-0.375rem)]">
          <HighchartsReact highcharts={Highcharts} options={chartSeries2()} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg w-[calc(100%-0.25rem)] sm:w-[calc(50%-0.25rem)] lg:w-[calc(33%-0.375rem)]">
          <HighchartsReact highcharts={Highcharts} options={chartSeries3()} />
        </div>
      </div>
    </>
  );
};

export default PageMainC;
