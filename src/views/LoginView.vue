<template>
    <div class="login">
        <div class="container">
            <h2 class="title">登入</h2>
            <div class="row row-cols-1">
                <div class="col">
                    <div class="input-group mb-3">
                        <button class="btn btn-outline-success" type="button" id="acct">帳號</button>
                        <input type="text" class="form-control"  placeholder="請輸入帳號" aria-label="Example text with button addon" aria-describedby="acct" v-model="acct"
                            >
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <button class="btn btn-outline-success" type="button" id="pwd">密碼</button>
                        <input type="password" class="form-control" placeholder="請輸入密碼" aria-label="Example text with button addon" aria-describedby="pwd" v-model="pwd"
                           >
                    </div>
                </div>
                <div class="col"><button type="button" class="btn btn-outline-success btn-full-width" v-on:click="LoginAction()">確定</button></div>

            </div>
        </div>
    </div>
</template>

<script lang="ts">
// const props = defineProps({
//   acct: String,
//   pwd: String
// })
// const data = def
// function LoginAction () {
//   alert(props.acct + ' ' + props.pwd)
// }
import { defineComponent } from 'vue'
export default defineComponent({
  data () {
    return {
      acct: '' ,
      pwd: ''
    }
  },
  methods:
    {
      LoginAction () {
        const rule_acct = /^[a-zA-Z0-9]{4,12}$/;
        const rule_pwd = /^[a-zA-Z0-9]{8,12}$/;

        if(rule_acct.test(this.$data.acct) == false)
           return alert("帳號格式不正確，請重新輸入(格式為英數混合，且長度為4到12之間)");
        if(rule_pwd.test(this.$data.pwd) == false)
           return alert("密碼格式不正確，請重新輸入(格式為英數混合，且長度為8到12之間)");
        // alert(this.$data.acct + ' ' + this.$data.pwd + ' ' + this.$store.state.api_link)
        /*
        account: 'admin' ,
            password:'password' 
        */
        const url = this.$store.state.api_link + '/login';
        this.axios.post(url ,{ 
            account: this.$data.acct,
            password:this.$data.pwd
        })
        .then((res) => 
        {  
            localStorage.setItem('token', res.data.result.token);
            localStorage.setItem('user', JSON.stringify(res.data.result.user))
            // this.$store.state.token = res.data.result.token;
            // this.$store.state.user.account = res.data.result.user.account;
            // this.$store.state.user.active = res.data.result.user.active;
            // this.$store.state.user.created_at = res.data.result.user.created_at;
            // this.$store.state.user.id = res.data.result.user.id;
            // this.$store.state.user.name = res.data.result.user.name;
            // this.$store.state.user.updated_at = res.data.result.user.updated_at;
            this.$router.push('/userinfo');
        })
        .catch((error) => 
        { 
            console.log(error.message) 
            alert("登入失敗，請重新輸入帳號密碼!!");
        })

      }
    },
  computed: {

  }
})
</script>
<style lang="scss">
.login
{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn-full-width
{
    width: 100%;
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
.col{
    padding: 2px;
}

</style>
