<template>
  <div id="app">
    <!-- 主体内容 -->
    <div class="body">
      <template>
        <el-table
          :data="tableData"
          style="width: 100%"
          :span-method="arraySpanMethod"
        >
          <el-table-column
            prop="Name"
            label="部门"
            width="150"
          ></el-table-column>

          <el-table-column
            prop="total"
            label="总计"
            width="80"
          ></el-table-column>

          <el-table-column
            prop="1"
            label="未面试"
            width="200"
          ></el-table-column>

          <el-table-column
            prop="2"
            label="未通过初试"
            width="200"
          ></el-table-column>

          <el-table-column
            prop="3"
            label="已通过初试"
            width="200"
          ></el-table-column>

          <el-table-column
            prop="4"
            label="未通过复试"
            width="200"
          ></el-table-column>

          <el-table-column
            prop="5"
            label="已通过复试"
            width="150"
          ></el-table-column>
        </el-table>
        <div class="total">
          <span> 去重总数 </span>
          <span class="total-num">{{ this.totalData }}</span>
        </div>
        <div class="total">
          <span> 不去重总数 </span>
          <span class="total-num">{{ this.tableData[9].all_count }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "database",
  props: {},
  components: {},
  data() {
    return {
      tableData: [
        {
          Name: "技术开发部",

          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          total: 0,
        },
        {
          Name: "企划公关部",

          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          total: 0,
        },
        {
          Name: "设计部",

          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          total: 0,
        },
        {
          Name: "新媒体运营部",

          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          total: 0,
        },
        {
          Name: "新闻通讯社",

          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          total: 0,
        },
        {
          Name: "行政人事部",

          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          total: 0,
        },
        {
          Name: "产品运营部",

          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          total: 0,
        },
        {
          Name: "产品经理组",

          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          total: 0,
        },
        {
          Name: "多媒体事业部",

          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          total: 0,
        },
        {
          all_count: 0,
        },
      ],
      totalData: 0,
    };
  },
  created() {
    this.showData();
  },
  methods: {
    out() {
      this.$router.push("/login");
    },
    showData() {
      var that = this;
      axios.post("https://zxback.tsky31.cn/api/count").then(
        (res) => {
          // console.log(res);
          that.tableData = res.data.data;
        },
        (err) => {
          console.log(err);
        }
      );
      axios.post("https://zxback.tsky31.cn/api/total").then(
        (res) => {
          // console.log(res);
          that.totalData = res.data.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
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
  width: 40%;
  margin-bottom: 45px;
}
el-table-column {
  text-align: center;
  border: solid 1px black;
}
.total {
  width: 1200px;
  background-color: #f7f9fb;
  color: black;
}
.total-num {
  display: inline-block;
  margin: 0 auto;
  width: 15px;
}
</style>
