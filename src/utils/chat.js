import Chatkit from '@pusher/chatkit-client'
// import ChatServer from '@pusher/chatkit-server'
const ChatServer = require('@pusher/chatkit-server');
import store from '@/store/index'
import moment from 'moment'

const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR
const TOKEN_URL = process.env.VUE_APP_TOKEN_URL
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10

let currentUser = null
let activeRoom = null
let chatServer = null
async function getConnection(userId) {
  const chatManager = new Chatkit.ChatManager({
    instanceLocator: INSTANCE_LOCATOR,
    userId: userId,
    tokenProvider: new Chatkit.TokenProvider({
      url: TOKEN_URL
    })
  })
  currentUser = await chatManager.connect()

  currentUser
    .enablePushNotifications()
    .then(() => {
      console.log('Push Notifications enabled')
    })
    .catch(error => {
      console.error('Push Notifications error:', error)
    })

  chatServer = new ChatServer.default({
    instanceLocator: INSTANCE_LOCATOR,
    key:
      '27d362f3-2b81-4f60-8cf4-91a58770627a:Fdl0CR0f6CNZyyOaKV6KS2vmfqIv5C7ENj8puD+DId0='
  })
  chatServer.createUser({
    id: 'kkkk',
    name: 'kkkk',
  })
    .then(() => {
      console.log('User created successfully');
    }).catch((err) => {
      console.log(err);
    });  
  // Do other great things afterwards ✨

  return currentUser
}
function setMembers() {
  // console.log(activeRoom.users);

  const members = activeRoom.users.map(user => ({
    username: user.id,
    name: user.name,
    presence: user.presence.state
  }))

  store.commit('setUsers', members)
}
async function connectToRoom(roomId) {
  store.commit('clearChatRoom')
  activeRoom = await currentUser.subscribeToRoomMultipart({
    roomId: roomId,
    hooks: {
      onMessage: message => {
        let arr = message.parts.map(item => {
          if (item.partType == 'inline') {
            return { text: item.payload.content }
          } else if (item.partType == 'url') {
            return { img: item.payload.url }
          } else if (item.partType == 'attachment') {
            return { img: item.payload._downloadURL }
          }
        })
       
        
        store.commit('addMessage', {
          name: message.sender.name,
          id: message.senderId,
          content: arr,
          messageId: message.id,
          roomId: message.roomId,
          date: moment(message.createdAt).format()
        })
      },
      onPresenceChanged: () => {
        setMembers()
      },
      onUserStartedTyping: user => {
        store.commit('setUserTyping', user.name)
      },
      onUserStoppedTyping: () => {
        store.commit('setUserTyping', null)
      }
    },
    messageLimit: 10
  })

  setMembers()
  return activeRoom
}
async function sendMessage(message) {
  const data = message.map(item => {
    if (item.lastModified) {
      return {
        file: item,
        customData: { metadata: 42 }
      }
    } else {
      return { type: 'text/plain', content: item }
    }
  })

  const messageId = currentUser.sendMultipartMessage({
    roomId: store.state.activeRoom.id,
    parts: data
  })
  return messageId
}

async function disconnect() {
  currentUser.disconnect()
}

//删除消息
async function deleteMessage({ roomId, messageId }) {
  // console.log(roomId,messageId);
  console.log(chatServer.deleteMessage);
  
  chatServer
    .deleteMessage({
      roomId,
      messageId
    })
    // .then(() => console.log('gone forever'))
    // .catch(err => console.error(err))
}
async function changeName({id,name}){
  chatServer.updateUser({
    id,
    name,
    // avatarURL: 'https://some.url',
    // customData: {
    //   age: 21,
    // },
  })
    .then(() => {
      console.log('User updated successfully');
    }).catch((err) => {
      console.log(err);
    });
}
export function isTyping(roomId) {
  currentUser.isTypingIn({ roomId })
}
export default {
  getConnection,
  connectToRoom,
  sendMessage,
  disconnect,
  deleteMessage,
  changeName
}
