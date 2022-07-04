<template>
  <div class="userlist">
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
                            <a class="nav-link " href="/userupdate">變更用戶</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="/userlist">使用者清單</a>
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
            <div>   
                <h2 class="title">使用者清單</h2>
                <div class="row row-cols-1">
                    <div class="col">
                        <table class="table table-success table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">流水號</th>
                                        <th scope="col">帳號</th>
                                        <th scope="col">名稱</th>
                                        <th scope="col">建立時間</th>
                                        <th scope="col">更新時間</th>
                                        <th scope="col">操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in userList" :key="index">
                                    <td>{{item.id}}</td>
                                    <td>{{item.account}}</td>
                                    <td>{{item.name}}</td>
                                    <td>{{item.created_at}}</td>
                                    <td>{{item.updated_at}}</td>
                                    <td>
                                        <button type="button" v-on:click="getUserInfo(item)" class="btn btn-info" >紀錄</button>
                                        <!-- <button type="button" class="btn btn-primary" v-on:click="showUpdateUser(item)">變更</button> -->
                                        <button type="button" v-on:click="deleteUser(item)" class="btn btn-danger">刪除</button>
                                    </td>
                                    </tr>
                                </tbody>
                        </table>
                    </div>
                </div>
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
           userList:[]
        }
    },
    beforeMount(){
        this.getUesrList();
    },
    methods:{
        getUesrList()
        {
            const url = this.$store.state.api_link;
            this.axios.get(url,{headers:{
                Authorization:'Bearer'+this.$store.state.token
            }})
            .then((res) => 
            { 
                console.log(res.data.result) 
                this.$data.userList = res.data.result;
                //this.$router.push('/userinfo');
            })
            .catch((error) => 
            { 
                console.log(error.message) 
                alert('使用者清單取得失敗!!' + error.message);
            })
        },
        getUserInfo(userInfo:any)
        {
            this.$router.push("/userrecord/"+userInfo.account);
        },
        deleteUser(userInfo:any)
        {
            const url = this.$store.state.api_link;
            this.axios.delete(url,
            {
                headers:{
                Authorization:'Bearer'+this.$store.state.token
                },
                data:{
                    account:userInfo.account
                }
            })
            .then((res) => 
            { 
                //console.log(res.data.result);
                this.$router.go(0);
            })
            .catch((error) => 
            { 
                console.log(error.message) 
                alert('使用者刪除失敗!!' + error.message);
            })
        }
    }
});
</script>
<style lang="scss">
.userlist
{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}
.userlist .btn{
    margin: 2px;
}
.userlist .cols
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