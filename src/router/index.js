import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import('../views/Home.vue')
const Login = () => import('../views/Login.vue')
const LeftMenu = () => import('../views/LeftMenu.vue')
const BottomBar = () => import('../components/bottombar/BottomBar')
const Personal = () => import('../components/discover/Personal.vue')
const SongList = () => import('@/components/songlist/SongList')
const Single = () => import("@/components/single/Single")
const SearchMain = () => import("@/components/search/SearchMain")

Vue.use(VueRouter)
//使用路由懒加载更好(用到这个组件才加载)
// const Personal = () => import('../components/discover/Personal.vue')
//子组件的/最好不要加，因为自己会补充上去的
//router中的name相当于path的别名，路由传参时就可用此名或者用路径

const routes = [
  {
    path: '/',
    redirect: 'personalized',
    component: Home,
    name:'home',
    children: [
      {
        path: 'personalized',
        meta: {
          index: 0,
        },
        components: {
          default: Personal,
          top: Login,
          aside: LeftMenu,
          bottombar:BottomBar
        }
      }
    ],
    meta: {
      name:'个人推荐'
    }
  },
  {
    path: '/search:keywords',
    name: 'search',
    component: Home,
    children: [
      {
        path: '/search:keywords',
        meta: {
          index: 1,
        },
        components: {
          default: SearchMain,
          top: Login,
          aside: LeftMenu,
          bottombar:BottomBar
        }                                               
      }
    ],
    meta: {
      name:'关键词搜索'
    }
  },
  {
    path: '/login/cellphone',
    name:'login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/songs:id',
    name:'MusicList',
    component: Home,
    children: [
      {
        path: '/songs:id',
        meta: {
          index: 2,
        },
        components: {
          default: SongList,
          top: Login,
          aside: LeftMenu,
          bottombar:BottomBar
        }
      }
    ],
    meta: {
      name:'歌单'
    }
  },
  {
    path: '/single',
    name:'single',
    component: Home,
    children: [
      {
        path: '/single',
        meta: {
          index: 3,
        },
        components: {
          default: Single,
          top: Login,
          aside: LeftMenu,
          bottombar:BottomBar
        }
      }
    ],
    meta: {
      name:'歌曲详情'
    }
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})
// 全局导航守卫(还有单个组件和路由独享的守卫)   比如首页跳转到后台管理判断是否登录，或者是一个页面切另一个页面标题也改变
// router.beforeEach((to, from, next) => {   此为前置钩子（hook）跳转前用   后置为router.afterEach((to,from){}) 不用写next()
//从from 跳转至to
//document.title = to.matched[0].meta.title
// next()  一定要写 因为你重写覆盖了之前的方法，而这个next（）之前会自动调用
// })    


/*  Avoided redundant navigation to current location: “/xxx”. 的解决方案 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
