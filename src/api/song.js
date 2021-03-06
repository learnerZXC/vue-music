import { commonParams } from './config'
import axios from 'axios'

export function getMusic(songmid) {
  const url = '/api/getMusic'

  const data = Object.assign({}, commonParams, {
    songmid: songmid,
    filename: 'C100' + songmid + '.m4a',
    guid: 769937799,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    Uin: 0,
    cid: 205361747,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    g_tk: 5381,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}