import { request } from "./request";


//获得10个推荐歌单
export async function getMusicList() {
    const res = await request({
        url: '/personalized',
    })
    // console.log(res.result.slice(0,10));
    return  res.result.slice(0,10)
}

// export async function getPlayList() {
//     const res = await request({
//         url: '/playlist/hot',
//         method:'post'
//     })
//     console.log(res.tags);
//     return res
// }

// export function getSwiper1() {
//     return request({
//         url:"/banner"
//     })
// }

export async function getSwiper() {
    const res = await request({
        url:'/banner'      
    })
    return res.banners
}
/* 获取歌单详情 */
export function getSongListInfo(id) {
    return request({
        url: '/playlist/detail',
        params: {
            id:id
        }
    })
}

/* 获取某首歌曲的url */
export function getMusicUrl(musicId) {
    return request({
        url: '/song/url',
        params: {
            id:musicId
        }
    })
}

/* 获取歌曲详情 */
export function getMusicMenu(musicId) {
    return request({
        url:"/song/detail",
        params:{
           ids:musicId,
        }
    })
}

//获取歌词
export function getSongLyric(id) {
    return request({
        url: "/lyric",
        params: {
            id
        }
    })
}

/* 获取歌曲评论 */
export function getSongComment(id,limit=20,offset=0) {
    return request({
        url: "/comment/music",
        params: {
            id,
            limit,
            offset
        }
    })
}


