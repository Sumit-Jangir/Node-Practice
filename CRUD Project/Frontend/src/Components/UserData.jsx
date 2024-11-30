import React, { useEffect, useState } from "react";
import axios from "axios";

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [addUser, setAddUser] = useState({});
  const [errorMessage, setErrorMessage] = useState({
    email:""
  });

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:7000/auth/find");
      // console.log(response);
      if (response.status === 200) {
        // console.log(response.data);
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
      if(error.response){
        
        setErrorMessage({email:error.response.data.message})

        setTimeout(() => {
          setErrorMessage({ email: "" }); 
        }, 3000);
      }
      console.error("Failed to update user");
    }
  };
  
  
  const handleAddUser = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await axios.post("http://localhost:7000/auth/save", {
        ...addUser,
      });
      
      if (response.status === 200) {
        setUsers((prev) => [...prev, addUser]);
        getUser();
        console.log("<<<<users>>>>", response.data);
        
        setIsAddModalOpen(false);
        setErrorMessage({ email: "" });
        
        alert("User Added successfully");
      }
    } catch (error) {
      if (error.response.data.message) {
        setErrorMessage({email : error.response.data.message});

        setTimeout(() => {
          setErrorMessage({ email: "" }); 
        }, 3000);
      } 
      else {
        setErrorMessage("An unexpected error occurred.");
      }
      console.log("Failed to add user");
    }
  };
  
  return (
    <>
      <div className="w-full h-screen">
        <div className="justify-self-center  my-10">
          <button
            className="bg-green-600 px-3 py-1 rounded-lg my-3 "
            onClick={() => {
              setIsAddModalOpen(true);
            }}
          >
            Add User
          </button>
        </div>

        <div className="flex flex-wrap justify-evenly items-center m-10 gap-20">
          {users.map((item, index) => (
            <div key={index} className="bg-white w-60 rounded-md p-4 m-3">
              <p>Name: {item.name}</p>
              <p>Email: {item.email}</p>
              {/* <p>Password: {item.password}</p> */}

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
                  Name:
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
                    type="email"
                    value={userToEdit.email || ""}
                    onChange={(e) =>
                      setUserToEdit({
                        ...userToEdit,
                        email: e.target.value,
                      })
                    }
                  />
                </label>
                {errorMessage.email && <p style={{ color: "red" }}>{errorMessage.email}</p>}


                {/* <label>
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
                </label> */}
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
                onClick={() => setIsAddModalOpen(false)}
              >
                &times;
              </span>
              <h3 className="text-xl font-bold pb-4">Edit Details</h3>

              <form
                onSubmit={handleAddUser}
                className="flex flex-col gap-2"
              >
                <label>
                  Name:
                  <input
                    placeholder="john"
                    
                    className="w-full border rounded p-2 outline-none bg-white"
                    type="text"
                    required
                    // value={userToEdit.name || ""}
                    onChange={(e) =>
                      setAddUser({
                        ...addUser,
                        name: e.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Email:
                  <input
                    placeholder="john@gmail.com"
                    className="w-full border rounded p-2 outline-none bg-white"
                    type="email"
                    required
                    // value={userToEdit.name || ""}
                    onChange={(e) =>
                      setAddUser({
                        ...addUser,
                        email: e.target.value,
                      })
                    }
                  />
                </label>
                {errorMessage.email && <p style={{ color: "red" }}>{errorMessage.email}</p>}


                <label>
                  Password:
                  <input
                    placeholder="Enter password"
                    className="w-full border rounded p-2 outline-none bg-white"
                    type="password"
                    required
                    // value={userToEdit.name || ""}
                    onChange={(e) =>
                      setAddUser({
                        ...addUser,
                        password: e.target.value,
                      })
                    }
                  />
                </label>

                
                <button
                  type="submit"
                  className="bg-black text-white uppercase mt-3 px-4 py-2 rounded float-end"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserData;
