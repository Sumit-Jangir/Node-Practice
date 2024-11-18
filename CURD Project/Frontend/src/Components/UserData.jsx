import React, { useEffect, useState } from "react";
import axios from "axios";

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:7000/auth/find");
      if (response.status === 200) {
        console.log(response.data);
        setUsers(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:7000/auth/delete/${id}`
      );
      if (response.status === 200) {
        console.log(response.data);
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.error(error);
    }

    console.log(id);
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:7000/auth/update`, {
        id,
        ...userToEdit,
      });
      if (response.status === 200) {
        setUsers((prev) =>
          prev.map((item) => (item._id === userToEdit._id ? userToEdit : item))
        );
        console.log("<<<<users>>>>", users);
        setIsUpdateModalOpen(false);

        alert("User updated successfully");
      }
    } catch (error) {
      console.error("Failed to update user");
    }
  };

  const handleAddUser = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:7000/auth/update`, {
        id,
        ...userToEdit,
      });
      if (response.status === 200) {
        setUsers((prev) =>
          prev.map((item) => (item._id === userToEdit._id ? userToEdit : item))
        );
        console.log("<<<<users>>>>", users);
        setIsAddModalOpen(false);

        alert("User updated successfully");
      }
    } catch (error) {
      console.error("Failed to update user");
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        {/* <div className="justify-self-center  my-10">
          <button
            className="bg-green-600 px-3 py-1 rounded-lg my-3 "
            onClick={() => {
              setIsAddModalOpen(true);
              setUserToEdit(item);
            }}
          >
            Add User
          </button>
        </div> */}

        <div className="flex flex-wrap justify-evenly items-center m-10 gap-20">
          {users.map((item, index) => (
            <div key={index} className="bg-white w-60 rounded-md p-4 m-3">
              <p>Name: {item.name}</p>
              <p>Password: {item.password}</p>
              <p>Email: {item.email}</p>

              <button
                className="bg-red-600 px-3 py-1 rounded-lg my-3 "
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
              <button
                className="bg-blue-600 px-3 py-1 rounded-lg my-3 mx-3"
                onClick={() => {
                  setIsUpdateModalOpen(true);
                  setUserToEdit(item);
                }}
              >
                Update
              </button>
            </div>
          ))}
        </div>

        {isUpdateModalOpen && userToEdit && (
          <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-200 py-4 px-5 rounded-lg shadow-lg max-w-md w-full relative">
              <span
                className="text-gray-700 hover:text-gray-800 cursor-pointer text-4xl font-bold absolute top-0 right-3"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                &times;
              </span>
              <h3 className="text-xl font-bold pb-4">Edit Details</h3>

              <div className="flex flex-col gap-2">
                <label>
                  First Name:
                  <input
                    placeholder="john"
                    className="w-full border rounded p-2 outline-none bg-white"
                    type="text"
                    value={userToEdit.name || ""}
                    onChange={(e) =>
                      setUserToEdit({
                        ...userToEdit,
                        name: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Email:
                  <input
                    placeholder="doe"
                    className="w-full border rounded p-2 outline-none bg-white"
                    type="text"
                    value={userToEdit.email || ""}
                    onChange={(e) =>
                      setUserToEdit({
                        ...userToEdit,
                        email: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Password:
                  <input
                    placeholder="john@gmail.com"
                    className="w-full border rounded p-2 outline-none bg-white"
                    type="string"
                    value={userToEdit.password || ""}
                    onChange={(e) =>
                      setUserToEdit({ ...userToEdit, password: e.target.value })
                    }
                  />
                </label>
              </div>

              <button
                onClick={() => handleEdit(userToEdit._id)}
                className="bg-black text-white uppercase mt-3 px-4 py-2 rounded float-end"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {isAddModalOpen && (
          <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-200 py-4 px-5 rounded-lg shadow-lg max-w-md w-full relative">
              <span
                className="text-gray-700 hover:text-gray-800 cursor-pointer text-4xl font-bold absolute top-0 right-3"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                &times;
              </span>
              <h3 className="text-xl font-bold pb-4">Edit Details</h3>

              <div className="flex flex-col gap-2">
                <label>
                  First Name:
                  <input
                    placeholder="john"
                    className="w-full border rounded p-2 outline-none bg-white"
                    type="text"
                    value={userToEdit.name || ""}
                    onChange={(e) =>
                      setUserToEdit({
                        ...userToEdit,
                        name: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Email:
                  <input
                    placeholder="doe"
                    className="w-full border rounded p-2 outline-none bg-white"
                    type="text"
                    value={userToEdit.email || ""}
                    onChange={(e) =>
                      setUserToEdit({
                        ...userToEdit,
                        email: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Password:
                  <input
                    placeholder="john@gmail.com"
                    className="w-full border rounded p-2 outline-none bg-white"
                    type="string"
                    value={userToEdit.password || ""}
                    onChange={(e) =>
                      setUserToEdit({ ...userToEdit, password: e.target.value })
                    }
                  />
                </label>
              </div>

              <button
                onClick={() => handleEdit(userToEdit._id)}
                className="bg-black text-white uppercase mt-3 px-4 py-2 rounded float-end"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {isAddModalOpen && userToEdit && (
          <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-200 py-4 px-5 rounded-lg shadow-lg max-w-md w-full relative">
              <span
                className="text-gray-700 hover:text-gray-800 cursor-pointer text-4xl font-bold absolute top-0 right-3"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                &times;
              </span>
              <h3 className="text-xl font-bold pb-4">Edit Details</h3>

              <div className="flex flex-col gap-2">
                <label>
                  First Name:
                  <input
                    placeholder="john"
                    className="w-full border rounded p-2 outline-none bg-white"
                    type="text"
                    value={userToEdit.name || ""}
                    onChange={(e) =>
                      setUserToEdit({
                        ...userToEdit,
                        name: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Email:
                  <input
                    placeholder="doe"
                    className="w-full border rounded p-2 outline-none bg-white"
                    type="text"
                    value={userToEdit.email || ""}
                    onChange={(e) =>
                      setUserToEdit({
                        ...userToEdit,
                        email: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Password:
                  <input
                    placeholder="john@gmail.com"
                    className="w-full border rounded p-2 outline-none bg-white"
                    type="string"
                    value={userToEdit.password || ""}
                    onChange={(e) =>
                      setUserToEdit({ ...userToEdit, password: e.target.value })
                    }
                  />
                </label>
              </div>

              <button
                onClick={() => handleEdit(userToEdit._id)}
                className="bg-black text-white uppercase mt-3 px-4 py-2 rounded float-end"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserData;
