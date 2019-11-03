<!--  -->
<template>
  <div class="main">
    <RoomList></RoomList>
    <MessageList></MessageList>
    <UserList></UserList>
  </div>
</template>

<script>
  import RoomList from '@/components/RoomList'
  import MessageList from '@/components/MessageList'
  import UserList from '@/components/UserList'
  export default {
    components: {
      RoomList,
      MessageList,
      UserList
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
.main{
  width: 100%;
  height: calc(100% - 56px);
  display: flex;
}

</style>
