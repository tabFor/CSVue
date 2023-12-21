<template>
  <div>
    <h3>用户界面</h3>
    <div class="manage-header">
      <!-- 新增按钮 -->
      <el-button
        type="primary"
        @click="handlecreate"
      >+ 新增</el-button>

      <!-- 对话框:点击新增或编辑才会弹出表单 -->
      <!-- :before-close="closeDialog" 点击关闭的x之前要做的事情 -->
      <el-dialog
        :title="modalType == 0 ? '新建' : '编辑'"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="closeDialog"
      >
        <!-- 表单Form -->
        <!-- ref=form:为了通过this.$refs调用组件的方法 -->
        <el-form
          :inline="true"
          :model="form"
          :rules="rules"
          ref="form"
          label-width="80px"
        >
          <!-- 每一项表单域:el-form-item -->
          <el-form-item
            label="姓名"
            prop="name"
          >
            <el-input
              placeholder="请输入姓名"
              v-model="form.userName"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input
              placeholder="请输入邮箱"
              v-model="form.userEmail"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              placeholder="请输入密码"
              v-model="form.userPassword"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="closeDialog">取 消</el-button>
          <el-button
            type="primary"
            @click="submit"
          >确 定</el-button>
        </div>
      </el-dialog>

      <!-- 搜索框 -->
      <el-form :inline="true">
        <el-form-item>
          <el-input
            v-model="searchForm.name"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="searchForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="search"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          prop="userEmail"
          label="邮箱"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="userPassword"
          label="密码"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="currentChange"
        >
        </el-pagination>
      </div>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          userEmail: "1262577702",
          userName: "王小虎",
          userPassword: "Lxy2035"
        },
        {
          userEmail: "1262577702",
          userName: "王小虎",
          userPassword: "Lxy2035"
        }
      ],
      multipleSelection: [],
      form: {
        userName: "",
        userEmail: "",
        userPassword: ""
      },
      // 表单验证规则
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userEmail: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      },
      // 表单是否打开
      dialogVisible: false,
      // 打开表单:新建0,编辑1
      modalType: 0,
      // 分页的对象
      pageData: {
        page: 1,
        limit: 20
      },
      // 分页页数
      total: 0,
      // 搜索框表单
      searchForm: {
        name: "",
        email: ""
      }
    };
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    createUser() {
      return this.$ajax
        .get("/user/adduser", {
          params: {
            email: this.form.userEmail,
            password: this.form.userPassword
          }
        })
        .then(response => {
          var responseData = response.data;
          if (responseData === "添加成功") {
            this.$message.success("添加成功");
            this.form = {};
          } else {
            this.$message.error("用户已存在");
          }
          // 请求成功，获取返回的数据
          console.log(response.data);
          // ...
        })
        .catch(error => {
          this.$message.error("错误");
          // 请求失败，处理错误
          console.error(error);
        });
    },
    updateUser() {
      return this.$ajax
        .get("/user/updateuser", {
          params: {
            name: this.form.userName,
            email: this.form.userEmail,
            password: this.form.userPassword
          }
        })
        .then(response => {
          var responseData = response.data;
          if (responseData === "修改成功") {
            this.$message.success("修改成功");
            this.form = {};
          } else {
            this.$message.error("用户不存在");
          }
          // 请求成功，获取返回的数据
          // ...
        })
        .catch(error => {
          this.$message.error("错误");
          // 请求失败，处理错误
          console.error(error);
        });
    },
    // 表单提交
    submit() {
      // 要用箭头函数,若用function会报错,不知道为什么
      this.$refs.form.validate(valid => {
        // 符合校验
        if (valid) {
          // 提交数据
          if (this.modalType === 0) {
            // 新增
            this.createUser().then(() => {
              this.getList();
            });
          } else {
            // 编辑
            this.updateUser().then(() => {
              this.getList();
            });
          }
          // 清空,关闭
          this.closeDialog();
        }
      });
    },
    // 关闭对话框
    closeDialog() {
      // 先重置
      this.$refs.form.resetFields();
      // 后关闭
      this.dialogVisible = false;
    },
    // 编辑按钮
    handleEdit(index) {
      this.modalType = 1;
      this.openForm();
      // 深拷贝
      this.form = JSON.parse(JSON.stringify(index));
    },
    deleteUser(email) {
      this.$ajax
        .get("/user/deletuser", {
          params: {
            email: email
          }
        })
        .then(response => {
          var responseData = response.data;
          if (responseData === "已成功删除") {
            this.$message.success("删除成功");
          } else {
            this.$message.error("用户不存在");
          }
          // 请求成功，获取返回的数据
          console.log(response.data);
          // ...
        })
        .catch(error => {
          this.$message.error("错误");
          // 请求失败，处理错误
          console.error(error);
        });
    },
    // 删除按钮
    handleDelete(index) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 删除操作:根据后端接口,参数是对象,id是唯一标识符
          deleteUser({ id: index.email }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getList();
          });
        })
        .catch(() => {
          // 点击取消:不删除了
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 新建按钮
    handlecreate() {
      this.modalType = 0;
      this.openForm();
    },
    // 打开表单
    openForm() {
      this.dialogVisible = true;
    },
    getList() {
      this.$ajax
        .get("/user/findall", {
          // headers: {
          //     "Content-Type": "application/json"
          // },
        })
        .then(
          res => {
            this.tableData = [];
            if (res.data.length === 0) {
              this.$message.error("未找到相关数据");
              this.isload = false;
              // this.$router.go(0);
            } else {
              for (let i = 0; i < res.data.length; i++) {
                this.tableData.push(res.data[i]);
              }
              // this.$message.success("查询成功");
              this.isload = false;
            }
          },
          err => {
            this.$message.error(err);
            console.log(err);
            this.isload = false;
          }
        );
      //this.$message('获得数据')
    },
    // 改变页码
    currentChange(val) {
      this.pageData.page = val;
      this.getList();
    },
    // 搜索
    search() {
      this.$ajax
        .get("/user/finduser", {
          // headers: {
          //     "Content-Type": "application/json"
          // },
          params: {
            email: this.searchForm.email,
            name: this.searchForm.name
          }
        })
        .then(
          res => {
            this.tableData = [];
            if (res.data.length === 0) {
              this.$message.error("未找到相关数据");
              this.isload = false;
              // this.$router.go(0);
            } else {
              for (let i = 0; i < res.data.length; i++) {
                this.tableData.push(res.data[i]);
              }
              this.searchForm = {};
              this.$message.success("查询成功");
              this.isload = false;
            }
          },
          err => {
            this.$message.error(err);
            console.log(err);
            this.isload = false;
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
.manage-header {
  display: flex;
  justify-content: space-between;

  align-items: center;
}

body {
  margin: 0;
}
</style>