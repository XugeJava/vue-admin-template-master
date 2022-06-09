<template>
  <div class="app-container">
    <!--表单查询-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
    </el-form>
    <!-- 工具条 -->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
    </div>

    <!-- banner列表 -->
    <el-table
      :data="list" stripe style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column type="index" width="50"/>
      <el-table-column prop="hosname" label="医院名称"/>
      <el-table-column prop="hoscode" label="医院编号"/>
      <el-table-column prop="apiUrl" label="api基础路径" width="200"/>
      <el-table-column prop="contactsName" label="联系人姓名"/>
      <el-table-column prop="contactsPhone" label="联系人手机"/>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope"> {{ scope.row.status === 1 ? '可用' : '不可用' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini"
                     icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
          <el-button v-if="scope.row.status==1" type="primary" size="mini"
                     icon="el-icon-delete" @click="lockHostSet(scope.row.id,0)">锁定</el-button>
          <el-button v-if="scope.row.status==0" type="danger" size="mini"
                     icon="el-icon-delete" @click="lockHostSet(scope.row.id,1)">取消锁定</el-button>
          <router-link :to="'/hospSet/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>
<script>
//引入接口的js文件
import hospset from '@/api/hospset'

export default {
  data() {
    return {
      current: 1,//当前页
      limit: 5,//每页显示默认数
      searchObj: {},//条件封装对象
      list: [],
      total: 0,//总记录数
      multipleSelection: [], // 批量选择中选择的记录列表

    }
  },
  //在数据渲染之前执行
  created() {

    //刷新页面
    this.getList()
  },
  //定义请求方法
  methods: {

    //锁定和取消锁定
    lockHostSet(id,status) {
      hospset.lockHospSet(id,status).then(response=>{
        //刷新
        this.getList()
      })
    },
    //复选框变化时触发事件
    handleSelectionChange(selection){
      console.log(selection)
      this.multipleSelection = selection
    },

    //批量删除
    removeRows(){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var idList=[];
        //遍历数组吗，取出每一个id值放入到idList中
        for(var i=0;i<this.multipleSelection.length;i++){
          var obj=this.multipleSelection[i];
          var id=obj.id;
          idList.push(id)
        }
        hospset.deleteBatch(idList)
          .then(response => {
            this.$message({
              type: 'success',
              message: '批量删除成功!'
            });
            //刷新页面
            this.getList();
          });

      })

    },
    //医院设置列表方法
    getList(page = 1) {
      this.current = page
      hospset.hospSetList(this.current, this.limit, this.searchObj)
        .then(response => {//请求成功
          console.log(response)
          this.list = response.data.records;
          this.total = response.data.total
        })
        .catch(error => {//请求失败

        })
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hospset.deleteHospSet(id)
          .then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //刷新页面
            this.getList();
          });

      })



    }
  }
}
</script>
