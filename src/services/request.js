import axios from 'axios'

let instance = axios.create({
    baseURL: 'http://223.167.61.21:6185',
    timeout: 5000
})

// 请求拦截
instance.interceptors.request.use(config => {
    config.headers['token'] = window.sessionStorage.getItem('token')
    return config
}, err => {
    console.log('errinfo:' + err)
})


// 响应拦截
instance.interceptors.response.use(response => {
    return response.data
}, err => {
    console.log('errinfo:' + err)
})

export default instance