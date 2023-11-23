import { createRouter, createWebHashHistory } from "vue-router"
import routerArr from './routerConfig'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [...routerArr]
})

export default router