<template>
    <div>
        <div>
            <el-button type="primary" @click="showDialog">新增法律条文</el-button>
            <el-dialog title="新增法律条文" :visible.sync="dialogVisible">
                <el-form ref="lawForm" :model="lawForm" label-width="100px">
                    <el-form-item label="法律名称">
                        <el-input v-model="lawForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="法容">
                        <el-input v-model="lawForm.content" type="textarea" placeholder="输入合同内容"
                            :autosize="{ minRows: 10, maxRows: 20 }"></el-input>
                    </el-form-item>
                    <el-form-item label="法律内容">
                        <el-upload class="upload-demo" action="/upload" :on-success="handleUploadSuccess"
                            :before-upload="beforeUpload" :file-list="fileList" multiple :limit="3" :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传doc/txt文件</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addLaw">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="formdiv">
            <el-form @row-click="handleRowClick" :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="名称搜索">
                    <el-input :disabled="isload" v-model="keyword" placeholder="输入法律名称"></el-input>
                </el-form-item>
                <el-form-item label="长文本搜索">
                    <el-input :disabled="isload" v-model="content" type="textarea" placeholder="输入合同内容"
                        :autosize="{ minRows: 2, maxRows: 16 }"></el-input>
                </el-form-item>
                <el-form-item label="搜索">
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
                name: '',
                content: '' // 文件内容
            },
            fileList: [],
            isload: false,
            keyword: "",
            content: "",
            tableData: [
                {
                    lawName: "输入关键词",
                    lawContent: "查询法律"
                }
            ],
            currentPage: 1, // 当前页码
            total: 20, // 总条数
            pageSize: 5 // 每页的数据条数
        };
    },
    methods: {
        handleClick(row) {
            this.$router.push({
                name: 'showpage',
                params: {
                    lawName: row.lawName,
                    lawContent: row.lawContent
                }
            })
        },
        searchLaw() {
            this.isload = true;
            console.log(this.content);
            this.$ajax
                .get("/addlaw", {
                    // headers: {
                    //     "Content-Type": "application/json"
                    // },
                    params: {
                        name: this.keyword,
                        content: this.content
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
        },
        showDialog() {
            this.dialogVisible = true;
        },
        addLaw() {
            // 提交表单，处理新增法律条文的逻辑
            console.log('新增法律名称：', this.lawForm.name);
            console.log('法律内容：', this.lawForm.content);
            this.$ajax.get("/addlaw", {
                params: {
                    name: this.lawForm.name,
                    content: this.lawForm.content,
                    files: this.fileList
                }
            })
                .then(response => {

                    var responseData = response.data;
                    if (responseData === '已成功添加') {
                        this.$message.success('添加成功');
                    }

                    else {
                        this.$message.error('法律已存在');
                    }
                    // 请求成功，获取返回的数据
                    console.log(response.data);
                    this.dialogVisible = false;
                    // ...
                })
                .catch(error => {
                    this.$message.error('错误');
                    // 请求失败，处理错误
                    console.error(error);
                });
            // 调用接口提交数据等操作
            // 提交成功后关闭对话框
        },
        handleUploadSuccess(response, file, fileList) {
            // 上传成功的回调
            console.log('上传成功', response, file, fileList);
            this.fileList = fileList;
            // 可以将上传成功后的文件信息存储到 this.lawForm.content 中
        },
        beforeUpload(file) {
            // 上传前的钩子，用于限制文件类型和大小等
            const isTxt = file.type === 'text/plain';
            const isDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

            if (!isTxt && !isDocx) {
                this.$message.error('上传文件只能是txt或docx格式!');
            }
            return (isTxt || isDocx) && isLt2M;
        },
        submitUpload() {
            this.$refs.upload.submit();
        }
    }
};
</script>
<style>
.main_table {
    min-height: 74vh;
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
