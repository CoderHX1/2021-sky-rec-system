<template>
    <div>
      <div class="buttons">
        <el-button type="info" plain class="bigger" @click="SMSMode">短信模板</el-button>
        <el-button type="info" plain class="bigger" @click="addSMS">添加短信</el-button>
        <el-button type="info" plain class="bigger" @click="sendHistory">发送历史</el-button>
      </div>
      <div v-show="modeShow">
        <el-table :data="modeList" style="width: 100%; margin: 10px auto">
          <el-table-column
            prop="tpl_id"
            label="编号"
            width="100"
          ></el-table-column>

          <el-table-column
            prop="tpl_content"
            label="内容"
            width="600"
          ></el-table-column>

          <el-table-column
            prop="check_status"
            label="状态"
            width="120"
          ></el-table-column>
          <el-table-column prop="operate" label="操作" width="150">
            <div slot-scope="scope" name="operate">
              <!--              选择操作-->
<!--              <el-checkbox v-model="checked" class="el-checkbox" @change="checked=>selected(checked,scope.$index, scope.row.name)" label="选择"></el-checkbox>-->
              <el-button type="primary" icon="el-icon-edit" @click="showDialog(scope.row.tpl_id, scope.row.tpl_content)" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" @click="delUser(scope.row.tpl_id)" circle></el-button>
            </div>
          </el-table-column>
        </el-table>
        <el-dialog title="修改短信" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" >
          <div>
            <el-input
              type="textarea"
              :rows="9"
              placeholder="请输入内容"
              v-model="content"
              >
<!--              v-model="scope.row.content"-->
            </el-input>
            <p style="margin-top: 30px">请详细阅读添加模版<b>注意事项</b>再来进行修改</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="modifySubmit">提 交</el-button>
          </span>
        </el-dialog>
      </div>
      <div v-show="addShow" style="width: 80%;margin: 0 auto">
        <el-input
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
          v-model="addMode"
        >
          <!--          value="【三翼工作室】"-->
          <!--              v-model="scope.row.content"-->
        </el-input>
        <div style="text-align: left">
          1.模板头部必须为已审核通过的短信签名<br/>
          2.短信模板中的变量目前支持部门（#department#）和姓名(#name#)两个，在发送短信时，系统会自动替换为报名的部门及收信人的姓名<br/>
          3.模板请勿重复，否则会添加不成功<br>如使用以下模板：<br/>
          【三翼工作室】亲爱的#name#你好，欢迎报名三翼工作室的#department#，请于9月10日在兴湘B栋101初试[收到请回复姓名]<br/>
          若收信人的姓名为张三，部门为技术开发部，那么，其收到短信时内容为：<br/>
          【三翼工作室】亲爱的张三你好，欢迎报名三翼工作室的技术开发部，请于9月10日在兴湘B栋101初试[收到请回复姓名]<br/>
          <b>敬告：短信模板是由云片网人工审核，审核时间为9:00 ~ 23:00 ，另外，一条短信存在字数限制，一条以70个字计算，多条以67个字计算，均包含签名字数，具体由最终发送内容决定，添加模板时请把握好字数</b><br/>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSubmit">提 交</el-button>
        </span>
      </div>
      <div v-show="historyShow">
<!--        点击返回跳转到‘短信模板’-->
        <el-button @click="SMSMode" type="primary" plain>返回</el-button>
        <el-table :data="historyData" style="width: 100%; margin: 10px auto">
          <el-table-column
            prop="mobile"
            label="电话"
            width="180"
          ></el-table-column>

          <el-table-column
            prop="text"
            label="内容"
            width="600"
          ></el-table-column>

          <el-table-column
            prop="send_time"
            label="时间"
            width="200"
          ></el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
// import bus from '../../assets/eventBus.js'

export default {
  name: 'send',
  props: {

  },
  components: {

  },
  data () {
    return {
      modeList: [],
      historyData: [],
      tableData: [
        // {
        //   id: '1',
        //   content: 'hhhhhh',
        //   state: '已通过'
        // },
        // {
        //   id: '2',
        //   content: 'hhhhhh',
        //   state: '未通过'
        // },
        // {
        //   id: '3',
        //   content: 'hhhhhh',
        //   state: '已通过'
        // },
        // {
        //   id: '4',
        //   content: 'hhhhhh',
        //   state: '已通过'
        // }
      ],
      modeShow: false,
      addShow: false,
      historyShow: false,
      dialogVisible: false,
      id: '',
      content: '',
      addMode: '【三翼工作室】'
    }
  },
  methods: {
    //  获取模板并展示
    SMSMode () {
      let that = this
      // let a = []
      axios.post('https://zxback.tsky31.cn/api/getMod')
        .then(function (res) {
          console.log(res.data)
          that.modeList = res.data
          // a = res.data
          // console.log(a)
        }, function (err) {
          console.log(err)
        })
      // this.modeList = a
      // console.log(this.modeList)
      this.modeShow = true
      this.addShow = false
      this.historyShow = false
      // this.sendMode()
    },
    // 添加模板
    addSMS () {
      //  传数据给后端
      this.modeShow = false
      this.addShow = true
      this.historyShow = false
    },
    //  获取发送历史
    sendHistory () {
      let that = this
      axios.post('https://zxback.tsky31.cn/api/get_recode')
        .then(function (res) {
          console.log(res)
          that.historyData = res.data
        }, function (err) {
          console.log(err)
        })
      // this.historyData = a
      this.modeShow = false
      this.addShow = false
      this.historyShow = true
    },
    //  删除模板
    delUser (idx) {
      let that = this
      this.$confirm('确认删除此模板？')
        .then(_ => {
          console.log(idx)
          // this.tableData.splice(idx, 1)
          axios.post('https://zxback.tsky31.cn/api/delMod', {tpl_id: idx})
            .then(function (res) {
              console.log(res)
              that.SMSMode()
              alert('您已经成功删除！')
            }, function (err) {
              console.log(err)
            })
        })
        .catch(_ => {
        })
    },
    //  弹出修改对话框
    showDialog (id, content) {
      this.dialogVisible = !this.dialogVisible
      this.id = id
      this.content = content
    },
    handleClose () {
      this.dialogVisible = false
    },
    //  提交修改
    modifySubmit () {
      let that = this
      // let id = this.id
      // let content = this.content
      console.log(this.id + '  ' + this.content)
      axios.post('https://zxback.tsky31.cn/api/updateMod', {tpl_id: that.id, tpl_content: that.content})
        .then(function (res) {
          console.log(res)
          that.SMSMode()
          alert('您已经成功修改！')
          that.handleClose()
        }, function (err) {
          console.log(err)
        })
    },
    //  添加模板
    addSubmit () {
      console.log(this.addMode)
      // let a = this.addMode
      let that = this
      //  传数据给后端
      axios.post('https://zxback.tsky31.cn/api/addMod', {tpl_content: that.addMode})
        .then(function (res) {
          console.log(res)
          that.addMode = '【三翼工作室】'
          that.SMSMode()
          alert('添加成功！')
        }, function (err) {
          console.log(err)
          alert('添加失败！')
        })
    }
    // sendMode () {
    //   let list = []
    //   for (let i = 0; i < this.tableData.length; i++) {
    //     list.push(this.tableData[i])
    //   }
    //   bus.$emit('modes', list)
    // }
  }
  // watch: {
  //   tableData: {
  //     //  将模板传给enroll组件
  //     sendMode () {
  //       let list = []
  //       for (let i = 0; i < this.tableData.length; i++) {
  //         list.push(this.tableData[i])
  //       }
  //       bus.$emit('modes', list)
  //     }
  //     // deep: true,
  //     // immediate: false
  //   }
  // }
}
</script>

<style scoped>
.buttons{
  width: 80%;
  margin: 50px auto;
  display: inline-block;
  /*justify-content: space-around;*/
}
</style>

<style>
.bigger{
  width: 200px;
}
</style>
