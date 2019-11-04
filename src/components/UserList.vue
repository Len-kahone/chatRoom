<template>
    <div class="user-list">
      <h4>在线人员</h4>
      <hr>
      <b-list-group>
        <b-list-group-item v-for="user in users" :key="user.username">
          {{ user.name }}
          <b-badge v-if="user.presence"
          :variant="statusColor(user.presence)"
          pill>
          {{ user.presence }}</b-badge>
        </b-list-group-item>
      </b-list-group>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex'
  
  export default {
    name: 'user-list',
    computed: {
      ...mapState([
        'loading',
        'users'
      ])
    },
    methods: {
      statusColor(status) {
        return status === 'online' ? 'success' : 'warning'
      }
    },
    mounted() {
      // console.log(this.users);
      
    },
  }
  </script>
  <style lang="scss" >
    .user-list{
      border-left: 1px solid #17a2b8;
      flex:1;
    }
  </style>