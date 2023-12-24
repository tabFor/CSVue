<template>
  <div>
    <div>
      <el-button type="primary" @click="showDialog">+新增法律条文</el-button>
      <el-dialog title="新增法律条文" :visible.sync="dialogVisible">
        <el-form ref="lawForm" :model="lawForm" label-width="100px">
          <el-form-item label="法律名称">
            <el-input v-model="lawForm.name"></el-input>
          </el-form-item>
          <el-form-item label="法律内容">
            <el-input v-model="lawForm.content" type="textarea" placeholder="输入合同内容"
              :autosize="{ minRows: 10, maxRows: 30 }"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addLaw">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="formdiv">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="名称搜索">
          <el-input :disabled="isload" v-model="keyword" placeholder="输入法律名称查询"></el-input>
        </el-form-item>
        <el-form-item label="长文本搜索">
          <el-input :disabled="isload" v-model="content" type="textarea" placeholder="输入法律内容查询"
            :autosize="{ minRows: 2, maxRows: 16 }"></el-input>
        </el-form-item>
        <el-form-item>
          <el-form-item label="解释搜索">
            <el-input :disabled="isload" v-model="explain" type="textarea" placeholder="输入法律解释查询"
              :autosize="{ minRows: 2, maxRows: 16 }"></el-input>
          </el-form-item>
          <el-button @click="searchLaw" :disabled="isload">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" @row-click="handleClick"
      style="width: 100%" class="main_table" v-loading="isload">
      <el-table-column prop="lawName" label="法律" width="180">
      </el-table-column>
      <el-table-column prop="lawContent" label="内容">
        <template slot-scope="{ row }">
          <span>{{ row.lawContent }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="block" style="margin-top:15px;">
      <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage" :page-sizes="[1, 5, 10, 20]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      lawForm: {
        name: "",
        content: "" // 文件内容
      },
      fileList: [],
      isload: false,
      keyword: "",
      content: "",
      explain: "",
      tableData: [
        {
          lawName: "输入关键词",
          lawContent: "查询法律",
          lawExplain: "输入关键词，点击查询"
        }
      ],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 5 // 每页的数据条数
    };
  },
  mounted() {
    this.tableData = this.$global.lawTable;
  },
  methods: {
    handleClick(row) {
      this.$router.push({
        name: "showpage",
        params: {
          lawName: row.lawName,
          lawContent: row.lawContent,
          lawExplain: row.lawExplain
        }
      });
      this.$global.lawTable = this.tableData;
    },
    searchLaw() {
      this.isload = true;

      this.$ajax
        .get("/user/findlaw", {
          // headers: {
          //     "Content-Type": "application/json"
          // },
          params: {
            name: this.keyword,
            content: this.content,
            explain: this.explain
          }
        })
        .then(
          res => {
            if (res.data.length === 0) {
              this.tableData.length = 0;

              this.$message.error("未找到相关数据");
              this.isload = false;
              // this.$router.go(0);
            } else {
              this.tableData.length = 0;
              for (let i = 0; i < res.data.length; i++) {
                this.tableData.push(res.data[i]);
              }
              this.explain = "";
              this.content = "";
              this.keyword = "";
              this.$message.success("查询成功");
              this.isload = false;
            }
          },
          err => {
            this.$message.error(err);

            this.isload = false;
          }
        );
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    showDialog() {
      this.dialogVisible = true;
    },
    addLaw() {
      // 提交表单，处理新增法律条文的逻辑

      this.$ajax
        .get("/user/addlaw", {
          params: {
            name: this.lawForm.name,
            content: this.lawForm.content
          }
        })
        .then(response => {
          var responseData = response.data;
          if (responseData === "已成功添加") {
            this.$message.success("添加成功");
          } else {
            this.$message.error("法律已存在");
          }
          // 请求成功，获取返回的数据

          this.dialogVisible = false;
          // ...
        })
        .catch(error => {
          this.$message.error("错误");
          // 请求失败，处理错误
          console.error(error);
        });
      // 调用接口提交数据等操作
      // 提交成功后关闭对话框
    },
    handleUploadSuccess(response, file, fileList) {
      // 上传成功的回调

      this.fileList = fileList;
      // 可以将上传成功后的文件信息存储到 this.lawForm.content 中
    },
    beforeUpload(file) {
      // 上传前的钩子，用于限制文件类型和大小等
      const isTxt = file.type === "text/plain";
      const isDocx =
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

      if (!isTxt && !isDocx) {
        this.$message.error("上传文件只能是txt或docx格式!");
      }
      return (isTxt || isDocx) && isLt2M;
    },
    submitUpload() {
      this.$refs.upload.submit();
    }
  }
};
</script>
<style scoped>
.demo-form-inline {
  margin-top: 20px;
}

.formdiv {
  background-color: aliceblue;
}

.el-main {
  background-color: aliceblue;
}

body {
  margin: 0;
}
</style>
