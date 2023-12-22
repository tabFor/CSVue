<template>
  <div>

    <div class="chatpdf">
      <div class="pannel">
        <div class="fileList">
          <el-button
            round
            class="fileTitle"
            @click="newtalk"
          >新建对话</el-button>
          <br>
          <el-button
            round
            class="fileTitle"
            @click="savetalk"
            v-loading="loading"
            :disabled="discheck"
          >保存对话</el-button>
          <br>
          <el-button
            round
            class="fileTitle"
            @click="mytalk"
          >自定义对话</el-button>
        </div>
        <div class="fileList">
          <div v-if="ifset">
            <el-input
              type="textarea"
              :rows="2"
              :autosize="{ minRows: 10, maxRows: 16}"
              v-model="talksetting"
              placeholder="请输入你希望的回答风格"
            ></el-input>
            <br>
            <hr>
            <el-button @click="changestyle">确定</el-button>
          </div>
          <div v-if="!ifset">
            <img
              :src="require('@/assets/AI.png')"
              alt="logo"
            >
            <img
              :src="require('@/assets/co.png')"
              alt="logo"
            >
          </div>
        </div>
      </div>
      <div class="chatpdfBox">
        <div class="chatpdfLine">
          <div
            v-for="item in items"
            v-bind:key="item"
          >
            <div class="chatpdfRow chatpdfAsk">
              <div class="chatpdfContent">{{ item.inputask }}</div>
            </div>
            <div class="chatpdfRow">
              <div class="chatpdfContent">{{ item.massgge }}</div>
            </div>
          </div>
          <div v-if="nowcheck">
            <div class="chatpdfRow chatpdfAsk">
              <div class="chatpdfContent">{{ nowask }}</div>
            </div>
            <div class="chatpdfRow">
              <div
                class="chatpdfContent"
                v-loading="loading"
              >{{ nowanswer }}</div>
            </div>
          </div>
        </div>
        <div class="chatpdfArea">
          <el-input
            :disabled="nowcheck"
            type="textarea"
            :rows="2"
            v-model="input"
            placeholder="请输入内容"
            :autosize="{ minRows: 1, maxRows: 5}"
          ></el-input>
          <el-button
            v-loading="loading"
            type="primary"
            v-on:click="submit"
            :disabled="discheck"
          >提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  // 定义data函数，返回一个对象，包含loading、discheck、items属性
  data() {
    return {
      ifset: false,
      talksetting: "",
      input: "",
      loading: false,
      discheck: false,
      nowask: "你好",
      nowanswer: "你好",
      nowcheck: false,
      items: [
        {
          massgge: "欢迎使用",
          inputask: "AI对话"
        }
      ]
    };
  },
  // 定义methods函数，包含submit函数
  methods: {
    changestyle() {
      this.talksetting;
      this.$message.success("设置成功" + this.talksetting);
    },
    newtalk() {
      this.$global.dialogueID = "";
      this.$ajax
        .post("/chat/startDialogue", JSON.stringify(this.items), {
          params: {
            cookie: this.$session.get("session-id")
          }
        })
        .then(response => {
          this.$message.success("新建成功");
        })
        .catch(error => {
          this.$message.error("出现错误");
        });
      this.items = [
        {
          massgge: "欢迎使用",
          inputask: "AI对话"
        }
      ];
      this.$global.items = this.items;
      // this.$router.go(0);
    },
    savetalk() {
      this.$ajax
        .post("/user/savedialogue", JSON.stringify(this.items), {
          headers: {
            "session-id": this.$session.get("session-id"),
            "Content-Type": "application/json",
            dialogueid: this.$global.dialogueID
          }
        })
        .then(response => {
          this.$message.success("保存成功");
        })
        .catch(error => {
          this.$message.error("保存失败");
        });
    },
    mytalk() {
      this.ifset = !this.ifset;
    },
    submit() {
      this.nowask = this.input;
      this.nowanswer = "加载中...";
      this.nowcheck = true;
      // 设置loading为true
      this.loading = true;
      // 设置discheck为true
      this.discheck = true;

      try {
        this.$ajax
          .post(
            "/chat/NewUserMessage",
            {
              sessionId: this.$session.get("session-id"),
              dialogueId: this.$global.dialogueID,
              userMessage: this.input,
              userAdditionalRequest: this.talksetting
            },
            {
              timeout: 200000000,

              // Add headers if necessary
              headers: {
                "Content-Type": "application/json"
                // other headers...
              }
            }
          )
          .then(
            res => {
              this.nowcheck = false;
              this.nowanswer = "";
              this.nowask = "";
              this.items.push({
                massgge: res.data,
                inputask: this.input
              });
              this.input = "";
              this.loading = false;
              this.discheck = false;
            },
            err => {
              this.nowcheck = false;
              this.nowanswer = "";
              this.nowask = "";
              this.items.push({
                massgge: err,
                inputask: this.input
              });
              this.input = "";
              this.loading = false;
              this.discheck = false;
            }
          );
      } catch (error) {
        this.$message.error(error);
        this.loading = false;
      } finally {
        // this.loading = false;
      }
    }
  },
  mounted() {
    this.items = this.$global.items;

    // this.newtalk();
  },
  created() {
    // this.newtalk();
  }
};
</script>

<style scoped>
.chatpdf {
  display: flex;
  height: 90.5vh;
  flex-direction: row;
}
.chatpdf .pannel {
  width: 255px;
  background-color: #66a6ff;
}
.chatpdfBox {
  display: flex;
  flex-direction: column;
  flex: 1;
  background: linear-gradient(to bottom right, #dbe6fb, #f3f4f8);
  background-size: cover;
  background-attachment: fixed;
}
.chatpdfLine {
  flex: 1;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  overflow-y: auto;
}
.chatpdfRow {
  margin: 20px 10px;
  display: flex;
}
.chatpdfAsk {
  justify-content: flex-end;
}
.chatpdfContent {
  display: inline-block;
  border-radius: 8px;
  padding: 6px 12px;
  max-width: 500px;
  line-height: 30px;
  background: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.12),
    0px 1.6px 3.6px rgba(0, 0, 0, 0.16);
}
.chatpdfAsk .chatpdfContent {
  background: linear-gradient(90deg, #2870ea 10.79%, #1b4aef 87.08%);
  color: #fff;
}
.chatpdfArea {
  display: flex;
  padding: 5px 10px;
  max-width: 1000px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
.chatpdfArea textarea {
  flex: 1;
  border-color: #d9d9d9;
  resize: none;
  outline: none;
  padding: 0px 5px;
  height: 35px;
  line-height: 30px;
  color: #404040;
  border-radius: 10px 0px 0px 10px;
  transition: all 0.3s, height 0s;
}
.chatpdfArea textarea:hover {
  border-color: #4096ff;
}
.chatpdfArea button {
  height: 35px;
  color: #fff;
  background: linear-gradient(90deg, #2870ea 10.79%, #1b4aef 87.08%);
  box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
  border: none;
  padding: 0 20px;
  border-radius: 0px 8px 8px 0px;
  cursor: pointer;
}
.chatpdfArea button:hover {
  background-color: #388aff;
}
.chatpdf .fileTitle {
  padding: 10px;
  margin: 10px;
  font-size: 14px;
  width: 150px;
}
.inputbox {
  width: 800px;
}
body {
  margin: 0;
}
@media (max-width: 768px) {
  .pannel {
    display: none;
  }
}
</style>