import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  uID: '',
  userSongList: [],
  songSheetID: [], //歌单id
  musicListUrl: '', //要播放的音乐的url
  nowMusicID: 0,//存放要播放的上一首和下一首音乐的id
  songIDS:[], //所有音乐的id
  musicListUrls: [],//所有音乐的url
  nowMusic: '', //存放要播放的上一首和下一首url
  isListPlay:false, //是否按列表播放
  updateTime: false,
  isPlaying:false,//歌曲是否正在播放
  isChange: false, //是否通过左右按钮切换歌曲,
  nowMusicMenu: {},
  musicDuration: 0,
  // musicCount: 0
}


const mutations = {
  setUID(state, id) {
    state.uID = id
  },
  setUserSongList(state, arr) {
    state.userSongList = arr
  },
  //保存歌单的id
  setSongSheetID(state, id) {
    state.songSheetID = id
  },
  //保存要播放的音乐的地址
  setMusicListUrl(state, url) {
    state.musicListUrl = url
  },
  //保存要播放的音乐的id(通过左右按钮)
  setNowMusicID(state,id) {
    state.nowMusicID=id
  },
  //保存歌单所有音乐的地址
  setMusicListUrls(state,url) {
    state.musicListUrls.push(url)
  },
  //保存歌单所有音乐的id
  setSongIDS(state,id) { 
    state.songIDS.push(id)
  },
  //清空当前歌单所有音乐id和地址
  setMusicListUrlsNull(state){
    state.musicListUrls = [],
    state.songIDS=[]
  },
  //列表播放
  setListPlay(state,info) {
    state.isListPlay=info
  },
  //设置音乐时间更新
  setTime(state) {
    state.updateTime = true
  },
  //保存此时播放的音乐所有信息
  setNowMusicMenu(state, info) {
    state.nowMusicMenu = info
  },
  //设置是否正在播放
  setIsPlaying(state,info) {
    state.isPlaying=info
  },
  //设置当前歌曲进度
  setMusicDuration(state,info) {
    state.musicDuration=info
  }
}


const getters = {
  getUserSongList(state) {
    if (state.userSongList.length > 0) {
      return state.userSongList
    }
  },
  getMusicListUrl(state) {
    return state.musicListUrl
  },
  getIsPlaying(state){
    return state.isPlaying
  },
  //得到上一首url
  getPreUrl(state) {
    state.musicListUrls.forEach((item, index) => {
      if (item == state.musicListUrl) {
        if (index == 0) {
          state.nowMusic = state.musicListUrls[index]
          state.nowMusicID = state.songIDS[index]
        }
        else {
          state.nowMusic = state.musicListUrls[index - 1]
          state.nowMusicID = state.songIDS[index-1]
        }
      }
      })
  },
  //得到下一首url
  getNextUrl(state) {
    state.musicListUrls.forEach((item, index, arr) => {
      if (item == state.musicListUrl) {
        // 如果index等于最后一首那就继续播放当前这首
        if (index == (arr.length - 1)) {
          state.nowMusic = state.musicListUrls[index]
          state.nowMusicID = state.songIDS[index]
        }
        else {
          // return state.musicListUrls[index+1]
          state.nowMusic = state.musicListUrls[index+1]
          state.nowMusicID = state.songIDS[index+1]
        }
      }
      })
  },
  getNowMusic(state) {
    return state.nowMusic
  },
  getUpdateTime(state) {
    return state.updateTime
  },
  //获得歌曲详情
  //vue中的js引入图片，必须require进来 或者引用网络地址
  getNowMusicDetail(state) {
    //由于可能页面先渲染了，但数据（axios中）还没到位，这个时候给该部分页面条件渲染或者如下先赋上默认值
    if (state.nowMusicMenu.al === undefined) {
      return state.nowMusicMenu = {
        name: '歌名',
        id:0,
        al: {
          id: 0,
          name:'专辑',
          picUrl: require('@/assets/img/preview.jpg'),
        },
        ar: [{
          id:0,
          name: '歌手'
        }],
      }
    }
    else {
      return state.nowMusicMenu
    }
  },
  getMusicDuration(state) {
    return state.musicDuration
  }
}
const actions = {

}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
  }
})
