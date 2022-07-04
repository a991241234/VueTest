import { createStore } from 'vuex'

export default createStore({
  state: {
    api_link: 'http://yuri-w.net/api/v1/user',
    token:"",
    user:{
      account: "",
      active: "",
      created_at: "",
      id: "",
      name: "",
      updated_at: ""
    }
  },
  getters: {
  },
  mutations: {
    initialiseStore(state) {
			// Check if the ID exists
			if(localStorage.getItem('token')) {
				state.token = ''+localStorage.getItem('token');
			}
      else
      {
        state.token ='';
      }
      if(localStorage.getItem('user'))
      {
          const userInfo = JSON.parse('' + localStorage.getItem('user')) 
          state.user.account = userInfo.account;
          state.user.active = userInfo.active;
          state.user.created_at = userInfo.created_at;
          state.user.id = userInfo.id;
          state.user.name = userInfo.name;
          state.user.updated_at = userInfo.updated_at;

      }
      else
      {
        state.user.account = '';
        state.user.active = '';
        state.user.created_at ='';
        state.user.id = '';
        state.user.name = '';
        state.user.updated_at = '';
      }
		}
  },
  actions: {
  },
  modules: {
  }
})
