
<template>
  <div class="personalCenter">
    <el-dialog
      title="修改昵称"
      :visible.sync="dialogVisible"
      :fullscreen="false"
    >
      <h1>
        请输入您的昵称
      </h1>
      <el-input
        v-model="nickname"
        placeholder="请输入昵称"
      ></el-input>
      <i class="el-icon-edit"></i>
      <div>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="setNickname"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-container>
      <el-header class="title"><span class="title2">个人中心</span>
        <el-dropdown
          @command="handleCommand"
          class="userset"
        >
          <span class="el-dropdown-link">
            用户操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">修改密码</el-dropdown-item>
            <el-dropdown-item command="b">反馈问题</el-dropdown-item>
            <el-dropdown-item command="c">设置昵称</el-dropdown-item>
            <el-dropdown-item
              command="d"
              divided
            >退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="400px">
          <el-col :span="12">
            <div class="sub-title"></div>
            <div class="demo-basic--circle">
              <div class="img">
                <el-avatar
                  :size="100"
                  :src="circleUrl"
                  align="center"
                ></el-avatar>
              </div>
              <div class="block">
                <span>USER</span>
              </div>
            </div>
          </el-col>
          <el-input
            v-model="input1"
            :readonly="true"
            type="text"
            placeholder="用户邮箱"
            show-word-limit
          ></el-input>
          <el-input
            v-model="nickname"
            :readonly="true"
            type="text"
            placeholder="用户昵称"
            show-word-limit
          ></el-input>
          <el-input
            v-model="input3"
            :readonly="true"
            type="text"
            placeholder="用户权限"
            maxlength="2"
            show-word-limit
          ></el-input>
          <el-button-group
            style="float: right; padding: 3px 0"
            type="text"
          >
            <el-button
              type="primary"
              size="medium"
              round
              @click="dialogVisible=true"
            >修改昵称</el-button>
          </el-button-group>
        </el-aside>
        <el-container class="mainMenu">
          <div class="show">

            <el-carousel height="600px">
              <el-carousel-item
                v-for="item in imgurl"
                :key="item"
              >
                <img
                  :src="item"
                  alt="logo"
                >
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-container>
      </el-container>
    </el-container>
    <div>
      <el-dialog
        title="对话内容"
        :visible.sync="submitVisible"
        :fullscreen="false"
      >
        <div>
          <el-input
            type="textarea"
            :rows="2"
            v-model="submission"
            :readonly="false"
            placeholder="请输入需要反馈的问题"
          >
          </el-input>
        </div>
        <el-button @click="submiterror">提交反馈</el-button>
      </el-dialog>
    </div>
  </div>

</template>
<script>
export default {
  name: "PersonalCenter",
  data() {
    return {
      dialogVisible: false,
      submitVisible: false,
      nickname: "",
      submission: "",
      imgurl: [
        require("@/assets/14.png"),
        require("@/assets/11.jpg"),
        require("@/assets/12.png"),
        require("@/assets/13.jpg"),

        require("@/assets/15.jpg"),
        require("@/assets/16.jpg")
      ],
      index: "No",
      text: "",
      input1: this.$session.get("email"),
      input2: this.getNickname,
      input3: "普通用户",
      circleUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      sizeList: ["large"],
      tableData: [
        {
          date: "2016-05-03",
          name1: "Wechat",
          name2: "Github"
        }
      ]
    };
  },
  mounted() {
    this.getNickname();
  },
  methods: {
    submiterror() {
      this.$ajax
        .get("/user/send", {
          params: {
            cookie: this.$session.get("session-id"),
            advice: this.submission
          }
        })
        .then(res => {
          console.log(res);
          this.$message.success(res.data);
          return res.data;
        })
        .catch(err => {
          console.log(err);
          this.$message.error("失败");
        });
      this.$message.success("提交反馈成功");
      this.submission = "";
    },
    getNickname() {
      this.$ajax
        .get("/user/getname", {
          params: {
            "session-id": this.$session.get("session-id")
          }
        })
        .then(res => {
          console.log(res);
          this.nickname = res.data;
          return res.data;
        })
        .catch(err => {
          console.log(err);
          this.$message.error("获取昵称失败");
        });
    },
    setNickname() {
      this.$ajax
        .get("/user/setname", {
          params: {
            newname: this.nickname,
            "session-id": this.$session.get("session-id")
          }
        })
        .then(res => {
          console.log(res);
          this.$message.success("修改成功");
          console.log(res.data);
          console.log(res.data.length);
          this.dialogVisible = false;
        })
        .catch(err => {
          console.log(err);
          this.$message.error("修改失败");
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleCommand(command) {
      if (command === "a") {
        this.$router.replace("/changepwd");
      }
      if (command === "b") {
        this.submitVisible = true;
      }
      if (command === "c") {
        this.dialogVisible = true;
      }
      // this.$message('click on item ' + command);
      if (command === "d") {
        this.$message("退出登录");
        this.$ajax.get("user/deletelogged", {
          params: {
            cookie: this.$session.get("session-id")
          }
        });
        this.$session.set("email", "");
        this.$session.set("session-id", "114514");
        this.$session.remove("session-id");
        sessionStorage.setItem("session-id", "");

        this.index = "Yes";
        console.log(this.index);
        this.$router.replace({ path: "/" });
        this.$session.destory();
      }
    }
  }
};
</script>
<style scoped>
.el-header {
  line-height: 60px;
  background-color: #ffffff;
  text-align: center;
  font-size: 20px;
}
.el-aside {
  line-height: 44px;
  text-align: center;
  background-color: #d3dce6;
  height: 82.1vh;
}
.el-main {
  line-height: 36px;
  text-align: center;
  background-color: #e9eef3;
}

.demo-basic--circle {
  box-align: "center";
  margin-top: 30px;
  margin-left: 150px;
}
.block {
  margin-left: 25px;
  font-weight: bold;
}
.show {
  margin: auto;
}

.el-dropdown {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.personalCenter {
  height: auto;
}
.mainMenu {
  background-color: #e9eef3;
  text-align: center;
  display: flex;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel {
  width: 1000px;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
body {
  margin: 0;
}
.userset {
  position: absolute;
  width: 100px;
  right: 0px;
}
.title {
  position: relative;
  display: flex;
  text-align: center;
}
.title2 {
  font-size: 30px;
  position: absolute;
  left: 50%;
  color: #5aa1f8;
  font-weight: bold;
}
</style>

