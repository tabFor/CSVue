<template>
    <div class="legal-text">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
        <el-divider></el-divider>
        <div class="explain">
            <h3>解释：</h3>
            <p>{{ explainText }}</p>
            <el-button type="primary" @click="handleEdit">编辑</el-button>
            <el-button type="primary" @click="handleDelete">删除</el-button>
        </div>
        <el-dialog title="编辑解释" :visible.sync="dialogVisible">
            <el-form :model="form" label-position="left" label-width="80px">
                <el-form-item label="解释文本">
                    <el-input type="textarea" v-model="form.explain" rows="5"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitEdit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            lawName: '',
            title: '法律名称',
            content: '法律条文完整内容',
            explainText: '法律条文解释文本',
            dialogVisible: false,
            form: {
                explain: ''
            }
        }
    },
    created() {
        this.lawName = this.$route.params.lawName;
        this.content = this.$route.params.lawContent;
    },
    methods: {
        handleDelete() {
            this.$ajax
                .get("/deletelaw", {
                    // headers: {
                    //     "Content-Type": "application/json"
                    // },
                    params: {
                        name: this.lawName,
                        content: this.content
                    }
                })
                .then(
                    res => {
                        resData = res.data;
                        if (resData === '已成功删除1q') {
                            this.$message.success("删除成功");
                        } else {

                            this.$message.error("法律不存在");
                        }
                    },
                    err => {
                        this.$message.error(err);
                        console.log(err);
                    }
                );
        },
        handleEdit() {
            this.form.explain = this.explainText;
            this.dialogVisible = true;
        },
        submitEdit() {
            console.log(this.content);
            this.$ajax
                .get("/update", {
                    // headers: {
                    //     "Content-Type": "application/json"
                    // },
                    params: {
                        name: this.lawName,
                        content: this.form.explain
                    }
                })
                .then(
                    res => {
                        resData = res.data;
                        if (resData === '已修改') {
                            this.$message.success("修改成功");
                        } else {

                            this.$message.error("法律不存在");
                        }
                    },
                    err => {
                        this.$message.error(err);
                        console.log(err);
                    }
                );

            // 在此处发送请求将编辑后的解释文本提交到后端进行保存
            this.explainText = this.form.explain;
            this.dialogVisible = false;
        }
    }
}
</script>

<style>
.legal-text {
    padding: 20px;
}

.explain {
    margin-top: 20px;
}
</style>
