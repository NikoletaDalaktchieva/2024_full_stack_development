import axios from "axios";
const baseUrl =
  "https://two024-full-stack-development.onrender.com/api/persons";

// const baseUrl = "http://localhost:3001/api/persons/";
const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  console.log(newObject);
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  deletePerson: deletePerson,
};
