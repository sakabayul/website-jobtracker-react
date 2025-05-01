import React from 'react';

const ComponentTable = ({ columns, data }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const rowsPerPage = 10;
  const totalData = data.length;
  const totalPages = Math.ceil(totalData / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = Math.min(startIdx + rowsPerPage, totalData);
  const currentData = data.slice(startIdx, endIdx);

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
  return (
    <div className="mx-auto pb-8 w-full max-w-7xl overflow-x-auto">
      <table className="px-4 min-w-full rounded-md border border-gray-200 overflow-hidden">
        {/* :TABLE HEAD */}
        <thead className="min-w-full bg-gray-800 text-left text-gray-100">
          <tr>
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
            <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? "bg-gray-700" : "bg-gray-800"} whitespace-nowrap hover:bg-gray-700`}>
              {columns.map((col, colIndex) => (
                col.render? React.cloneElement(col.render(row), { key: colIndex }) : (
                  <td key={colIndex}
                    className={`py-3 px-4 text-base font-semibold text-gray-200 ${
                      col.type === "textarea" ? "whitespace-pre-wrap break-words min-w-50" : ""
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
                      row[col.key]
                    )}
                  </td>
                )
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Info & Controls */}
      <div className="flex items-center justify-between mt-4 text-sm">
        <div className='text-gray-800'>
          {totalData === 0? "Empty" :`Showing ${startIdx + 1} ${currentData.length === 1? "" : "to " + endIdx} of ${totalData} entries`}
        </div>
        {totalData >= 11 && (
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded text-gray-200 cursor-pointer ${currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"}`}
            >
              Previous
            </button>
            <span className="px-3 py-1 text-gray-800">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded text-gray-200 cursor-pointer ${currentPage === totalPages ? "bg-gray-500 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600"}`}
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