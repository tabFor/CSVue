<template>
  <div>

    <div class="chatpdf">
      <div class="pannel">
        <div class="fileList">
          <div class="fileTitle">合同1.docx</div>
          <div class="fileTitle">工商法.pdf</div>
          <div class="fileTitle">好好好.xlsx</div>
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
        </div>
        <div class="chatpdfArea">
          <input
            v-model="input"
            placeholder="请输入内容"
            class="inputbox"
          >
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
  data() {
    return {
      loading: false,
      discheck: false,
      items: [
        {
          massgge: "欢迎使用",
          inputask: "AI对话"
        }
      ]
    };
  },
  methods: {
    submit() {
      this.loading = true;
      this.discheck = true;
      console.log("Submit");
      try {
        this.$ajax
          .post(
            "http://192.168.0.1:8081/chat/userMessage",
            this.input, // 发送的文本信息
            { headers: { "Content-Type": "text/plain" } } // 设置请求头
          )
          .then(
            res => {
              console.log(res.data);
              this.items.push({
                massgge: res.data,
                inputask: this.input
              });
              this.input = "";
              this.loading = false;
              this.discheck = false;
            },
            err => {
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
        console.log("error");
      } finally {
        //   this.loading = false;
      }
    }
  }
};
</script>

<style>
.chatpdf {
  display: flex;
  height: 100vh;
  flex-direction: row;
}
.chatpdf .pannel {
  width: 255px;
  background-color: rgb(0, 21, 41);
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
  margin: 0 auto;
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
  background-color: #1677ff;
  color: #fff;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  font-size: 14px;
  cursor: pointer;
  line-height: 40px;
}
.inputbox {
  width: 800px;
}
@media (max-width: 768px) {
  .pannel {
    display: none;
  }
}
</style>
<!-- vue-beautiful-chat聊天组件的可用配置参数有：

participants：聊天用户信息，包括id, name, imageUrl等。
onMessageWasSent：消息发送后的回调函数，参数是一个message对象。
isOpen：聊天窗口是否打开。
open：用于打开聊天窗口的函数。
close：用于关闭聊天窗口的函数。
messageList：一个数组，代表初始聊天信息。
showEmoji：是否显示打开表情面板按钮。
showFile： 是否显示打开文件按钮。
showDeletion：是否显示消息删除按钮。
showEdition：是否显示消息编辑按钮。
showTypingIndicator：一个字符串，可以设置为用户的participant.id以显示用户的键入指示符。
showHeader：是否显示聊天窗口的头部信息。
disableUserListToggle：是否允许用户在消息列表和参与者列表之间切换。
colors：一个对象，永不指定聊天窗口的颜色。
messageStyling：布尔值，用于表明是否允许聊天窗口的msgdown格式。
 事件
vue-beautiful-chat聊天组件的可用事件有：

onType：用户在消息输入框中键入文字时触发。
edit：用户在编辑消息时触发。 -->