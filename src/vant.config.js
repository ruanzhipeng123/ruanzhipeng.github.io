import { Toast, Skeleton, Empty, Icon } from 'vant'

const vants = [Toast, Skeleton, Empty, Icon]

export default {
    /**
     * Vue.use 方法会自动调用install函数
     * Install Vant Component plugin
     * 
     */
    install(Vue) {
        vants.forEach(Component => {
            Vue.use(Component)
        })
    }
}