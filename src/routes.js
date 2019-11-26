import Login from  './views/Login.vue'

let routes = [
    {
        path:'/',
        component:Login,
    },
    {
        path:'/home',
        component :() =>import('./views/Home.vue'),
        children:[
            {path:'/home/freshman',component:() => import('./nav1/Freshman.vue'),name:'大一'},
            {path:'/home/sophomore',component:() => import('./nav1/Sophomore.vue'),name:'大二'},
            {path:'/home/junior',component:() => import('./nav1/Junior.vue'),name:'大三'},
            {path:'/home/nav2',component:() => import('./nav2/pg1.vue'),name:'nav2-pg1'},
            {path:'/home/nav3',component:() => import('./nav3/pg1.vue'),name:'nav3-pg1'},
        ]
    },
]

export default routes;