<template>
  <div class="userupdate">
    <div class="cols" style="max-height: 200px;">
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link " href="/userinfo">使用者資訊</a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link " href="/adduser">創建用戶</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="/userupdate">變更用戶</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="/userlist">使用者清單</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="/userlogout">登出</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
    </div>
    <div class="cols">
        <div class="container">
            <h2 class="title">變更用戶</h2>
            <div class="row row-cols-1">
                <div class="col">
                    <div class="input-group mb-3">
                        <button class="btn btn-outline-success" type="button" id="acct">帳號</button>
                        <input type="text" class="form-control"  aria-label="Example text with button addon" aria-describedby="acct" v-model="accout" readonly>
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <button class="btn btn-outline-success" type="button" id="pwd">密碼</button>
                        <input type="password" class="form-control" placeholder="請填入密碼" aria-label="Example text with button addon" aria-describedby="pwd" v-model="password">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <button class="btn btn-outline-success" type="button" id="again_pwd">確認密碼</button>
                        <input type="password" class="form-control" placeholder="需與上方填入密碼一致" aria-label="Example text with button addon" aria-describedby="again_pwd" v-model="password_confirmation">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <button class="btn btn-outline-success" type="button" id="username">名稱</button>
                        <input type="text" class="form-control" placeholder="請填入名稱" aria-label="Example text with button addon" aria-describedby="username" v-model="user_name">
                    </div>
                </div>
                <div class="col"><button type="button" class="btn btn-outline-success btn-full-width" v-on:click="UpdateUeser()">變更</button></div>

            </div>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    data () {
        return{
            accout:  this.$store.state.user.account,
            password: '',
            password_confirmation:'',
            user_name:this.$store.state.user.name
        }
    },
    methods:{
        UpdateUeser()
        {
            const rule_pwd = /^[a-zA-Z0-9]{8,12}$/;
          
            if(rule_pwd.test(this.$data.password) == false || rule_pwd.test(this.$data.password_confirmation) == false)
                return alert('密碼格式不正確，請重新輸入(格式為英數混合，且長度為8到12之間)');
            if(this.$data.password != this.$data.password_confirmation)
                return alert('密碼不一致，請重新確認'); 
            if(this.$data.user_name.trim().length === 0)
                return alert('名稱尚未輸入，請填寫'); 

            const url = this.$store.state.api_link;
            this.axios.put(url ,{ 
                password:this.$data.password,
                password_confirmation:this.$data.password_confirmation,
                name:this.$data.user_name,
                active:this.$store.state.user.active
            },{headers:{
                Authorization:'Bearer'+this.$store.state.token
            }})
            .then((res) => 
            { 
                console.log(res.data.result) 
                this.$router.push("/userlogout");
            })
            .catch((error) => 
            { 
                console.log(error.message) 
                alert('帳號創建失敗!!' + error.message);
            })
        }
    }
});
</script>
<style lang="scss">
.userupdate
{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}
.userupdate .cols
{
    flex: 1;
}
nav {
  /*padding: 30px;*/
  background-color: #42b983;
  a {
    font-weight: bold;
    color: #2c3e50;

    /*&.router-link-exact-active {
      color: #42b983;
    }*/
  }
}
.container
{
    width: 50%;
    margin: 30px auto;
    padding: 15px;
    border-color: #198754;
    border-style: solid;
    border-radius: 0.25rem;
    border-width: 1px;
}
</style>