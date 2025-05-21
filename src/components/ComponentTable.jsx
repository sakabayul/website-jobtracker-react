import React from 'react';
import { useLocation } from "react-router-dom";

const ComponentTable = ({ columns, data }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 10;
  const totalData = data.length;
  const totalPages = Math.ceil(totalData / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = Math.min(startIdx + rowsPerPage, totalData);
  const currentData = data.slice(startIdx, endIdx);
  const [isVisible, setIsVisible] = React.useState(false);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  React.useEffect(() => {
    if (currentData.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentData, currentPage]);

  const location = useLocation();
  React.useEffect(() => {
    setIsVisible(false); // Reset dulu
    const timeout = setTimeout(() => {
      setIsVisible(true); // Aktifkan lagi untuk trigger animasi
    }, 10);

    return () => clearTimeout(timeout);
  }, [location.pathname]); // Trigger ulang saat path berubah
  return (
    <div className={`mx-auto pb-8 w-full max-w-7xl transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
      <div className='overflow-x-auto'>
        <table className="px-4 min-w-full rounded-md border border-gray-200 overflow-hidden">
          {/* :TABLE HEAD */}
          <thead className="min-w-full bg-gray-800 text-left text-gray-100">
            <tr className='whitespace-nowrap'>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`py-3 px-4 text-sm font-medium tracking-wide ${
                    col.label === "Actions" ? "text-center" : ""
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* :TABLE BODY */}
          <tbody>
            {currentData.map((row, rowIndex) => (
              <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? "bg-gray-900" : "bg-gray-800"} whitespace-nowrap hover:bg-gray-700 transition duration-300 ease-in-out`}>
                {columns.map((col, colIndex) => (
                  col.render? React.cloneElement(col.render(row), { key: colIndex }) : (
                    <td key={colIndex}
                      className={`py-3 px-4 text-base font-semibold text-gray-200 max-w-45 overflow-hidden text-ellipsis ${
                        col.type === "textarea" ? "whitespace-pre-wrap break-words min-w-90" : ""
                      }`}
                    >
                      {col.type === "url" && row[col.key] ? (
                        <a
                          href={row[col.key]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline hover:text-blue-600"
                        >
                          Link
                        </a>
                      ) : col.type === "textarea" ? (
                        <span title={row[col.key]}>
                          {row[col.key]?.length > 100
                            ? row[col.key].slice(0, 100) + "..."
                            : row[col.key]}
                        </span>
                      ) : (
                        col.type === "cash"? `Rp.${new Intl.NumberFormat("id-ID").format(row[col.key] || null)}` : row[col.key]
                      )}
                    </td>
                  )
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Info & Controls */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between mt-4 text-sm">
        <div className='text-gray-800'>
          {totalData === 0? "Empty" :`Showing ${startIdx + 1} ${currentData.length === 1? "" : "to " + endIdx} of ${totalData} entries`}
        </div>
        {totalData >= 11 && (
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded text-gray-200 ${currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600 cursor-pointer"}`}
            >
              Previous
            </button>
            <span className="px-3 py-1 text-gray-800">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded text-gray-200 ${currentPage === totalPages ? "bg-gray-500 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600 cursor-pointer"}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentTable;