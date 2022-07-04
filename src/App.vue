<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
<!-- <nav class="navbar navbar-expand-lg navbar-light">
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#" v-on:click="testalert()">登入</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" v-on:click="testalert()">註冊</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" v-on:click="testalert()">刪除用戶</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" v-on:click="testalert()">變更用戶</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" v-on:click="testalert()">使用者清單</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" v-on:click="testalert()">登入紀錄</a>
        </li>
      </ul>
    </div>
  </div>
</nav> -->
  <router-view></router-view>
</template>
<script lang="ts">
export default
{
  methods: {
    testalert () {
      alert('this is my first function !!')
    },
    a () {
      alert('aaaaaaaaaaaaaaaaaaaaaaaa !!')
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.title
{
    color: #198754;
}
</style>
