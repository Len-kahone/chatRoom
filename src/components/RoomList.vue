<!--  -->
<template>
  <div class="roomList">
    <h5>聊天室列表</h5>
    
    <div class="room" :class="room.id==activeRoom.id?'active':''"  v-for="room in rooms"  @click="onChange(room)"
        :key="room.name">
      # {{ room.name }}
      
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
import { log } from 'util'
  export default {
    components: {},
    data() {
      return {}
    },
    computed: {
      ...mapState(['rooms', 'activeRoom'])
    },
    watch: {},
    //方法集合
    methods: {
      ...mapActions(['changeRoom']),
      onChange(room) {
        this.changeRoom(room.id)
      }
    },
    created() {},
    mounted() {
      // console.log(this.activeRoom);
    }
  }
</script>
<style lang="scss" scoped>
  .roomList {
    display: inline-block;
    box-sizing: border-box;
    flex:1;
    height: 100%;
    border-right: 1px solid #17a2b8;
    background: rgba(0,0,0,.8);
    // padding: 10px;
    overflow-y:auto;
    text-align: center;
    color:#4ca2ff;
    // overflow: scroll;  
    .room{
      border-radius: 5px;
      // border-bottom: 1px solid #4ca2ff;
      background-color: rgba(255,255,255,.2);
      margin-bottom:10px; 
    }
    .room.active{
       background-color: #17a2b8;
       color:#fff;
    }
    .room:hover{
       background-color: #17a2b8;
       color:#fff;
    }
    h5 {
      text-align: center;
      line-height: 24px;
    }
  }
</style>
