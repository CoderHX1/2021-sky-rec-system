<template>
  <div>
    <div id="app">
      <!-- 主体内容 -->
      <div class="body">
        <template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="ID" width="180"
              ><template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template></el-table-column
            >
            <el-table-column
              prop="name"
              label="姓名"
              width="180"
            ></el-table-column>
            <el-table-column prop="position" label="部门"></el-table-column>
            <el-table-column prop="number" label="账号"></el-table-column>
            <el-table-column prop="birthday" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="editUser(scope.row, scope.$index)"
                  circle
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="delUser(scope.$index)"
                  circle
                >
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <!-- 编辑框 -->
      <el-dialog
        title="编辑用户信息"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <div>
          <el-form ref="form" :model="editObj" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model="editObj.name"></el-input>
            </el-form-item>
            <el-form-item label="部门">
              <el-input v-model="editObj.position"></el-input>
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="editObj.number"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
      <el-button type="text" @click="registerVisible = true" class="add-btn"
        >点击注册账号</el-button
      >

      <el-dialog
        title="提示"
        :visible.sync="registerVisible"
        width="30%"
        :before-close="registerClose"
      >
        <div class="head">
          <el-form ref="form" :model="form" label-width="80px"  size="mini">
            <el-form-item label="账号">
              <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="选择部门">
              <el-select v-model="form.region" placeholder="请选择部门">
                <el-option label="技术开发部" value="技术开发部"></el-option>
                <el-option label="企划公关部" value="企划公关部"></el-option>
                <el-option label="设计部" value="设计部"></el-option>
                <el-option label="新媒体运营部" value="新媒体运营部"></el-option>
                <el-option label="新闻通讯社" value="新闻通讯社"></el-option>
                <el-option label="行政人事部" value="行政人事部"></el-option>
                <el-option label="产品运营部" value="产品运营部"></el-option>
                <el-option label="产品经理部" value="产品经理部"></el-option>
                <el-option label="多媒体事业部" value="多媒体事业部"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
         
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="registerVisible = false">取 消</el-button>
          <el-button type="primary" @click="registerVisible = false"
            >提交</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      registerVisible: false,
      dialogVisible:false,
      userInfo: {
        name: "",
        position: "",
        number: "",
      },
      tableData: [
        {
          name: "小明",
          position: "技术开发部",
          number: "2",
        },
        {
          name: "小红",
          position: "设计部",
          number: "12",
        },
        {
          name: "小王",
          position: "产品经理",
          number: "4",
        },
      ],
      editObj: {
        name: "",
        position: "",
        major: "",
        number: "",
      },
      userIndex: 0,
      form: {
        name: "",
        account: "",
        password: "",
        phone: "",
        region: "",
      },
    };
  },
  methods: {
    //添加
    addUser() {
      if (!this.userInfo.name) {
        this.$message({
          message: "请输入你的公司名！",
        });
        return;
      }
      if (!this.userInfo.position) {
        this.$message({
          message: "请输入你的职位！",
          type: "warning",
        });
        return;
      }
      if (!this.userInfo.major) {
        this.$message({
          message: "请输入你的专业！",
          type: "warning",
        });
        return;
      }
      if (!this.userInfo.number) {
        this.$message({
          message: "请输入数量！",
          type: "warning",
        });
        return;
      }
      this.tableData.push(this.userInfo);
      this.userInfo = {
        name: "",
        position: "",
        major: "",
        number: "",
      };
    },

    //删除
    delUser(idx) {
      this.$confirm("确认删除此用户信息？")
        .then((_) => {
          this.tableData.splice(idx, 1);
        })
        .catch((_) => {});
    },
    //编辑
    editUser(item, idx) {
      this.userIndex = idx;
      this.editObj = {
        name: item.name,
        position: item.position,
        major: item.major,
        number: item.number,
      };
      this.dialogVisible = true;
    },

    handleClose() {
      this.dialogVisible = false;
    },

    confirm() {
      this.dialogVisible = false;
      Vue.set(this.tableData, this.userIndex, this.editObj);
    },
    registerClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style scoped>
#app {
  width: 1024px;
  margin: 0 auto;
}

.add-btn {
  margin-top: 20px;
  width: 100%;
}

.body {
  margin-top: 20px;
}
</style>