<template>
    <div id="di">
        <hr>
        <form action="" id="fm">
            <label for="name">法律名称</label>
            <input type="text"  id="name" name="name" v-model="name" placeholder="Enter your name">
            <label for="phone">法律条款</label>
            <input type="text" id="phone" name="phone" v-model="phone" placeholder="l">
            <label for="state">类型</label>
            <input type="text" id="state" name="state" v-model="state" placeholder="l">
            <label for="date">颁布时间</label>
            <input type="text" id="date" name="date" v-model="date" placeholder="">
<!-- <button type="submit">Submit</button> -->
<el-button type="button" v-on:click="check">搜索</el-button>
<el-button type="reset" v-on:click="click">重置</el-button>
<hr>
<el-button type="primary" >下载所选</el-button>
<el-button type="primary" >预览所选</el-button>
<hr>
        </form>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
            name: '',
            phone: '',
            state: '',
            date: ''
        }
    },
    methods: {
        submitForm(){
            console.log(this.name, this.phone, this.message);
        },
        click(){
            this.name = '';
            this.phone = '';
            this.message = '';
        },
        check() { 
            var username = this.name;
                  var phone = this.phone;
                  var message = "";
                
                  if (username == "" || phone == "") {
                    message += "请输入用户名和手机号码。";
                  }
                
                  if (!/^1[0-9]{10}$/.test(phone)) {
                    message += "请输入正确的手机号码。";
                  }
                
                  if (message != "") {
                    alert(message);
                  }
        }
    }
}
</script>
<style>
    #di{
        background-color: #fff;
    }
    #fm{
        padding: 20 !important;
        
       
    }
    #fm input{
        height: 20px;
        margin: 0;
        /* background-color: #fff; */
        
    }
    #fm label{
        margin-right: 3px;
        margin-left: 3px;
        /* background-color: #fff; */
        position: relative;
    }
    #fm  button{
        margin: 0;
        /* background-color: #fff; */
       
        position: relative;
        
    }
    .el-button{
        padding: 20 !important;
    }

</style>