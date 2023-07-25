import axios from "./customize-axios"; // import axios is import instance

const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};

const postCreateUser = (name, job) => {
  return axios.post("/api/users", { name, job });
};

const updateUser = (name, job, id) => {
  return axios.put(`/api/users/${id}`, { name, job });
};

const deleteUser = (id) => {
  return axios.delete(`/api/user/${id}`);
};

export { fetchAllUser, postCreateUser, updateUser, deleteUser };
