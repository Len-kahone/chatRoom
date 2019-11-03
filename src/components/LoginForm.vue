<template>
  <div id="loginForm">
    <h3>欢迎来到my-chat聊天室</h3>
    <el-form
      label-position="left"
      ref="form"
      :model="formData"
      label-width="0px"
    >
      <el-form-item>
        <el-input
          size="medium"
          placeholder="请输入用户名"
          clearable
          v-model="formData.name"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="logining" type="primary" @click="onSubmit">{{loginTips}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    components: {},
    data() {
      return {
        formData: {
          name: 'kahone'
        },
        logining:false,
        loginTips:"登录"
      }
    },
    computed: {},
    watch: {},
    //方法集合
    methods: {
      ...mapActions(['login']),
      onSubmit() {
        this.logining=true
        this.loginTips="登录中"
        this.login(this.formData.name).then(res => {
          if (res) {
            this.$router.push('chatRoom')
          }
        })
      }
    },
    created() {},
    mounted() {}
  }
</script>
<style lang="scss" scoped>
  #loginForm {
    width: 500px;
    background-color: #ccc;
    padding: 60px;
    opacity: 0.8;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .el-button {
    width: 100%;
  }
</style>
