import axios from 'axios'

const instance = axios.create({
  baseURL: "https://generationsolar.ies.upm.es/api"
})

export default instance
