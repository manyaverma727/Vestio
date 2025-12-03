import axios from 'axios'

export const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    'http://10.7.26.153:3001'

export const loginUser = (email, password) =>
    axios.post(`${API_BASE_URL}/api/login`, { email, password })


