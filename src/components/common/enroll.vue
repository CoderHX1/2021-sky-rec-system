<template>
  <div>
    <template>
      <!--        <br>-->
      <div style="float: left; margin-top: 30px; margin-bottom: 20px">
        全选
        <el-checkbox
          v-model="checked"
          @change="(checked) => selectAll(checked)"
          id="all_check"
        ></el-checkbox>
        <el-select
          v-model="sValue"
          placeholder="请选择"
          @change="sGetInfo(department, sValue)"
        >
          <el-option
            v-for="item in options"
            :key="item.st"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div class="buttons" style="display: inline-block">
          <el-button type="info" plain @click="showDialog">修改状态</el-button>
          <el-button type="info" plain @click="open">群发短信</el-button>
          <el-button type="info" plain @click="showResponses"
            >回复记录</el-button
          >
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" v-show="!shift">
        <el-table-column  label="选择" width="70" align="center">
          <div slot-scope="scope" name="operate">
            <el-checkbox
              v-model="scope.row.checkAll"
              class="el-checkbox"
              @change="
                (checked) => selected(checked, scope.$index, scope.row.id)
              "
              label="选择"
            ></el-checkbox>
          </div>
        </el-table-column>
        <el-table-column prop="id" label="ID" width="50" align="center"></el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="80"
          align="center"
        ></el-table-column>

        <el-table-column prop="sex" label="性别" width="50" align="center"></el-table-column>

        <el-table-column prop="qq" label="QQ" width="110" align="center"></el-table-column>

        <el-table-column prop="xy" label="院系" width="150" align="center"></el-table-column>

        <el-table-column prop="mj" label="班级" width="180" align="center"></el-table-column>

        <el-table-column
          prop="number"
          label="电话"
          width="110"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="zy1"
          label="意向一"
          width="110"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="zy2"
          label="意向二"
          width="110"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="zy3"
          label="意向三"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column prop="operate" label="操作" align="center" width="150">
          <div slot-scope="scope" name="operate">
            <!--              选择操作-->
            <el-popover
              placement="bottom"
              title="个人介绍"
              trigger="click"
            >
              <p>{{introduce}}</p>
<!--              <el-button slot="reference" type="primary" plain @click="moreInfo(scope.row.id)">更多信息展示</el-button>-->
              <span slot="reference">
                <el-button  type="primary" plain @click="moreInfo(scope.row.id)">更多信息展示</el-button>
<!--                  <a class="address">webrabbit博客</a>-->
              </span>
            </el-popover>
          </div>
        </el-table-column>
      </el-table>
<!--      修改用户状态弹窗-->
      <el-dialog
        title="修改用户状态"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <div>
          <el-select
            v-model="sValue1"
            placeholder="请选择"
            @change="sGetInfo(department, sValue)"
          >
            <el-option
              v-for="item in options"
              :key="item.st"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="confirm(name1, department, sValue1, selectedData)"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!--        群发短信弹窗-->
      <el-dialog
        title="群发短信"
        :visible.sync="dialogVisible1"
        width="30%"
        :before-close="handleClose"
      >
        <div>
          <span>当前状态：{{ smsState }}</span>
          <el-select v-model="selectMode" placeholder="请选择模板" value>
            <el-option
              v-for="item in modeList"
              :key="item.tpl_id"
              :label="item.tpl_id"
              :value="item.tpl_id"
            >
            </el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="batchSend">确 定</el-button>
        </span>
      </el-dialog>
      <div v-show="shift" style="width: 100%;">
        <!--        点击返回跳转到‘报名信息展示’-->
        <el-button type="primary" @click="backToInfo(department, sValue)" plain style="margin-top: 50px;margin-bottom: 20px;">返回</el-button>
        <el-table :data="responseList" style="width: 100%;">
          <el-table-column prop="id" label="编号" width="100" align="center"></el-table-column>

          <el-table-column
            prop="mobile"
            label="电话"
            width="200"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="name"
            label="姓名"
            width="150"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="text"
            label="回复内容"
            width="300"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="reply_time"
            label="时间"
            width="250"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
// import bus from '../../assets/eventBus'

export default {
  name: 'enroll',
  props: {
    department: {
      type: String,
      default: '技术开发部'
    },
    state: {
      type: String,
      default: '1'
    },
    getInfo: {
      type: Function,
      default: null
    }
  },
  components: {},
  data () {
    return {
      checked: '',
      options: [
        {
          value: '1',
          label: '已报名',
          st: '1'
        },
        {
          value: '2',
          label: '未通过初试',
          st: '2'
        },
        {
          value: '3',
          label: '已通过初试',
          st: '3'
        },
        {
          value: '4',
          label: '未通过复试',
          st: '4'
        },
        {
          value: '5',
          label: '已通过复试',
          st: '5'
        },
        {
          value: '6',
          label: '全部人员',
          st: '6'
        }
      ],
      sValue: '6',
      smsState: '',
      sValue1: '',
      name1: '',
      selectMode: '',
      allCheck: false,
      shift: false,
      tableData: [],
      selectedData: [],
      responseList: [],
      modeList: [],
      dialogVisible: false,
      dialogVisible1: false,
      introduce: '',
      batchSendName: [],
      batchSendTel: []
    }
  },
  methods: {
    //  使得下拉框里的文字与侧边栏的显示相同
    sync (st) {
      this.sValue = st
    },
    //  当每打开一个新部门时，使得下拉框里的选项为“全部人员”
    reset () {
      this.sValue = '6'
    },
    //  获取所查询的信息
    sGetInfo (department, st) {
      var that = this
      that.tableData = []
      st = parseInt(st)
      // eslint-disable-next-line no-unused-expressions
      // console.log(typeof st)
      axios
        .post('https://zxback.tsky31.cn/api/classification', {
          dp: department,
          state: st
        })
        .then(
          function (res) {
            //console.log(res.data)
            //console.log(typeof res.data.data)
            // eslint-disable-next-line valid-typeof,no-undef
            if (Array.isArray(res.data.data)) {
              let list = []
              res.data.data.map((item, index) => {
                list.push(
                  Object.assign(item, {checkAll: false})
                )
              })
              that.tableData = list
              //console.log(that.tableData)
            } else if (typeof res.data.data === 'object') {
              // console.log(res.data.data.length)
              let a = []
              let b = 'checkAll'
              a[0] = res.data.data
              that.tableData = a
              that.tableData[0][b] = false
              // console.log(that.tableData)
            }
            // else {
            //
            // }
          },
          function (err) {
            //console.log(err)
          }
        )
      // console.log(this.options)
      // if (this.getInfo) {
      //   console.log(123)
      //   this.getInfo(this.department, this.sValue)
      //   // console.log(this.getInfo(this.department, this.sValue))
      //   // this.tableData = this.getInfo(this.department, this.sValue)
      // }
      // this.$parent.getInfo(this.department, this.sValue)
    },
    //搜索功能
    getmenbers(params){
      axios.post('https://zxback.tsky31.cn/api/select',params)
      .then(resp=>
      {
        //console.log('结果:',resp)
        this.tableData=resp.data.data
        }
      )
    },
    moreInfo (id) {
      let that = this
      axios.post('https://zxback.tsky31.cn/api/output', { ID: id }).then(
        function (res) {
         // console.log(res)
          that.introduce = res.data.data.jieshao
        },
        // eslint-disable-next-line handle-callback-err
        function (err) {
          // console.log(err)
        }
      )
      // this.selfIntroduction = a
    },
    selected (checked, id, name) {
      //console.log(name)
      this.name1 = name
      if (checked) {
        this.tableData[id].checkAll = true
        this.selectedData.push(this.tableData[id].id)
        this.batchSendName.push(this.tableData[id].username)
        this.batchSendTel.push(this.tableData[id].number)
        //console.log(this.selectedData)
      } else {
        this.tableData[id].checkAll = false
        this.selectedData.splice(id, 1)
      }
    },
    handleClose () {
      this.dialogVisible = false
      this.dialogVisible1 = false
    },
    //  当点击“修改状态”按钮时，显示详细对话框，并且将记录修改后的状态的变量sValue1的初始值与当前状态同步
    showDialog () {
      this.dialogVisible = !this.dialogVisible
      this.sValue1 = this.sValue
    },
    //  当点击对话框中的“确定”按钮时，将数据传给后端，改变状态
    confirm (name, md, state, id) {
      // let a = this.dialogVisible
      let that = this
      if (this.selectedData.length === 1) {
        axios
          .post('https://zxback.tsky31.cn/api/changeOne', {
            zy: md,
            id: parseInt(id),
            state: parseInt(state)
          })
          .then(
            function (res) {
              //console.log(res)
              // a = !a
              that.sGetInfo(that.department, that.sValue)
              alert('状态修改成功！')
            },
            function (err) {
              //console.log(err)
              alert('状态修改失败！请联系程序猿！')
            }
          )
      } else {
        id = id.join(',')
        //console.log(id)
        axios
          .post('https://zxback.tsky31.cn/api/changeMore', {
            zy: md,
            id: id,
            state: parseInt(state)
          })
          .then(
            function (res) {
              //console.log(res)
              // a = !a
              that.sGetInfo(that.department, that.sValue)
              alert('状态修改成功！')
            },
            function (err) {
              //console.log(err)
              alert('状态修改失败！请联系程序猿！')
            }
          )
      }
      this.dialogVisible = !this.dialogVisible
    },
    selectAll (checked) {
      //console.log(checked)
      // let a = document.getElementsByClassName('el-checkbox')
      if (checked) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].checkAll = true
          this.selectedData[i] = this.tableData[i].id
          this.batchSendName[i] = this.tableData[i].username
          this.batchSendTel[i] = this.tableData[i].number
        }
      } else {
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].checkAll = false
        }
        this.selectedData = []
      }
    },
    // let all = document.getElementById('all_check');
    // let a = document.getElementsByClassName('el-checkbox')
    // // console.log(all);
    // // console.log(check[0]);
    // if(all.checked == true){
    //   for(let i = 0;i < a.length;i++){
    //     a[i].checked = true;
    //   }
    // }
    // else{
    //   for(let i = 0;i < a.length;i++){
    //     a[i].checked = false;
    //   }
    // }
    showResponses () {
      // let department = this.department
      // let a = []
      let that = this
      axios.post('https://zxback.tsky31.cn/api/pull_reply', { md: that.department }).then(
        function (res) {
          console.log(res.data)
          that.responseList = res.data
        },
        // eslint-disable-next-line handle-callback-err
        function (err) {
          //console.log(err)
        }
      )
      // this.responseList = a
      this.shift = !this.shift
    },
    backToInfo (department, sValue) {
      this.shift = !this.shift
      this.sGetInfo(department, sValue)
    },
    open () {
      let a = parseInt(this.sValue)
      // console.log(a)
      this.dialogVisible1 = true
      this.smsState = this.options[a - 1].label
      // console.log(this.options[a - 1])
      this.getMode()
    },
    getMode () {
      // let a
      let that = this
      axios.post('https://zxback.tsky31.cn/api/getMod').then(
        function (res) {
          //console.log(res)
          that.modeList = res.data
        },
        function (err) {
          //console.log(err)
        }
      )
      // this.modeList = a
      //console.log(this.modeList)
    },
    batchSend () {
      let that = this
      let mobile
      let name
      if (this.batchSendTel.length === 1) {
        mobile = this.batchSendTel[0]
        name = this.batchSendName[0]
      } else {
        mobile = this.batchSendTel.join(',')
        name = this.batchSendName.join(',')
      }
      //console.log(mobile + ' ' + name)
      axios.post('https://zxback.tsky31.cn/api/batch_send', {mobile: mobile, tpl_id: that.selectMode, name: name}).then(
        function (res) {
          //console.log(res)
          that.modeList = res.data
          that.dialogVisible1 = false
          alert('发送成功！')
          // that.batchSendName = []
          // that.batchSendTel = []
        },
        function (err) {
          //console.log(err)
          //console.log(mobile + ' ' + name)
          alert('发送失败！请联系程序猿！')
        }
      )
    }
  }
}
</script>

<style scoped>
</style>
