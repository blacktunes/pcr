import axios from 'axios'

export const serverUrl = 'https://www.feizhouxianyu.cn:8931'
// export const serverUrl = 'http://127.0.0.1:8930'

export function addRecord (data) {
  return axios({
    method: 'post',
    url: `${serverUrl}/addRecord`,
    data: data
  })
}

export function getRecord (data) {
  return axios.get(`${serverUrl}/getRecord?king=${data.king}&round=${data.round}`)
}

export function editRecord (data) {
  return axios({
    method: 'post',
    url: `${serverUrl}/editRecord`,
    data: data
  })
}

export function getTotal () {
  return axios.get(`${serverUrl}/getTotal`)
}

export function hideRecord (id) {
  return axios.get(`${serverUrl}/hideRecord?id=${id}`)
}
