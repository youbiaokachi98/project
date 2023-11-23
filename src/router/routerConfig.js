const routerArr = [
    {
        path:"/login",
        component: () => import("@/views/Login.vue")
    },
    {
        path:"/register",
        component: () => import("@/views/Register.vue")
    },
    {
        path:"/home",
        component: () => import("@/views/Home.vue"),
        children: [
            {
                path:"/photoMange",
                component: () => import("@/views/photoMange.vue"),
            }
        ]
    }
]

export default routerArr