import React from 'react';
import ComponentTable from "../components/ComponentTable";
import pageDataList from './js/pageDataList';

const PageDataList = () => {
  const [data, setData] = React.useState({
    tableSeriesSatu: {}
  });
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const rslt = await pageDataList();
        if (rslt.ret === 0) {
          setData({
            tableSeriesSatu: rslt.tableParamsSatu,
          });
        } else {
          console.warn("Message:", rslt.msg);
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <>
      <div className="mb-5 flex justify-between items-center">
        <div>
          <h2 className="text-2xl text-gray-700 font-bold">All Job</h2>
          <p className="text-gray-600">A list of all the job in your account including their name, title, email and role.</p>
        </div>
        <div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white py-1 px-3 rounded-md cursor-pointer">
            Add
          </button>
        </div>
      </div>
      
      <ComponentTable prDtTable={data.tableSeriesSatu} actions={true} />
    </>
  );
};

export default PageDataList;