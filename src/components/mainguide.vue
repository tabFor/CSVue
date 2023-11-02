<template>
    <div id="di">
        <form action="" id="fm">
            <label for="name">用户名称</label>
            <input type="text"  id="name" name="name" v-model="name" placeholder="Enter your name">
            <label for="phone">手机号码</label>
            <input type="text" id="phone" name="phone" v-model="phone" placeholder="l">
            <label for="state">状态</label>
            <input type="text" id="state" name="state" v-model="state" placeholder="l">
            <label for="date">创建时间</label>
            <input type="text" id="date" name="date" v-model="date" placeholder="">
<!-- <button type="submit">Submit</button> -->
<button type="button" v-on:click="check">搜索</button>
<button type="reset" v-on:click="click">重置</button>
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
        display: block;
        width: 100%;
        height: 100px;
        margin: 0 auto;
        background-color: #fff;
    }
    #fm{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;
        margin: 0 auto;
        
       
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

</style>