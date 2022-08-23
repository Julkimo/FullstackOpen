import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${ baseUrl }/${id}`, newObject)
  const response = request
  return response.data
}

const remove = async (id, removeableBlog) => {
  console.log(`${ baseUrl }/${id}`)
  const response = await axios.delete(`${ baseUrl }/${id}`, removeableBlog)
  return response.data
}

export default { getAll, create, update, setToken, remove }