<template>
  <b-navbar id="chat-navbar" toggleable="md" type="dark" variant="info">
    <b-navbar-brand href="#">
      啊啊啊，快活吧~
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <i class="el-icon-user-solid" @click="change"></i>
      <b-nav-text>{{ user.name }} | </b-nav-text>
      <b-nav-item href="#" @click="onLogout" active>退出登陆</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex'

  export default {
    name: 'ChatNavBar',
    computed: {
      ...mapState(['user',"reconnect"])
    },
    methods: {
      ...mapMutations([
      'setReconnect'
    ]),
      ...mapActions(['login', 'logout',"changeName"]),
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
      change(){
        // console.log(this.user);
        this.changeName({name:"kkk",id:"kahone"})
        
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

<style>
  #chat-navbar {
    /* margin-bottom: 15px; */
  }
</style>
