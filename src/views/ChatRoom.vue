<!--  -->
<template>
  <div class="chatRoom">
    <Header></Header>
   <Main></Main>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import Main from '@/components/Main'

  export default {
    components: {
      Header,
      Main
    },
    data() {
      return {}
    },
    computed: {},
    watch: {},
    //方法集合
    methods: {},
    created() {},
    mounted() {}
  }
</script>
<style lang="scss" scoped>
  .chatRoom{
   height: 100%;
  }
</style>
