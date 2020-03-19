import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd'
export default class Axios {
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(options.url, {
        param: 'callback'
      }, (err, res) => {
        if (res.status === 'success') {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  }

  static axios(options) {
    // let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
    let baseApi = 'http://106.12.220.186:4000/api/'
    return new Promise((resolve, reject) => {
      return axios({
        url: options.url,
        method:'get',
        baseURL:baseApi,
        params: (options.data && options.data.params) || ''
      }).then(response => {
        let res = response.data;
        if (response.status === 200) {
          if (res.code == 0){
              resolve(res);
          }else{
              Modal.info({
                  title:"提示",
                  content:res.message
              })
          }
        } else {
          reject(res)
        }
      }).catch(e => {
        console.error(e)
      })

    })
  }
}