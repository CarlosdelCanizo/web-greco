import axios from 'axios'

const instance = axios.create({
  //baseURL: "https://generationsolar.ies.upm.es/api"
  baseURL: "http://10.0.10.195:8088/"
})

export default instance
