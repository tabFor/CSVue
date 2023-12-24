<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-search"
        @click="getList"
      >刷新</el-button>
    </div>

    <el-row>
      <!--回复留言表单-->
      <el-dialog
        append-to-body
        :close-on-click-modal="false"
        :visible.sync="showDialog"
        width="600px"
      >
        <el-form
          ref="form"
          :model="form"
          size="small"
          label-width="76px"
        >
          <el-form-item
            label="留言信息"
            prop=""
          >
            <el-card class="el-card-m">
              <span class="el-card-m-content">{{ form.content }}</span>
              <span class="el-card-m-nick-name">{{ form.nickName }}
              </span>
            </el-card>
          </el-form-item>
          <el-form-item
            label="回复留言"
            prop="replyContent"
          >
            <el-input
              v-model="form.replyContent"
              rows="5"
              type="textarea"
            />
          </el-form-item>

        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="text"
            @click="doCancel"
          >取消</el-button>
          <el-button
            type="primary"
            @click="doSubmit"
          >确认</el-button>
        </div>
      </el-dialog>
      <el-table
        ref="table"
        v-loading="loading"
        :data="allmessages"
        style="width: 100%; font-size: 12px"
        @selection-change="selectionChangeHandler"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          width="120"
          prop="userEmail"
          label="留言用户"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          width="120"
          prop="adviceID"
          label="留言ID"
        />

        <el-table-column
          :show-overflow-tooltip="true"
          prop="userAdvice"
          width="200"
          label="留言内容"
        />

        <el-table-column
          prop="code"
          width="80"
          label="是否回复"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scopeRowCodeReply[scope.$index]"
              :disabled="true"
            />
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="managerReceive"
          width="200"
          label="回复内容"
        />
        <el-table-column
          label="操作"
          width="160"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              round
              @click="doReply(scope.row)"
            >回复</el-button>
            <el-button
              size="mini"
              type="text"
              round
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="page"
        background
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="sizes,prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-row>
  </div>
</template>

<script>
export default {
  name: "留言管理",
  data() {
    return {
      activeName: "bbsList",
      showDialog: false,
      loading: false,
      formLoading: true,
      scopeRowCodeReply: [],
      form: {
        nickName: "",
        content: "",
        createTime: "",
        createDate: "",
        replyName: "",
        replyContent: "",
        replyTime: "",
        adviceID: 1
      },
      total: 0,
      currentPage: 1,
      pageSize: 5,
      bbsList: [],
      selections: [],
      allmessages: [
        {
          adviceID: 0,
          userEmail: "12625",
          userAdvice: "哈哈哈哈",
          code: 1
        }
      ],
      nickName: "",
      replied: null,
      options: [
        {
          value: true,
          label: "是"
        },
        {
          value: false,
          label: "否"
        }
      ],
      createTime: null,
      roles: [],
      userRoles: []
    };
  },
  computed: {},
  methods: {
    deleteRow(row) {
      this.$ajax
        .get("/user/deleteresponse", {
          params: {
            adviceID: row.adviceID
          }
        })
        .then(
          res => {
            // 登录成功
            var responseData = res.data;
            if (responseData === "已删除") {
              this.$message.success("已删除");
              this.form = {};
              const index = this.allmessages.indexOf(row);
              if (index > -1) {
                this.allmessages.splice(index, 1);
              }
            } else {
              this.$message.error("留言尚未回复");
            }
            // 请求成功，获取返回的数据
          },
          err => {
            // 网络错误
          }
        );
      // 执行删除操作的逻辑
      // 示例代码，将 row 从 allmessages 数组中删除
    },
    handleDelete(row) {
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确认删除后的操作
          this.deleteRow(row);
        })
        .catch(() => {
          // 取消删除后的操作
        });
    },
    isCodeReply(code) {
      return code === 1;
    },
    getList() {
      this.$ajax
        .get("/user/receive", {
          params: {
            cookie: this.$session.get("session-id")
          }
        })
        .then(
          res => {
            // 登录成功
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
              this.scopeRowCodeReply = this.allmessages.map(
                message => message.code === 1
              );
              this.$message.success("获取列表成功");
            }
          },
          err => {
            // 网络错误
          }
        );
    },
    search() {
      this.currentPage = 1;
      this.doQuery();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.doQuery();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.doQuery();
    },

    selectionChangeHandler(val) {
      this.selections = val;
    },
    doReply(id) {
      this.form = {};
      this.userRoles = [];
      this.roles = [];
      this.showDialog = true;
      this.form.adviceID = id.adviceID;
      this.form.content = id.userAdvice;
      this.form.nickName = id.userEmail;
    },
    doCancel() {
      this.showDialog = false;
      this.form = {};
    },
    doSubmit() {
      this.$ajax
        .get("/user/sendresponse", {
          // headers: {
          //     "Content-Type": "application/json"
          // },
          params: {
            adviceID: this.form.adviceID,
            response: this.form.replyContent
          }
        })
        .then(
          res => {
            if (res.data === "上传成功") {
              this.$message.success("上传成功");
              this.showDialog = false;
              this.getList();
            } else {
              this.$message.error("请输入回复");
            }
          },
          err => {
            this.$message.error(err);
          }
        );
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
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

.page {
  float: right;
  margin-top: 5px;
}
</style>

<style>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}

body {
  margin: 0;
}
</style>
