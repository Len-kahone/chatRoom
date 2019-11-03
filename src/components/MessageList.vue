<!--  -->
<template>
  <div id="messageList">
    <h3>消息</h3>
    <div class="user-typing">
      <small class="text-muted" v-if="userTyping"
        >@{{ userTyping }}正在输入....</small
      >
    </div>
    <div class="messageList" v-chat-scroll="{smooth: true}">
      <div
        class="messageBox "
        :class="user.id===message.id?'myself':'other'"
        v-for="(message,index) in messages"
      >
       
        <img class="avatar" src="@/assets/man.jpg" alt="" />
        <div class="text">
            <i  @click="deleteMsg(message)" v-if="user.id===message.id" class=" delete el-icon-circle-close"></i>
          <div class="other">
            <div class="userName">{{ message.name }}</div>
            <div class="time">{{ message.date }}</div>
          </div>
          <div class="message" v-for="(item,index) in message.content">
            <!-- {{item.text||item.img}} -->
            <span v-if="item&&item.text">{{ item.text }}</span>
            <img v-if="item&&item.img" :src="item.img" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="messageForm">
      <div class="edit">
        <el-input
          placeholder="请输入内容"
          @keyup.native="isTyping"
          @keyup.enter.native="onSubmit"
          v-model="input"
          clearable
          :disabled="sending"
        >
          <!-- <input type="text "  @keydown.13="onSubmit" v-model="input"> -->
        </el-input>
        <el-button type="primary" :loading="sending" @click="onSubmit">{{
          tips
        }}</el-button>
      </div>
      <div class="tools">
        <!-- <input id="files" type="file"> -->
        <el-upload
          class="upload-demo"
          ref="upload"
          action=""
          multiple
          :file-list="fileList"
          :on-change="selectFile"
          :auto-upload="false"
          list-type="picture"
        >
          <i class="el-icon-folder-add" slot="trigger"></i>
          <!-- <el-button  size="small" type="primary"
            >选取文件</el-button
          > -->
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { isTyping } from '@/utils/chat'
  export default {
    components: {},
    data() {
      return {
        input: '',
        fileList: [],
        allMessages: [],
        sending: false,
        tips: '发送'
      }
    },
    computed: {
      ...mapState(['messages', 'user', 'activeRoom', 'userTyping'])
    },
    watch: {},
    //方法集合
    methods: {
      ...mapActions(['sendMessage',"deleteMessage"]),
      async onSubmit() {
        this.fileList = []
        if (this.input !== '') {
          this.input = this.input.trim()
          this.allMessages.push(this.input)
        }
        if (this.allMessages.length == 0) {
          return
        }
        this.sending = true
        this.tips = '发送中'
        let id = await this.sendMessage(this.allMessages)
        if (id) {
          this.sending = false
          this.tips = '发送'
          this.input = ''
          this.allMessages = []
        }
      },
      selectFile(e) {
        this.allMessages.push(e.raw)
      },
      async isTyping() {
        await isTyping(this.activeRoom.id)
      },
      deleteMsg(message){
        let {messageId,roomId}=message
        this.deleteMessage({
          messageId,
          roomId
        })
        
      }
    },
    created() {},
    mounted() {
      // console.log(this.userTyping)
    }
  }
</script>
<style lang="scss" scoped>
  #messageList {
    flex: 2;
    height: 100%;
    border: 1px solid #000;
    display: inline-block;
    .user-typing{
      width: 100%;
      height: 20px;
      /* background-color: red; */
      margin-bottom: 10px;
    }
    .messageList {
      background-color: #f5f5f5;
      padding: 0px 5px;
      border: 1px solid #000;
      height: 600px;
      overflow-y: scroll;
      overflow-x: hidden;
      .messageBox.other {
        margin: 20px 0;
        display: flex;
        align-items: center;
        .avatar {
          width: 50px;
          height: 50px;
          border: 1px solid #ccc;
          border-radius: 50px;
          margin-right: 10px;
        }
        .text {
         
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #add8e6;
          flex: 0.8;
          .delete{
            font-size: 20px;
            color:#007bff;
          }
          .userName {
            font-weight: bold;
            color: #212529;
          }
          .message {
            color: gray;
          }
        }
      }
      .messageBox.myself {
        margin: 20px 0px;
        display: flex;
        justify-content: flex-start;
        flex-direction: row-reverse;
        align-items: center;
        .avatar {
          width: 50px;
          height: 50px;
          border: 1px solid #ccc;
          border-radius: 50px;
          margin-left: 10px;
        }
        .text {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #add8e6;
          flex: 0.8;
          .delete{
            font-size: 20px;
            color:#007bff;
          }
        
          .userName {
            font-weight: bold;
            color: #212529;
          }
          .message {
            color: gray;
          }
        }
      }
    }
    .messageForm {
      height: 150px;
      display: flex;
      padding: 10px;
      flex-direction: column;
      align-items: center;
      .tools {
        width: 100%;
        height: 30px;
        /* border: 1px solid #000; */
        i {
          font-size: 28px;
        }
      }
      .edit {
        width: 100%;
        display: flex;
      }
    }
  }
</style>
