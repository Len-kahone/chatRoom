<!-- 登录页面 -->
<template>
  <div class="login">
    <LoginForm></LoginForm>
  </div>
</template>

<script>
  import LoginForm from "@/components/LoginForm"
  export default {
    components: {
      LoginForm
    },
    data() {
      return {
        formData:{
          name:""
        }
      }
    },
    computed: {},
    watch: {},
    //方法集合
    methods: {
      
    },
    created() {},
    mounted() {}
  }
</script>
<style lang="scss" scoped>
  .login{
    width: 100%;
    height: 100%;
    justify-content: center;
    background: url("../assets/bgc.jpg");
    background-size:100% 100%;  
    display: flex;
    align-items: center;
   
  }
</style>
