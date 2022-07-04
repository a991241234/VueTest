import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import axios from 'axios'
import VueAxios from 'vue-axios'

store.commit('initialiseStore');
router.beforeEach((to, from, next) => 
{
  console.log(to);
  //console.log(from);
  if(to.fullPath === "/userlogout")
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  store.commit('initialiseStore');
  if(to.meta.requiresAuth)
  {
    if(store.state.token.trim().length === 0)
        next({ path: '/' });
    else
    {
            next();
    }
  }
  else
  {
    // if(to.fullPath === "/" && store.state.token.trim().length > 0)
    //     next({ path: '/userinfo' });
    // else
        next();
  }
  
});
createApp(App).use(VueAxios, axios).use(store).use(router).mount('#app')
