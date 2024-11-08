import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/adminSlice";

const EditModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.admin.selectedUser);
  const [updatedUser, setUpdatedUser] = useState(selectedUser);

  useEffect(() => {
    if (selectedUser) setUpdatedUser(selectedUser);
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    dispatch(updateUser(updatedUser));
    onClose();
  };

  if (!isOpen || !selectedUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            name="username"
            value={updatedUser?.username || "no username"}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={updatedUser?.email || "no password"}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role:</label>
          <input
            type="text"
            name="role"
            value={updatedUser?.role || "user"}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
