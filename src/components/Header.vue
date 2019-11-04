<template>

  <div
    class="header"
    v-loading.fullscreen.lock="isLoading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div>公告</div>
    <div class="setting">
      <div class="user">
        <i
          class="el-icon-user-solid"
          @click="change"
        ></i>
        <span>{{ user.name }}|</span>
      </div>
      <div
        @click="onLogout"
        class="logout"
      >退出登陆</div>
    </div>
  </div>

</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
const Chatkit = require('@pusher/chatkit-server')

export default {
  name: 'ChatNavBar',
  computed: {
    ...mapState(['user', "reconnect", "isLoading"])
  },
  methods: {
    ...mapMutations([
      'setReconnect'
    ]),
    ...mapActions(['login', 'logout', "changeName"]),
    onLogout() {
      this.$router.push({ path: '/' })
      this.logout()
    },
    unload() {

      if (this.user.id) {
        // User hasn't logged out
        this.setReconnect(true)
      }
    },
    change() {
      const chatkit = new Chatkit.default({
        instanceLocator: 'v1:us1:10c8d7fe-2aa4-4114-a777-ab09c9744fd5',
        key:
          '27d362f3-2b81-4f60-8cf4-91a58770627a:Fdl0CR0f6CNZyyOaKV6KS2vmfqIv5C7ENj8puD+DId0='
      })

      chatkit
        .createUser({
          id: 'kkkkc',
          name: 'kkkkc'
        })
        .then(() => {
          console.log('User created successfully')
        })
        .catch(err => {
          console.log(err)
        })

    }
  },
  mounted() {
    window.addEventListener('beforeunload', this.unload)


    if (this.reconnect) {
      this.login(this.user.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 0 10px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  background-color: #4c413d;
  color: #fff;
  opacity: 0.7;
  align-items: center;
  .setting {
    display: flex;
    .user {
      i {
        color: #007bff;
      }
    }
  }
  // background-color: red;
}
</style>
