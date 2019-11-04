<!--  -->
<template>
  <div class="roomList">
    <h3>聊天室列表</h3>
    <b-list-group>
      <b-list-group-item
        v-for="room in rooms"
        :key="room.name"
        :active="activeRoom.id === room.id"
        href="#"
        @click="onChange(room)"
      >
        # {{ room.name }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
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
    mounted() {}
  }
</script>
<style lang="scss" scoped>
  .roomList {
    display: inline-block;
    flex:1;
    height: 100%;
    border-right: 1px solid #17a2b8;
    h3 {
      text-align: center;
    }
  }
</style>
