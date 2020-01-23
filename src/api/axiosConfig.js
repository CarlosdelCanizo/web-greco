import axios from 'axios'

const instance = axios.create({
  baseURL: "http://10.0.10.195:8088/"
})


export default instance
