import { request } from "./request";

export function getSearch(keywords,limit=20,offset=0,type=1){
    return request({
        url: "/search",
        params: {
            keywords,
            limit,
            offset,
            type
        }
    })
}