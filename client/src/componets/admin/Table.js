import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  setSelectedUser,
} from "../../store/adminSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditModal from "./EditModal";

const Table = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUserInfo, setFilteredUserInfo] = useState([]);
  const dispatch = useDispatch();
  const userDetails = useSelector((store) => store.admin.usersInfo);
  const loading = useSelector((store) => store.admin.loading); // Assuming there's a loading state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (user) => {
    dispatch(setSelectedUser(user));
    setIsModalOpen(true);
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleSearch = () => {
    const filteredUserInfo = userInfo.filter((user) =>
      user.email.includes(searchInput)
    );
    setFilteredUserInfo(filteredUserInfo);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setUserInfo(userDetails);
    setFilteredUserInfo(userDetails);
  }, [userDetails]);

  // Handle loading and empty state
  if (loading) return <h1>...Loading</h1>;
  if (userDetails.length === 0) return <h1>No Users Found</h1>;

  return (
    <div className="w-screen relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 top-16 w-4/5 ">
        <div>
          <h1 className="text-xl font-bold mb-4 text-center">
            ADMIN DASHBOARD
          </h1>
        </div>
        <div className="m-3 flex justify-between mt-8">
          <div>
            <input
              type="text"
              placeholder="Search By mail"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="mx-3 rounded-xl px-3 py-1"
            />
            <button
              className="bg-slate-600 px-2 py-1 rounded-lg text-white mx-3 hover:bg-slate-700"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <div>
            <Link to="/admin/adduser">
              <button className="bg-green-600 px-2 py-1 rounded-lg text-white hover:bg-green-800">
                Add +
              </button>
            </Link>
          </div>
        </div>
        <div>
          <table className="border-2 border-black w-full mb-10 mx-auto">
            <thead>
              <tr className="bg-slate-700 text-white">
                <th className="border-2 border-black px-4 py-2">Sl No</th>
                <th className="border-2 border-black px-4 py-2">UserName</th>
                <th className="border-2 border-black px-4 py-2">Email</th>
                <th className="border-2 border-black px-4 py-2">Role</th>
                <th className="border-2 border-black px-4 py-2">Buttons</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserInfo.map((user, index) => (
                <tr
                  key={user._id}
                  className="text-black hover:bg-slate-500 hover:text-white"
                >
                  <td className="border-2 border-black px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border-2 border-black px-4 py-2">
                    {user.username}
                  </td>
                  <td className="border-2 border-black px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border-2 border-black px-4 py-2">
                    {user.role}
                  </td>
                  <td className="border-b-2 border-black px-4 py-2 flex justify-center">
                    <button
                      className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <EditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Table;
