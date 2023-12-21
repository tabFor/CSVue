<template>
  <div>
    <div class="formdiv">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="法律搜索">
          <el-input
            :disabled="isload"
            v-model="keyword"
            placeholder="输入法律关键词"
          ></el-input>
          <el-input
            :disabled="isload"
            v-model="lawname"
            placeholder="输入法律名"
          ></el-input>
          <el-input
            :disabled="isload"
            v-model="lawcontent"
            placeholder="输入法律条例"
          ></el-input>
        </el-form-item>
        <el-form-item label="搜索">
          <el-button
            @click="searchKeyLaw"
            :disabled="isload"
          >搜索</el-button>
        </el-form-item>
        <el-form-item label="长文本搜索">
          <el-input
            :disabled="isload"
            v-model="content"
            type="textarea"
            placeholder="输入合同内容"
            :autosize="{ minRows: 2, maxRows: 16}"
          ></el-input>
        </el-form-item>
        <el-form-item label="搜索">
          <el-button
            @click="searchLaw"
            :disabled="isload"
          >搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 100%"
      class="main_table"
      v-loading="isload"
    >
      <el-table-column
        prop="lawName"
        label="法律"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="lno"
        label="条款"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="lawContent"
        label="内容"
      >
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div
      class="block"
      style="margin-top:15px;"
    >
      <el-pagination
        align='center'
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1,5,10,20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>

</template>

<script>
import loginVue from "./login.vue";
export default {
  data() {
    return {
      isload: false,
      keyword: "",
      lawname: "",
      lawcontent: "",
      content: "",
      tableData: [
        {
          lawName: "输入关键词",
          lno: "即可",
          lawContent: "查询法律"
        }
      ],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 5 // 每页的数据条数
    };
  },
  methods: {
    searchKeyLaw() {
      this.isload = true;
      this.$ajax
        .get("/user/findlaw", {
          params: {
            name: this.lawname,
            content: this.lawcontent,
            explain: this.keyword,
            "session-id": this.$session.get("session-id")
          }
        })
        .then(
          res => {
            console.log(res.data);
            console.log(this.tableData);
            console.log(res.data.length);
            if (res.data.length === 0) {
              this.tableData.length = 0;

              this.$message.error("未找到相关数据");
              this.isload = false;
              // this.$router.go(0);
            } else {
              this.tableData.length = 0;
              for (let i = 0; i < res.data.length; i++) {
                this.tableData.push(res.data[i]);
                console.log(this.tableData[i]);
              }
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
    },
    searchLaw() {
      this.isload = true;
      console.log(this.content);
      this.$ajax
        .post("/user/longsearch", this.content, {
          headers: {
            "Content-Type": "text/plain"
          }
        })
        .then(
          res => {
            console.log(res.data);
            console.log(this.tableData);
            console.log(res.data.length);
            if (res.data.length === 0) {
              this.tableData.length = 0;

              this.$message.error("未找到相关数据");
              this.isload = false;
              // this.$router.go(0);
            } else {
              this.tableData.length = 0;
              for (let i = 0; i < res.data.length; i++) {
                this.tableData.push(res.data[i]);
                console.log(this.tableData[i]);
              }
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
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  }
};
</script>
<style>
.main_table {
  min-height: 60vh;
  /* max-height: 60vh; */
}
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
