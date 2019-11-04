<template>

  <div class="header">
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

export default {
  name: 'ChatNavBar',
  computed: {
    ...mapState(['user', "reconnect"])
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
      // console.log(this.user);
      this.changeName({ name: "kkk", id: "kahone" })

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
  padding:0 10px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  background-color:#4c413d;
  color:#fff;
  opacity: .7;
  align-items: center;
  .setting{
    display: flex;
    .user{
      i{
        color:#007bff;
      }
    }
  }
  // background-color: red;
}
</style>
