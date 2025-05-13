import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ComponentHeaderTitle from '../ComponentHeaderTitle';

const PageMainD = ({ data }) => {
  const chartSeries1 = () => {
    const summary = {};
    const fetchData = data.projects;
    
    // Hitung jumlah per status
    fetchData.forEach(({ jobTitle }) => {
      if (!summary[jobTitle]) {
        summary[jobTitle] = 0;
      }
      summary[jobTitle] += 1;
    });

    // Ubah hasil summary menjadi array untuk chart
    const statusChartData = Object.entries(summary).map(([jobTitle, count]) => ({
      name: jobTitle,
      y: count,
    }));

    return {
      chart: {
        type: 'pie',
        backgroundColor: '#1E2A39'
      },
      title: {
        text: 'Most Position Projects',
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
        itemStyle: { color: '#fff' }
      },
      credits: {
        enabled: false // Menghilangkan credit Highcharts
      }
    };
  };
  const chartSeries2 = () => {
    const summary = {};
    const fetchData = data.projects;
    
    // Hitung jumlah per status
    fetchData.forEach(({ output }) => {
      if (!summary[output]) {
        summary[output] = 0;
      }
      summary[output] += 1;
    });

    // Ubah hasil summary menjadi array untuk chart
    const statusChartData = Object.entries(summary).map(([output, count]) => ({
      name: output.replace(/_/g, ' '), //Ubah Underscore menjadi Space
      y: count,
    }));

    return {
      chart: {
        type: 'pie',
        backgroundColor: '#1E2A39'
      },
      title: {
        text: 'Output/Deliverables',
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
        itemStyle: { color: '#fff' }
      },
      credits: {
        enabled: false // Menghilangkan credit Highcharts
      }
    };
  }
  const chartSeries3 = () => {
    const summary = {};
    const fetchData = data.projects;
    
    // Hitung jumlah per status
    fetchData.forEach(({ status }) => {
      if (!summary[status]) {
        summary[status] = 0;
      }
      summary[status] += 1;
    });

    // Ubah hasil summary menjadi array untuk chart
    const statusChartData = Object.entries(summary).map(([status, count]) => ({
      name: status.replace(/_/g, ' '), //Ubah Underscore menjadi Space
      y: count,
    }));

    return {
      chart: {
        type: 'pie',
        backgroundColor: '#1E2A39'
      },
      title: {
        text: 'Project Status',
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
        itemStyle: { color: '#fff' }
      },
      credits: {
        enabled: false // Menghilangkan credit Highcharts
      }
    };
  }

  return (
    <>
      <ComponentHeaderTitle title="Monitoring Projects" description="" />
      <div className="flex flex-wrap gap-2">
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

export default PageMainD;
