const ComponentStatsData = ({ stats }) => {
  return (
    <>
      <div className="bg-gray-800 rounded-lg w-full h-auto py-4 px-2 flex flex-col md:flex-row justify-between divide-y md:divide-y-0 md:divide-x divide-solid divide-gray-400">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="hover:bg-gray-700 transition duration-300 ease-in-out relative flex-1 flex flex-col gap-2 px-4 py-4 md:py-2"
            >
              <label className="text-gray-300 text-md md:text-base font-semibold tracking-wider">
                {item.title}
              </label>
              <label className="text-gray-100 text-3xl md:text-4xl font-bold">
                {item.data}
              </label>
              {item.percent !== undefined && (
                <div
                  className={`absolute rounded-md font-semibold text-xs text-gray-100 px-3 py-1 right-4 bottom-2 md:bottom-0 ${
                    item.percent < 0 ? "bg-red-700" : "bg-green-700"
                  }`}
                >
                  {item.percent}%
                </div>
              )}
            </div>
          ))}
        </div>
    </>
  );
};

export default ComponentStatsData;