import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  state: () => {
    return {
        userInfo:{}
    }
  },
  actions: {
    changeUserInfo(value) {
      this.userInfo = value
    },
    clearUserInfo(){
      this.userInfo = {}
    }
  },
})