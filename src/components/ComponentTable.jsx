const ComponentTable = ({prDtTable, actions}) => {
  const statusClassMap = {
    Approved: "dark:bg-green-700",
    Pending: "dark:bg-orange-600",
    Expired: "dark:bg-gray-600",
    Denied: "dark:bg-red-700",
  };
  
  return (
    <div className="mx-auto pb-8 w-full max-w-7xl overflow-x-auto">
      <table className="px-4 min-w-full rounded-md border border-gray-200 overflow-hidden">

        {/* :TABLE HEAD */}
        <thead className="min-w-full bg-gray-800 text-left text-gray-100">
          <tr>
            {prDtTable.Header?.map((__, index) => (
              <th key={index} className="py-3 px-4 text-sm font-medium uppercase tracking-wide" scope="col">{ prDtTable.Header[index].text }</th>
            ))}
            {actions && (
              <th className="py-3 px-4 text-center text-sm font-medium uppercase tracking-wide" scope="col">Actions</th>
            )}
          </tr>
        </thead>


        {/* :TABLE BODY */}
        <tbody className="">
          {prDtTable.Body?.map((user, index) => (
            <tr key={index} className={`${index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"} whitespace-nowrap hover:bg-gray-700`}>
              {prDtTable.Header?.map((user2, index2) => {
                const value = user[index2];
                const statusKeys = Object.keys(statusClassMap);

                return statusKeys.includes(value) ? (
                  <td key={index2} className="py-3 px-4 text-xs text-gray-400 font-medium">
                    <span className={`px-2 py-1 font-semibold leading-tight text-white rounded-full ${statusClassMap[value]}`}>
                      {value}
                    </span>
                  </td>
                ) : (
                  <td key={index2} className="py-3 px-4 text-base text-gray-200 font-semibold">
                    {value}
                  </td>
                );
              })}
              {/* ::Action Buttons */}
              {actions && (
                <td className="py-3 px-4 flex justify-around items-center space-x-6 text-base text-gray-700 font-medium">
                  <button type="button" className="text-sm text-indigo-400 font-semibold hover:underline hover:text-indigo-500 cursor-pointer">Edit</button>
                  <button type="button" className="text-sm text-red-400 font-semibold hover:text-red-500 cursor-pointer">Delete</button>
                </td>
              )}
            </tr>
          ))
          }
        </tbody>

      </table>
    </div>
  )
};

export default ComponentTable;