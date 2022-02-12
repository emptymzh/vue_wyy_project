import { request } from "./request";

export function getPhoneLogin(phone, password) {
   return  request({
        url: '/login/cellphone',
        params: {
            phone,
            password
        }
    })
}

export  function getPhoneOut() {
    return  request({
        url:'/logout'
    })
}

export function getStatus() {
    return  request({
        url:'/login/status'
    })
}

export function getUserSongList(uid) {
    return request({
        url: 'user/playlist',
        params: {
            uid
        }
    })
}