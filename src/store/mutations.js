export default{
  setUser(state,user){
    state.user=user
  },
  setUsers(state,users){
    state.users=users
  },
  setRooms(state,rooms){
    state.rooms=rooms
  },
  setCurrentUser(state,currentUser){
    state.currentUser=currentUser
  },
  setActiveRoom(state,room){
    state.activeRoom=room
  },
  addMessage(state,message){
    state.messages.push(message)
  },
  clearChatRoom(state) {
    state.users = [];
    state.messages = [];
  },
  setUserTyping(state, userId) {
    state.userTyping = userId;
  },
  setReconnect(state, reconnect) {
    state.reconnect = reconnect;
  },
  reset(state) {
   
    state.users = [];
    state.messages = [];
    state.rooms = [];
    state.user = null;
  }
}