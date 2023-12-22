<template>
  <div>
    <el-card
      class="el-card-d"
      shadow="always"
    >
      <el-timeline infinite-scroll-disabled="disabled">
        <div v-if="pagemessages.length > 0">
          <el-timeline-item
            v-for="(item, index) in pagemessages"
            :key="index"
            :timestamp="item.createDate"
            placement="top"
          >
            <el-card class="el-card-m">
              <span class="el-card-m-content">{{ item.content }}</span>
              <span class="el-card-m-nick-name">{{ item.nickName }} 提交于 {{ item.createTime }}</span>
              <span
                v-if="item.replyContent"
                class="el-card-m-reply"
              >{{ item.replyName }}回复：{{
                                item.replyContent }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[ {{ item.replyTime }}] </span>
            </el-card>
          </el-timeline-item>
        </div>
        <div v-else>
          <el-timeline-item placement="top">
            <el-card class="el-card-m">
              <p class="el-card-m-nick-name"> 没有任何留言</p>
            </el-card>
          </el-timeline-item>
        </div>
      </el-timeline>
      <el-pagination
        background
        :current-page="currentPage"
        :page-size="pagesize"
        layout="prev, pager, next"
        :total="allmessages.length"
        :hide-on-single-page="true"
        @current-change="handleCurrentChange"
      />

    </el-card>
    <div class="el-card-messages">
      <el-input
        v-model="nickName"
        size="mini"
        class="message-nick-name"
      >
        <template slot="prepend">昵称：</template>
      </el-input>
      <el-input
        slot="prepend"
        v-model="message"
        type="textarea"
        :rows="2"
        class="message-text"
        placeholder="输入留言"
        maxlength="200"
      />

      <el-button
        type="info"
        round
        class="submit-message"
        size="mini"
        @click="submitMessage"
      >留言</el-button>
    </div>
  </div>
</template>

<script>
// 格式化时间函数

export default {
  data() {
    return {
      isLoaded: true,
      nickName: "",
      message: "",
      date: "",
      time: "",
      pagesize: 3,
      currentPage: 1,
      pagemessages: [
        {
          nickName: "",
          content: "",
          createTime: "",
          createDate: "",
          replyName: "",
          replyContent: "",
          replyTime: ""
        }
      ],
      allmessages: [
        {
          nickName: "",
          content: "",
          createTime: "",
          createDate: "",
          replyName: "",
          replyContent: "",
          replyTime: ""
        }
      ]
    };
  },
  created() {
    this.getList();
    this.doQuery();
  },
  methods: {
    getList() {
      //获取所有advice到allmessages
      this.$ajax
        .get("/receive", {
          // headers: {
          //     "Content-Type": "application/json"
          // },
          params: {
            cookie: this.message //不知道填什么
          }
        })
        .then(
          res => {
            if (res.data.length === 0) {
              this.allmessages.length = 0;

              this.$message.error("未找到相关数据");
              this.isload = false;
              // this.$router.go(0);
            } else {
              this.allmessages.length = 0;
              for (let i = 0; i < res.data.length; i++) {
                this.allmessages.push(res.data[i]);
              }
              this.$message.success("获取列表成功");
            }
          },
          err => {
            this.$message.error(err);
          },
          (this.isLoaded = false)
        );
    },
    // 获取当前页的advice
    doQuery() {
      const start = (this.currentPage - 1) * this.pagesize;
      const end = start + this.pagesize;
      for (var i = start; i < end; i++) {
        if (i < this.allmessages.length) {
          this.pagemessages.push(this.allmessages[i]);
        }
      }
    },
    // 翻页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pagemessages = [];
      this.doQuery();
    },
    // 提交留言
    submitMessage() {
      if (
        this.nickName === "" ||
        this.nickName.replace(/(^\s*)|(\s*$)/g, "") === ""
      ) {
        this.$message("请输入昵称");
        return;
      }
      if (
        this.message === "" ||
        this.message.replace(/(^\s*)|(\s*$)/g, "") === ""
      ) {
        this.$message("留言不能为空");
        return;
      }
      var time = new Date();

      var y = time.getFullYear(); //年
      var m = (time.getMonth() + 1).toString().padStart(2, "0"); //月
      var d = time
        .getDate()
        .toString()
        .padStart(2, "0"); //日
      var h = time
        .getHours()
        .toString()
        .padStart(2, "0"); //时
      var mm = time
        .getMinutes()
        .toString()
        .padStart(2, "0"); //分
      var s = time
        .getSeconds()
        .toString()
        .padStart(2, "0");
      this.date = `${y}-${m}-${d}`;
      this.time = time;
      //  提交留言到服务器
      this.$ajax
        .get("/update", {
          // headers: {
          //     "Content-Type": "application/json"
          // },
          params: {
            adviceID: this.nickName,
            Response: this.message,
            date: this.date
            //接口要改 改成传入nickname message date
          }
        })
        .then(
          res => {
            resData = res.data;
            if (resData === "上传成功") {
              this.$message.success("上传成功");
            } else {
              this.$message.error("错误");
            }
          },
          err => {
            this.$message.error(err);
          }
        );

      this.nickName = "";
      this.message = "";
      this.date = "";
      this.time = "";
      this.getList();
      // 翻页到最后一页
      this.currentPage = Math.ceil(this.allmessages.length / this.pagesize, 0);
      this.handleCurrentChange(this.currentPage);
    }
  }
};
</script>

<style scoped>
.el-card-d {
  float: left;
  margin-top: 20px;
  margin-left: 10%;
  width: 80%;
  height: 500px;
  background: rgb(252, 250, 250);
}

.el-card-m {
  height: 100px;
}

.el-card-m-content {
  display: block;
  font-weight: bold;
}

.el-card-m-nick-name {
  display: block;
  font-size: x-small;
  margin-top: 15px;
  color: gray;
}

.el-card-messages {
  float: left;
  margin-top: 20px;
  margin-left: 10%;
  width: 70%;
}

.message-nick-name {
  width: 50%;
}

.message-text {
  margin-top: 10px;
  display: block;
  width: 50%;
}

.submit-message {
  margin-top: 10px;
  width: 80px;
  background: rgb(235, 245, 247);
  color: cadetblue;
  text-align: center;
  letter-spacing: 20px;
}
</style>

