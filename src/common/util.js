//将进度条的时间戳格式化
export function formatTime(time) {
  let timee = parseInt(time)
  //对于60求余，因为当分钟大于60，timee/60得小时部分，再求余得分
      let m1 = parseInt(timee/60%60);
      let m = Math.round(m1);
       m= m<10?'0'+m:m;
      let s = Math.round(timee%60);
       s= s<10?'0'+s:s;
      return  m + ":" + s;
}
//歌曲表格中的时间格式化
export function songTimeFormat(time) {
  let timee = parseInt(time / 1000);
  var minute = timee / 60;
  var minutes = parseInt(minute);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  //秒
  var second = timee % 60;
  var seconds = Math.round(second);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
}

//时间戳转换为时间格式字符串(评论页面)
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};