import { defineStore } from 'pinia'

export const useStore  = defineStore('storeId', {
  state: () => {
    return {
        adminMockAccount: {
            username: 'admin@gmail.com',
            password: 'admin1234',
        },
        userMockAccount: {
            username: 'user@gmail.com',
            password: 'user1234',
      },
    }
  },
})

export default useStore 