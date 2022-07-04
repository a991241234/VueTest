<template>
  <div class="userinfo">
        <div class="cols" style="max-height: 200px;">
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" href="/userinfo">使用者資訊</a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link " href="/adduser">創建用戶</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="/userupdate">變更用戶</a>
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
                <h2 class="title">使用者資訊</h2>
                <div class="row row-cols-1">
                    <div class="col">
                        <div class="input-group mb-3">
                            <button class="btn btn-outline-success" type="button" id="acct">帳號</button>
                            <input type="text" class="form-control" aria-label="Example text with button addon" aria-describedby="acct" v-model="user.account" readonly>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <button class="btn btn-outline-success" type="button" id="accname">名稱</button>
                            <input type="text" class="form-control" aria-label="Example text with button addon" aria-describedby="accname" v-model="user.name" readonly>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <button class="btn btn-outline-success" type="button" id="ids">流水號</button>
                            <input type="text" class="form-control" aria-label="Example text with button addon" aria-describedby="ids" v-model="user.id" readonly>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <button class="btn btn-outline-success" type="button" id="accreate">帳號建立</button>
                            <input type="text" class="form-control" aria-label="Example text with button addon" aria-describedby="accreate" v-model="user.created_at" readonly>
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <button class="btn btn-outline-success" type="button" id="accupdate">帳號異動</button>
                            <input type="text" class="form-control" aria-label="Example text with button addon" aria-describedby="accupdate" v-model="user.updated_at" readonly>
                        </div>
                    </div>
                    <div class="col" v-if="loginRecord.length > 0">
                        <table class="table table-success table-striped">
                            <thead>
                                <tr>
                                <th scope="col">登入IP</th>
                                <th scope="col">登入時間</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in loginRecord" :key="index">
                                <td>{{item.login_ip}}</td>
                                <td>{{item.created_at}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import moment from 'moment'
    export default defineComponent({
        data() {
            return {
                user:{
                    account: this.$store.state.user.account,
                    active: this.$store.state.user.active,
                    created_at: this.$store.state.user.created_at,
                    id: this.$store.state.user.id,
                    name: this.$store.state.user.name,
                    updated_at: this.$store.state.user.updated_at
                },
                loginRecord:[]
            };
        },
        beforeMount(){
            console.log(this.$store.state.user);
            this.getLoginRecord();
        },
        methods:{
            getLoginRecord()
            {
                const url = this.$store.state.api_link + '/user-login';
                const startTime = moment().format('YYYY-MM-DD') + ' 00:00:00';
                const endTime = moment().format('YYYY-MM-DD HH:mm:ss');

                this.axios.post(url ,{ 
                    account: this.$data.user.account,
                    time_start:startTime,
                    time_end:endTime
                },{headers:{
                    Authorization:'Bearer'+this.$store.state.token
                }})
                .then((res) => 
                { 
                    this.$data.loginRecord = res.data.result.splice(0,10);
                })
                .catch((error) => 
                { 
                    console.log(error.message) 
                    alert("查無登入紀錄 !!");
                })
            }
        }
    });
</script>
<style lang="scss">
.userinfo
{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.userinfo .cols
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