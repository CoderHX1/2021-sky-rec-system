<template>
  <div>
    <el-container>
      <el-header>
        <div class="header">
          <div class="photoinner">
            <img src="../assets/sky.png" class="photo" />
          </div>

          <div class="nav">
            <li><a @click="enroll">报名管理</a></li>
            <li><a @click="interior">内部管理</a></li>
            <li><a @click="database">数据统计</a></li>
            <li><a id="export_file" :href="downloadUrl">导出Csv</a></li>
            <li><a @click="send">发送短信</a></li>
          </div>
          <div>
            <div class="search">
              <!-- <el-input class="menber-input" v-model="id"  placeholder="请输入id"></el-input> -->
              <el-select style="min-width:80px" v-model="selected" value-key="id" >
                  <el-option value="" label="请选择" />
                  <el-option
                    v-for="(item) in options"
                    :key="item.id"
                    :label="item.value"
                    :value="item"
                  />
                </el-select>
              <el-input
                class="menber-input"
                v-model="username"
                placeholder="请输入"
              >

              </el-input>




              <!-- <el-input class="menber-input" v-model="qq"  placeholder="请输入qq号"></el-input>  -->
              <el-button
                class="menber-button"
                type="primary"
                @click="search_a()"
                icon="el-icon-search"
                >搜索</el-button
              >
            </div>
          </div>
          <div class="nav-right">
            <el-button type="primary" plain @click="out()" class="loginout"
              >点击退出</el-button
            >
          </div>
        </div>
      </el-header>

      <el-container>
        <el-aside width="210px">
          <el-menu
            :unique-opened="ctrl"
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu
              :index="item.id + ''"
              v-for="item in textList"
              :key="item.id"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span @click="resetState(item.title)">{{ item.title }}</span>
              </template>

              <el-menu-item
                :index="item.id + ''"
                v-for="item2 in item.children"
                :key="item2.st"
                @click="display(item2.methods, item2.st, item.title)"
                >{{ item2.title }}</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="mainPage">
<!--            (改) 修改了，当从其他页面回去报名管理页面时，这里字都是技术开发部-->
            <div class="ac-title">三翼工作室 > {{ department }}</div>
            <enroll
              :class="{ isActive: enrollHide }"
              :getInfo="getInfo"
              :department="department"
              :state="state"
              ref="child"
            ></enroll>
            <interior :class="{ isActive: interHide }"></interior>
            <database :class="{ isActive: dataHide }" ref="mychild"></database>
            <menber ref="menber" :class="{ isActive: menberHide }"></menber>
<!--            改缺陷100283 3）-->
            <send :class="{ isActive: sendHide }" ref="send"></send>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script scoped>
import enroll from "./common/enroll.vue";
import interior from "./common/interior.vue";
import database from "./common/database.vue";

import send from "./common/send.vue";
import json2csv from "json2csv";
import menber from "./common/menber.vue";

export default {
  props: {},
  components: {
    menber: menber,
    enroll: enroll,
    interior: interior,
    database: database,
    send: send,
  },
  data() {
    return {
      //  （改）一进来就看到报名管理页面
      enrollHide: false,
      dataHide: true,
      interHide: true,
      sendHide: true,
      menberHide: true,
      ctrl: true,

      department: "技术开发部",
      state: "6",

      md: "",
      // state: "",
      downloadUrl: "",
      username: "",
      select:"",
      // department: "",
      // state: "",
      input: "",
      num: "0",
      menuList: [],
      selected:{id:0,value:'请选择',name:''},
      options:[
        {id:1,value:'用户ID',name:'id'},
        {id:2,value:'姓名',name:'username'},
        {id:3,value:'电话号码',name:'number'},
        {id:4,value:'qq',name:'qq'},
        {id:5,value:'院系',name:'xy'},
        {id:6,value:'班级',name:'mj'}
      ],

      textList: [
        {
          title: "技术开发部",
          id: "1",
          children: [
            { title: "全部人员", methods: "menbers", st:"6"},
            { title: "已经报名", methods: "menbers", st:"1"},
            { title: "未通过初试", methods: "menbers", st:"2"},
            { title: "已通过初试", methods: "menbers", st:"3"},
            { title: "未通过复试", methods: "menbers", st:"4"},
            { title: "已通过复试", methods: "menbers", st:"5"},
          ],
        },
        {
          title: "企划公关部",
          id: "2",
          children: [
            { title: "全部人员", methods: "menbers", st:"6"},
            { title: "已经报名", methods: "menbers", st:"1"},
            { title: "未通过初试", methods: "menbers", st:"2"},
            { title: "已通过初试", methods: "menbers", st:"3"},
            { title: "未通过复试", methods: "menbers", st:"4"},
            { title: "已通过复试", methods: "menbers", st:"5"},
          ],
        },
        {
          title: "设计部",
          id: "3",
          children: [
            { title: "全部人员", methods: "menbers", st:"6"},
            { title: "已经报名", methods: "menbers", st:"1"},
            { title: "未通过初试", methods: "menbers", st:"2"},
            { title: "已通过初试", methods: "menbers", st:"3"},
            { title: "未通过复试", methods: "menbers", st:"4"},
            { title: "已通过复试", methods: "menbers", st:"5"},
          ],
        },
        {
          title: "新媒体运营部",
          id: "4",
          children: [
            { title: "全部人员", methods: "menbers", st:"6"},
            { title: "已经报名", methods: "menbers", st:"1"},
            { title: "未通过初试", methods: "menbers", st:"2"},
            { title: "已通过初试", methods: "menbers", st:"3"},
            { title: "未通过复试", methods: "menbers", st:"4"},
            { title: "已通过复试", methods: "menbers", st:"5"},
          ],
        },
        {
          title: "新闻通讯社",
          id: "5",
          children: [
            { title: "全部人员", methods: "menbers", st:"6"},
            { title: "已经报名", methods: "menbers", st:"1"},
            { title: "未通过初试", methods: "menbers", st:"2"},
            { title: "已通过初试", methods: "menbers", st:"3"},
            { title: "未通过复试", methods: "menbers", st:"4"},
            { title: "已通过复试", methods: "menbers", st:"5"},
          ],
        },
        {
          title: "行政人事部",
          id: "6",
          children: [
            { title: "全部人员", methods: "menbers", st:"6"},
            { title: "已经报名", methods: "menbers", st:"1"},
            { title: "未通过初试", methods: "menbers", st:"2"},
            { title: "已通过初试", methods: "menbers", st:"3"},
            { title: "未通过复试", methods: "menbers", st:"4"},
            { title: "已通过复试", methods: "menbers", st:"5"},
          ],
        },
        {
          title: "产品运营部",
          id: "7",
          children: [
            { title: "全部人员", methods: "menbers", st:"6"},
            { title: "已经报名", methods: "menbers", st:"1"},
            { title: "未通过初试", methods: "menbers", st:"2"},
            { title: "已通过初试", methods: "menbers", st:"3"},
            { title: "未通过复试", methods: "menbers", st:"4"},
            { title: "已通过复试", methods: "menbers", st:"5"},
          ],
        },
        {
          title: "产品经理部",
          id: "8",
          children: [
            { title: "全部人员", methods: "menbers", st:"6"},
            { title: "已经报名", methods: "menbers", st:"1"},
            { title: "未通过初试", methods: "menbers", st:"2"},
            { title: "已通过初试", methods: "menbers", st:"3"},
            { title: "未通过复试", methods: "menbers", st:"4"},
            { title: "已通过复试", methods: "menbers", st:"5"},
          ],
        },
        {
          title: "多媒体事业部",
          id: "9",
          children: [
            { title: "全部人员", methods: "menbers", st:"6"},
            { title: "已经报名", methods: "menbers", st:"1"},
            { title: "未通过初试", methods: "menbers", st:"2"},
            { title: "已通过初试", methods: "menbers", st:"3"},
            { title: "未通过复试", methods: "menbers", st:"4"},
            { title: "已通过复试", methods: "menbers", st:"5"},
          ],
        },
      ],
    };
  },
  // (改) 实现一进main就能看见报名信息
  mounted () {
    console.log('挂载之前')
    this.getInfo('技术开发部', '6')
  },
  methods: {

    out() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    handleOpen(key, keyPath) {
      this.num = key - 1;
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    },
    display(methods, state, department) {
      //console.log(e.$vnode.data.attrs);
    //  var data = e.$vnode.data.attrs;
    //  (改) 实现按侧边栏回到报名管理的对应页面
      this.enrollHide = false;
      this.dataHide = true;
      this.interHide = true;
      this.sendHide = true;
      this.getState(state);
      this.$refs.child.sync(this.state);
      // this.getDepartment(department)
      this.getInfo(department, state);

      // this[methods]();
    },
    showList() {
      (this.enrollHide = false),
        (this.sendHide = true),
        (this.dataHide = true),
        (this.interHide = true);
    },
    database() {
      (this.dataHide = false),
        (this.enrollHide = true),
        (this.sendHide = true),
        (this.interHide = true);
      this.$refs.mychild.showData();
    },
    enroll() {
      (this.enrollHide = false),
        (this.sendHide = true),
        (this.dataHide = true),
        (this.interHide = true),
        (this.menberHide = true);
         this.$refs.child.sValue = "6";
      this.getInfo(this.$refs.child.department, "6");
    },
    interior() {
      (this.interHide = false),
        (this.enrollHide = true),
        (this.sendHide = true),
        (this.dataHide = true),
        (this.menberHide = true);
    },
    send() {
      (this.sendHide = false),
        (this.enrollHide = true),
        (this.dataHide = true),
        (this.interHide = true),
        (this.menberHide = true);
      // 改缺陷100283 3）
      this.$refs.send.SMSMode();
    },
    // export_file() {
    //   let $eleForm = $("<form method='get'></form>");
    //   $eleForm.attr(
    //     "action",
    //     "http://47.95.242.176:1120/api/excel/export?md=" + this.department + "&st=" + this.state
    //   );
    //   $(document.body).append($eleForm);
    //   //提交表单，实现下载
    //   $eleForm.submit();
    // },
    search_a() {
      setTimeout(() => {
        let that = this;
        let params = new URLSearchParams();
        //这里判断this.selected


        //不同参数传同一个值  this.username
        params.append(this.selected.name, that.username);

        //调用组件里的方法
        this.$refs.child.getmenbers(params);
      }, 10);
    },
    //  获取部门名
    getDepartment(department) {
      this.department = department;
      //console.log(1);
      // this.resetState()
    },
    //  获取状态
    getState(state) {
      this.state = state;
    },
    resetState(department) {
      this.getDepartment(department);
      this.getInfo(department, "6");
      this.$refs.child.reset();
    },
    //  获取信息展示
    getInfo(department, st) {
      //导出csv功能，根据参数下载文件
      this.state=st;
      this.department=department;
      this.downloadUrl =
        "https://zxback.tsky31.cn/api/export?md=" +
        this.department +
        "&st=" +
        this.state;
      this.$refs.child.sGetInfo(department, st);
    },
  },
};
</script>

<style scoped>
* {
  list-style: none;
  text-decoration: none;
}
.nav li {
  margin-right: 15px;
}
.nav a {
  color: black;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 160px;
  position: relative;
  min-width: 1224px;
}
.header {
  display: flex;
  height: 60px;
  line-height: 60px;
  justify-content: space-between;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
body > .el-container {
  margin-bottom: 40px;
}
.loginout {
  position: absolute;
  right: 30px;
  top: 10px;
}
.photoinner {
  width: 150px;
  height: 70px;
}
.photo {
  width: 200px;
  height: 93px;
  position: absolute;
  left: 16px;
  top: -16px;
}
.mainPage {
  background-color: #e9eef3;
  height: 800px;
}
.ac-title {
  float: left;
  margin-bottom: 45px;
}
.defaultPage {
  background-color: #e9eef3;
  height: 800px;
  display: none;
}
.isActive {
  display: none;
}
.nav {
  display: flex;
  width: 450px;
}
.nav li a {
  cursor: pointer;
}
.el-input {
  width: 45%;
}
.el-select{
    width: 100px;
}
</style>
