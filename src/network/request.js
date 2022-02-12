import axios from 'axios'
/* 让ajax带上cookie  因为许多接口要看是否登录，请求头得带上cookie*/
axios.defaults.withCredentials=true;

//封装axios
export function request(config) {
    const instance1 = axios.create({
        baseURL: 'http://localhost:3000',
        timeout:300000
    })
    //请求拦截
    instance1.interceptors.request.use(config => {
        //GET 请求不存在请求实体部分，键值对参数放置在 URL 尾部,所以一般就post可能用下面的代码
        // config.headers["Content-type"] = 'application/x-www-form-urlencoded';
        // if (localStorage.token) { //判断token是否存在
        //     config.headers.Authorization = localStorage.token;  //将token设置成请求头
        //     console.log("请求头设置成功");
        //     console.log(`请求头为${localStorage.token}`);
        //   }
        return config
    }, err => {
        console.log('请求失败');
    })  
    //响应拦截  axios 封装了数据,返回后里面的data才是真正的数据
    instance1.interceptors.response.use(res => {
        return res.data
    }), err => {
        console.log('响应失败');
        }
    //axios.create的返回值是一个promise对象！
    //这里instance1 是个axios实例 它()中接受传来url 请求方式
    return instance1(config)
}
/* 3.1  封装axios的原因
1.  如果不封装axios，就在所有需要数据库的组件中通过axios发送请求。

2.  如果未来需要更换请求的第三方库，就需要更换所有导入axios库的组件。

3.  如果axios请求出现了问题，需要调整，就需要在所有使用了axios的组件中进行调整，不利于后期的维护。

因此需要对axios进行封装，这样所有需要发送请求的组件都只要使用我们封装的模块就行了，后期调整只需要修改我们封装过的模块即可。
 */