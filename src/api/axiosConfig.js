import axios from 'axios'

const instance = axios.create({
  baseURL: "http://10.0.10.195:8088/"
  // baseURL: "https://generationsolar.ies.upm.es/api"
})

export default instance
