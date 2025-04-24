import React from 'react';
import ComponentTable from "../components/ComponentTable";
import pageDataList from './js/pageDataList';

const PageMain = () => {
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
      <h1>Page Main</h1>
      <ComponentTable prDtTable={data.tableSeriesSatu} actions={false} />
    </>
  );
};

export default PageMain;