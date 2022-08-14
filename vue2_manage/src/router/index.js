import VueRouter from 'vue-router'
// 引入组件
// import Home from '../views/Home'
// import User from '../views/User'

// 创建一个路由器
const router = new VueRouter({
    routes:[
        {
            path:'/',
            name:'main',
            component:() => import('../views/Main.vue'),
            children: [
                {
                    path:'/home',
                    name:'home',
                    component:() => import('../views/Home.vue')
                },
                {
                    path:'/user',
                    name:'user',
                    component:() => import('../views/User.vue')
                },
                {
                    path:'/mall',
                    name:'mall',
                    component:() => import('../views/Mall.vue')
                },
                {
                    path:'/pageone',
                    name:'pageone',
                    component:() => import('../views/other/PageOne.vue')
                },
                {
                    path:'/pagetwo',
                    name:'pagetwo',
                    component:() => import('../views/other/PageTwo.vue')
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component:() => import('../views/Login.vue')
        }
    ]
})

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default router