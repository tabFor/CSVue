<template>
  <div>
    <!-- 表格 -->
    <el-table
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 100%"
      class="table_content"
    >
      <el-table-column
        prop="date"
        label="对话日期"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleLook(scope.$index, scope.row)"
          >预览</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="open(scope.$index, scope.row)"
          >删除</el-button>
        </template>
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
    <el-dialog
      title="对话内容"
      :visible.sync="dialogVisible"
      :fullscreen="true"
      
    >
      <div
        v-for="index in items"
        v-bind:key="index.inputask"
      >
        <p>
          问题：
        </p>
        <el-input
          type="textarea"
          :rows="2"
          v-model="index.inputask"
          :readonly="true"
        >
        </el-input>
        <p>
          回答：
        </p>
        <el-input
          type="textarea"
          :rows="2"
          v-model="index.massgge"
          :readonly="true"
        >
        </el-input>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      items: [
        {
          massgge: "欢迎",
          inputask: "AI"
        }
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "第一页",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 5 // 每页的数据条数
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    open(a, b) {
      this.$confirm("此操作将永久删除该对话, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.handleDelete(a, b);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    fetchData() {
      console.log("fetchData");
      this.$ajax
        .post("/user/showdialogues", this.tableData, {
          headers: {
            "session-id": this.$session.get("session-id")
          }
        })
        .then(res => {
          console.log(this.$session.get("session-id"));
          console.log(res.data);
          console.log(res);
          this.tableData = res.data.map(date => ({ date }));
          this.$message.success("加载成功");
        })
        .catch(err => {
          console.log(err);
          this.$message.error("加载失败");
        });
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
    },
    handleLook(index, row) {
      console.log(index, row, row.date);
      this.$ajax
        .get("/user/showdialogue", {
          params: {
            time: row.date,
            "session-id": this.$session.get("session-id")
          }
        })
        .then(res => {
          console.log(res);
          this.$message.success("预览成功");
          console.log(res.data);
          console.log(res.data.length);
          this.items.length = 0;
          for (let i = 0; i < res.data.length; i++) {
            this.items.push(res.data[i]);
            console.log(this.items[i]);
          }

          this.dialogVisible = true;
        })
        .catch(err => {
          console.log(err);
          this.$message.error("预览失败");
        });
    },
    handleDelete(index, row) {
      console.log(index, row, row.date);
      this.$ajax
        .get("/user/deletedialogue", {
          params: {
            time: row.date,
            "session-id": this.$session.get("session-id")
          }
        })
        .then(res => {
          location.reload();
          console.log(res);
          this.$message.success("删除成功");
        })
        .catch(err => {
          console.log(err);
          this.$message.error("删除失败");
        });
    }
  }
};
</script>

<style>
.table_content {
  min-height: 84.2vh;
}
body {
  margin: 0;
}
</style>