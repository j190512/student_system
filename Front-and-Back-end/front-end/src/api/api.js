import axios from 'axios'
let baseUrl ='http://localhost:8081'
//登录
export function login(params){
    return axios({
        method:'post',
        url:`${baseUrl}/login`,
        data:params,
    })
}
//获取数据
export function getStudents(){
    return axios({
        method:'get',
        url:`${baseUrl}/getStudents`
    })
}
//修改数据
export function modify(params){
    return axios({
        method:"post",
        url:`${baseUrl}/modify`,
        data:params
    })
}
//新增数据
export function add(params){
    return axios({
        method:"post",
        url:`${baseUrl}/add`,
        data:params
    })
}
//删除数据
export function removeId(params){
    return axios({
        method:"get",
        url:`${baseUrl}/del`,
        params:{
            id:params
        }
    })
}