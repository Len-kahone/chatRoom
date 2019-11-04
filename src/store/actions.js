import chat from '@/utils/chat';

export default {
  async login({ commit, state }, userId) {
    // alert(userId)
    commit('setIsLoading', true);
    const currentUser = await chat.getConnection(userId);
    commit('setUser', { name: currentUser.name, id: currentUser.id });
    const rooms = currentUser.rooms.map(room => ({
      name: room.name,
      id: room.id
    }));
    commit('setRooms', rooms);
    const activeRoom = state.activeRoom || rooms[0];
    commit('setActiveRoom', {
      id: activeRoom.id,
      name: activeRoom.name
    });
    await chat.connectToRoom(state.activeRoom.id);
    commit('setReconnect', false);

    // currentUser = currentUser
    commit('setIsLoading', false);
    console.log(currentUser);

    return currentUser;
  },
  async changeRoom({ commit }, roomId) {
    const { id, name } = await chat.connectToRoom(roomId);
    console.log(id, name);

    commit('setActiveRoom', { id, name });
  },
  async sendMessage({ commit, state }, message) {
    const messageId = await chat.sendMessage(message);
    return messageId;
  },
  async logout({ commit }) {
    await chat.disconnect();
    commit('reset');
    window.localStorage.clear();
  },
  deleteMessage({ commit }, message) {
    chat.deleteMessage(message);
  },
  changeName({ commit }, data) {
    chat.changeName(data);
  }
};
