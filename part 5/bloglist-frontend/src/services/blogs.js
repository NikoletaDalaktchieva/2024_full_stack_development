import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
   return axios.post(baseUrl, newObject, config);
}


export default { getAll, setToken, create }