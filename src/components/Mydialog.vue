<template>
    <el-container>
        <el-main>
            <el-dialog class="my-dialog-name" :visible.sync="centerDialogVisible" width="70%"
                :close-on-click-modal="false" :show-close="false">
                <div style="height: 750px;  position:relative; border: 3px dashed #A12B06; background-color: #FFF1DD;">
                    <iframe frameborder="no" marginwidth="0" marginheight="0" scrolling="no" width="100%" height="100%"
                        :src="url"></iframe>
                    <img style="width:80px ; position:absolute; height: 80px; margin-left: -70px; margin-top: 30px;"
                        @click="closedialog" src="../assets/close.png" />
                </div>
            </el-dialog>
        </el-main>
    </el-container>
</template>
<script>
export default {
    data() {
        return {
            centerDialogVisible: false,
            url:''
        }

    },
    methods: {
        show(url) {
            this.centerDialogVisible = true
            this.url = url
        },
        closedialog() {
            this.centerDialogVisible = false
        }

    }
}
</script>
//没有scoped全局css全部文件生效但是其他地方用dialog样式也会生效
<style lang="scss">
.my-dialog-name {

    //因此通过el-dialog的class进行全局css中局部定义 只在当前文件生效
    .el-dialog {
        .el-dialog__header {
            //声明弹出框头dialog__header为蓝色   内容 和 尾巴标题这样修改，具体可以修改的东西点F12看它渲染出来的内容
            margin: 0;
            padding: 0;
        }

        .el-dialog__body {
            margin: 0;
            padding: 0;
            max-height: 90vh; //最大高度为视口高度的90%
        }
    }
}
</style>