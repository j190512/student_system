import Login from  './views/Login.vue'

let routes = [
    {
        path:'/login',
        component:Login,
    },
    {
        path:'/home',
        component :() =>import('./views/Home.vue'),
        children:[
            {path:'/home/first',component:() => import('./nav1/first.vue'),name:'一年级'},
            {path:'/home/second',component:() => import('./nav1/second.vue'),name:'二年级'},
            {path:'/home/three',component:() => import('./nav1/three.vue'),name:'三年级'},
            {path:'/home/nav2',component:() => import('./nav2/pg1.vue'),name:'nav2-pg1'},
            {path:'/home/nav3',component:() => import('./nav3/pg1.vue'),name:'nav3-pg1'},
        ]
    },{
        path:'*',
        component:() => import('./404.vue')
    }
]

export default routes;