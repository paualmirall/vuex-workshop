import axios from 'axios'
import bus, {
  PROGRESS_START,
  PROGRESS_FINISH
} from '../utils/bus'

let prefix = '/api/'

if (process.env.VUE_ENV === 'server') {
  prefix = `https://localhost:${process.env.PORT_HTTPS}${prefix}`
}

export default function setup () {
  // Handle finishing application progress state
  axios.interceptors.request.use(
    response => {
      bus.$emit(PROGRESS_START)
      return response
    },
    error => {
      bus.$emit(PROGRESS_FINISH)
      throw error
    }
  )

  // Handle finishing application progress state
  axios.interceptors.response.use(
    response => {
      bus.$emit(PROGRESS_START)
      return response
    },
    error => {
      bus.$emit(PROGRESS_FINISH)
      throw error
    }
  )
}

export function create (url, options = {}) {
  const instance = axios.create(Object.assign({ baseURL: url }, options))
  return instance
}

export const product = axios.create({ baseURL: `${prefix}product/` })
export const basket = axios.create({ baseURL: `${prefix}basket/` })
