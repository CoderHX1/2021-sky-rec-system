<template>
  <div id="app">
     <!-- 搜索表单区域 -->
    <div>
       <div class="search">
          <!-- <el-input placeholder="请输入内容" v-model="searchkey" class="input-with-select">
            <el-select  slot="prepend" v-model="select" placeholder="请选择">
              <el-option label="ID" v-model="id" value="">ID</el-option>
              <el-option label="姓名" v-model="username" value="">姓名</el-option>
              <el-option label="QQ" v-model="qq" value="">QQ</el-option>
            </el-select>
            <el-button slot="append"  class="menber-button" type="primary"  plain @click="search_a()" icon="el-icon-search"></el-button>
          </el-input> -->
          <!-- <el-button type="primary" plain @click="out_a()" class="searchout">点击退出搜索</el-button> -->


        </div>
    </div>
     <!-- 主体内容 -->
    <div class="body">

        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            prop="id"
            label="ID"
            width="140"
          ></el-table-column>

          <el-table-column
            prop="username"
            label="姓名"
            width="100"
          ></el-table-column>

          <el-table-column
            prop="sex"
            label="性别"
            width="170"
          ></el-table-column>

          <el-table-column
            prop="number"
            label="电话"
            width="170"
          ></el-table-column>

          <el-table-column
            prop="qq"
            label="QQ"
            width="100"
          ></el-table-column>

          <el-table-column
            prop="xy"
            label="院系"
            width="100"
          ></el-table-column>

          <el-table-column
            prop="mj"
            label="班级"
            width="100"
          ></el-table-column>

          <el-table-column
            prop="zy1"
            label="意向1"
            width="100"
          ></el-table-column>
           <el-table-column
            prop="state1"
            label="状态"
            width="100"
            :formatter="stateFormatter1"
          ></el-table-column>
          <el-table-column
            prop="zy2"
            label="意向2"
            width="100"
          ></el-table-column>
           <el-table-column
            prop="state2"
            label="状态"
            width="100"
             :formatter="stateFormatter2"
          ></el-table-column>
          <el-table-column
            prop="zy3"
            label="意向3"
            width="100"
          ></el-table-column>
           <el-table-column
            prop="state3"
            label="状态"
            width="100"
             :formatter="stateFormatter3"
          ></el-table-column>

        </el-table>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "menber",
  props: ['md','state','username'],
  watch:{
    md:function(newValue,oldValue){
    //console.log('接收到main传递过来的md:'+this.newValue);
    }
    },
  components: {},
  data() {
    return {
      select:1,
      searchkey:'',
      id:'',
      qq:'',
      userInfo: {
        name: "",
        time: "",
        score: "",
        attribute: "",
        teacher: "",
        arrange: "",
        member: "",
        quality: "",
      },
      tableData: [],
      dialogVisible: false,
      editObj: {
        name: "",
        score: "",
        sort: "",
        attribute: "",
      },
      userIndex: 0,

      match: "",
      hide: true,
      result: [],
    };
  },
  methods: {
    out() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
   getmenbers(params){
      axios.post('https://zxback.tsky31.cn/api/select',params)
      .then(resp=>
      {
        //console.log('结果:',resp)
        this.tableData=resp.data.data
        }
      )
    },
    stateFormatter1(row, column) {
        console.log(column)
      if (row.state1 === 1) {
          return '已报名'
        } else if (row.state1 === 2) {
          return '未通过初试'
        }
         else if (row.state1 === 3) {
          return '已通过初试'
        }
         else if (row.state1 === 4) {
          return '未通过复试'
        }
         else if (row.state1 === 5) {
          return '已通过复试'
        }
    },
    stateFormatter2(row, column) {
       // console.log(column)
      if (row.state2 === 1) {
          return '已报名'
        } else if (row.state2 === 2) {
          return '未通过初试'
        }
         else if (row.state2 === 3) {
          return '已通过初试'
        }
         else if (row.state2 === 4) {
          return '未通过复试'
        }
         else if (row.state2 === 5) {
          return '已通过复试'
        }
    },
    stateFormatter3(row, column) {
        //console.log(column)
      if (row.state3 === 1) {
          return '已报名'
        } else if (row.state3 === 2) {
          return '未通过初试'
        }
         else if (row.state3 === 3) {
          return '已通过初试'
        }
         else if (row.state3 === 4) {
          return '未通过复试'
        }
         else if (row.state3 === 5) {
          return '已通过复试'
        }
    }
  },
};
</script>

<style scoped>
#app {
  width: 1200px;
  margin: 0 auto;
}
.header {
  display: inline-block;
  margin-right: 725px;
}
.add-btn {
  margin-top: 20px;
  width: 100%;
}
.body {
  margin-top: 20px;
}
.search-input {
  margin-top: 20px;
}
.search-btn {
  margin-top: 20px;
  width: 50%;
  margin-left: 85px;
}
.hidden {
  display: none;
}
.el-input {
  width: 18%;
  margin-bottom: 45px;
}
el-table-column {
  text-align: center;
  border: solid 1px black;
}

.el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

</style>
