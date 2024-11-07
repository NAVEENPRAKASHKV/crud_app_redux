import React from "react";

const Table = () => {
  return (
    <div className="w-screen relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 top-16 w-3/5">
        <div>
          <h1 className="text-xl font-bold mb-4 text-center ">
            ADMIN DASHBOARD
          </h1>
        </div>
        <div className="m-3 flex justify-between mt-8">
          <div>
            <input type="text" className="mx-3 rounded-xl px-3 py-1" />
            <button className="bg-slate-600  px-2 py-1 rounded-lg text-white mx-3  hover:bg-slate-700">
              Search
            </button>
          </div>
          <div>
            <button className="bg-green-600 px-2 py-1 rounded-lg text-white  hover:bg-green-800">
              Add +
            </button>
          </div>
        </div>
        <div>
          <table className="border-2 border-black w-full max-w-screen-md mx-auto">
            <thead>
              <tr>
                <th className="border-2 border-black px-4 py-2">Sl No</th>
                <th className="border-2 border-black px-4 py-2">UserName</th>
                <th className="border-2 border-black px-4 py-2">Email</th>
                <th className="border-2 border-black px-4 py-2">Buttons</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row - replace with actual data */}
              <tr>
                <td className="border-2 border-black px-4 py-2">1</td>
                <td className="border-2 border-black px-4 py-2">John Doe</td>
                <td className="border-2 border-black px-4 py-2">
                  john@example.com
                </td>
                <td className=" px-4 py-2 flex justify-center">
                  <button className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Edit
                  </button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded  hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
