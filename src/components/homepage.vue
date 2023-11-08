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
                <div class="chatpdfRow">
                    <div class="chatpdfContent">我是知识库机器人，一个专门响应人类指令的大模型</div>
                </div>
                <div class="chatpdfRow">
                    <div class="chatpdfContent">我服务于人类，致力于让生活更美好</div>
                </div>
                <div class="chatpdfRow">
                    <div class="chatpdfContent">我是知识库机器人，一个专门响应人类指令的大模型</div>
                </div>
                <div class="chatpdfRow chatpdfAsk">
                    <div class="chatpdfContent">自建私有数据知识库 · 与知识库AI聊天</div>
                </div>
                <div class="chatpdfRow">
                    <div class="chatpdfContent">我是知识库机器人，一个专门响应人类指令的大模型</div>
                </div>
                <div class="chatpdfRow">
                    <div class="chatpdfContent">我是知识库机器人，一个专门响应人类指令的大模型</div>
                </div>
                <div class="chatpdfRow">
                    <div class="chatpdfContent">我是知识库机器人，一个专门响应人类指令的大模型</div>
                </div>
                <div class="chatpdfRow">
                    <div class="chatpdfContent">我是知识库机器人，一个专门响应人类指令的大模型</div>
                </div>
                <div class="chatpdfRow">
                    <div class="chatpdfContent">我是知识库机器人，一个专门响应人类指令的大模型</div>
                </div>
                <div class="chatpdfRow">
                    <div class="chatpdfContent">我是知识库机器人，一个专门响应人类指令的大模型</div>
                </div>
                <div class="chatpdfRow">
                    <div class="chatpdfContent">我是知识库机器人，一个专门响应人类指令的大模型</div>
                </div>
                <div class="chatpdfRow">
                    <div class="chatpdfContent">我是知识库机器人，一个专门响应人类指令的大模型</div>
                </div>
                <div class="chatpdfRow">
                    <div class="chatpdfContent">我是知识库机器人，一个专门响应人类指令的大模型</div>
                </div>
                <div class="chatpdfRow">
                    <div class="chatpdfContent">我是知识库机器人，一个专门响应人类指令的大模型</div>
                </div>
                <div class="chatpdfRow">
                    <div class="chatpdfContent">我是知识库机器人，一个专门响应人类指令的大模型</div>
                </div>
                <div class="chatpdfRow">
                    <div class="chatpdfContent">我是知识库机器人，一个专门响应人类指令的大模型</div>
                </div>
            </div>
            <div class="chatpdfArea">
                <textarea></textarea>
                <button>
                    <svg t="1682141916531" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1271" width="16" height="16"><path d="M0 1024l106.496-474.112 588.8-36.864-588.8-39.936L0 0l1024 512z" fill="#ffffff" p-id="1272"></path></svg>
                </button>
            </div>
        </div>
    </div>


    <beautiful-chat
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :icons="icons"
      :open="openChat"
      :showEmoji="true"
      :showFile="true"
      :showEdition="true"
      :showDeletion="true"
      :showTypingIndicator="showTypingIndicator"
      :showLauncher="true"
      :showCloseButton="true"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :disableUserListToggle="false"
      :messageStyling="messageStyling"
      @onType="handleOnType"
      @edit="editMessage" />
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      participants: [
        {
          id: 'user1',
          name: 'Matteo',
          imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
        },
        {
          id: 'user2',
          name: 'Support',
          imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4'
        }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      messageList: [
          { type: 'text', author: `me`, data: { text: `Say yes!` } },
          { type: 'text', author: `user1`, data: { text: `No.` } }
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    }
  },
  methods: {
    sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      // called when the user sends a message
      this.messageList = [ ...this.messageList, message ]
    },
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    },
    
    handleScrollToTop () {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType () {
      console.log('Emit typing event')
    },
    editMessage(message){
      const m = this.messageList.find(m=>m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    }
  }
}
</script>

<style>
  .chatpdf{
        display: flex;
        height: 100vh;
        flex-direction: row;
    }
    .chatpdf .pannel{
        width: 255px;
        background-color: rgb(0, 21, 41);
    }
    .chatpdfBox{
        display: flex;
        flex-direction: column;
        flex: 1;
        background: linear-gradient(to bottom right,#dbe6fb, #f3f4f8);
        background-size: cover;
        background-attachment: fixed;
    }
    .chatpdfLine{
        flex: 1;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        overflow-y: auto;
    }
    .chatpdfRow{
        margin: 20px 10px;
        display: flex;
    }
    .chatpdfAsk{
        justify-content: flex-end;
    }
    .chatpdfContent{
        display: inline-block;
        border-radius: 8px;
        padding: 6px 12px;
        max-width: 500px;
        line-height: 30px;
        background: rgba(255, 255, 255, 0.6);
        font-size: 14px;
        box-shadow:  0px 0.3px 0.9px rgba(0, 0, 0, 0.12), 0px 1.6px 3.6px rgba(0, 0, 0, 0.16);
    }
    .chatpdfAsk .chatpdfContent{
        background: linear-gradient(90deg, #2870EA 10.79%, #1B4AEF 87.08%);;
        color: #fff;
    }
    .chatpdfArea{
        display: flex;
        padding: 5px 10px;
        max-width: 1000px;
        margin: 0 auto;
        width: 100%;
    }
    .chatpdfArea textarea{
        flex: 1;
        border-color: #d9d9d9;
        resize: none;
        outline: none;
        padding: 0px 5px;
        height: 35px;
        line-height: 30px;
        color: #404040;
        border-radius: 10px 0px 0px 10px;
        transition: all 0.3s,height 0s;
    }
    .chatpdfArea textarea:hover{
        border-color: #4096ff;
    }
    .chatpdfArea button{
        height: 35px;
        color: #fff;
        background: linear-gradient(90deg, #2870EA 10.79%, #1B4AEF 87.08%);
        box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
        border: none;
        padding: 0 20px;
        border-radius: 0px 8px 8px 0px;
        cursor: pointer;
    }
    .chatpdfArea button:hover{
        background-color: #388aff;
    }
    .chatpdf .fileTitle{
        background-color: #1677ff;
        color: #fff;
        border-radius: 8px;
        padding: 10px;
        margin: 10px;
        font-size: 14px;
        cursor: pointer;
        line-height: 40px;
    }
    @media (max-width: 768px) {
        .pannel{
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