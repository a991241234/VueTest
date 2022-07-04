<template>
    <div class="userRecord">
        <div class="cols" style="max-height: 200px;">
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" href="/userlist">返回</a>
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
                <h2 class="title">用戶紀錄</h2>
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
  data () {
    return {
                user:{
                    account: this.$route.params.account,
                    active: '',
                    created_at:'',
                    id: '',
                    name: '',
                    updated_at:''
                },
                loginRecord:[]
            };
  },
  beforeMount(){
    this.getUserInfo();
    this.getLoginRecord();
  },
  methods:
    {
       getUserInfo() {
        const url = this.$store.state.api_link + '/' + this.$data.user.account;
        this.axios.get(url ,{ 
            headers:{
                Authorization:'Bearer'+this.$store.state.token
            }
        })
        .then((res) => 
        {  
            console.log(res.data);
            this.$data.user.account = res.data.result.account;
            this.$data.user.active = res.data.result.active;
            this.$data.user.created_at = res.data.result.created_at;
            this.$data.user.id = res.data.result.id;
            this.$data.user.name = res.data.result.name;
            this.$data.user.updated_at = res.data.result.updated_at;
        })
        .catch((error) => 
        { 
            console.log(error.message) 
            alert("查詢帳號紀錄失敗!!" + error.message);
        })

      },
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
      
    },
  computed: {

  }
})
</script>
<style lang="scss">
.userRecord
{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}
.userRecord .cols
{
    flex: 1;
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
