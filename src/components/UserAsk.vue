<template>
	<div id = "uRecord">
    <el-card class="rili">
      <div class="">
        <el-calendar v-model="value" >
        </el-calendar>
      </div>
  </el-card>

    <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
      <el-tab-pane label="等待处理" name="first">
        <el-table
          :data="wait"
          stripe
          border
          class="biao"
          style="width: 80%">
          <el-table-column type="expand" width="200"label="查看申请理由">
          <template slot-scope="props">
            <el-form label-position="left" inline class="">
              <el-form-item label="申请理由：">
                <p>{{ props.row.reason }}</p>
              </el-form-item>

            </el-form>
            <p v-if="props.row.filepath!='' && props.row.filepath!=null"><a :href="(downloadurl+props.row.filepath)" class="download">点击下载附件</a></p>
          </template>
        </el-table-column>
          <el-table-column
            prop="askid"
            label="申请号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="username"
            label="申请人"
            width="120">
          </el-table-column>
          <el-table-column
            prop="labid"
            label="申请实验室"
            width="120">
          </el-table-column>
          <el-table-column
            prop="datetime"
            label="申请时间"
            width="227">
          </el-table-column>
          <!-- <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="app(scope.row)" type="success" size="small">再次申请</el-button>
            </template>
          </el-table-column> -->
        </el-table>
       
      </el-tab-pane>
      <el-tab-pane label="批准入住" name="second">
        <el-table
          :data="pass"
          stripe
          border
          class="biao"
          style="width: 80%">
        <el-table-column type="expand" width="200" label="查看申请理由">
          <template slot-scope="props">
            <el-form label-position="left" inline class="">
              <el-form-item label="申请理由：">
                <p>{{ props.row.reason }}</p>
              </el-form-item>
              <!-- <el-form-item label="附件：" v-if="props.row.filepath!=''&&props.row.filepath!=null">
                <p><a :href="downloadurl" class="download">点击下载</a></p>
              </el-form-item> -->
            </el-form>
            <p v-if="props.row.filepath!='' && props.row.filepath!=null"><a :href="(downloadurl+props.row.filepath)" class="download">点击下载附件</a></p>
          </template>
        </el-table-column>
          <el-table-column
            prop="askid"
            label="申请号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="username"
            label="申请人"
            width="120">
          </el-table-column>
          <el-table-column
            prop="labid"
            label="申请实验室"
            width="120">
          </el-table-column>
          <el-table-column
            prop="datetime"
            label="申请时间"
            width="227">
          </el-table-column>
          <!-- <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="app(scope.row)" type="success" size="small">再次申请</el-button>
            </template>
          </el-table-column> -->
        </el-table>
       
      </el-tab-pane>
      <el-tab-pane label="拒绝入住" name="third">
        <el-table
          :data="fail"
          stripe
          border
          class="biao"
          style="width: 80%">
          <el-table-column type="expand" width="200" label="查看申请理由">
          <template slot-scope="props">
            <el-form label-position="left" inline class="">
              <el-form-item label="申请理由：">
                <p>{{ props.row.reason }}</p>
              </el-form-item>
            </el-form>
            <p v-if="props.row.filepath!='' && props.row.filepath!=null"><a :href="(downloadurl+props.row.filepath)" class="download">点击下载附件</a></p>
          </template>
        </el-table-column>
          <el-table-column
            prop="askid"
            label="申请号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="username"
            label="申请人"
            width="120">
          </el-table-column>
          <el-table-column
            prop="labid"
            label="申请实验室"
            width="120">
          </el-table-column>
          <el-table-column
            prop="datetime"
            label="申请时间"
            width="227">
          </el-table-column>
          <!-- <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="app(scope.row)" type="success" size="small">再次申请</el-button>
            </template>
          </el-table-column> -->
        </el-table>
       
      </el-tab-pane>
  
    </el-tabs>

	</div>
	
</template>
<script>
export default {
  name: 'UserAsk',
  data () {
    return {
      msg:"",
      activeName:"first",
      asklabs:[],
      downloadurl: this.$store.state.baseUrl+"file/download.action?filename=",
      value: new Date()
    }
  },
  computed:{
    wait: function(){
      let ask = [];
      if(this.asklabs.length ==0){
        return ask;
      }else{
        this.asklabs.forEach(element => {
          if(element.state=="等待处理"){
            ask.push(element);
          }
        });
        return ask;
      }
    },
    pass: function(){
      let ask = [];
      if(this.asklabs.length ==0){
        return ask;
      }else{
        this.asklabs.forEach(element => {
          if(element.state=="批准入住"){
            ask.push(element);
          }
        });
        return ask;
      }
    },
    fail: function(){
      let ask = [];
      if(this.asklabs.length ==0){
        return ask;
      }else{
        this.asklabs.forEach(element => {
          if(element.state=="拒绝入住"){
            ask.push(element);
          }
        });
        return ask;
      }
    },
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    getUserAsklab(){
				var api = this.$store.state.baseUrl+'asklab/getByuserid.action';
				this.$http.post(api, {
          userid:this.$store.state.userInfo.userid
					})
					.then(function(response){
						console.log(response.data);
						if(response.data==null){
							this.msg="获取用户入住申请失败！";
						}else{
              this.asklabs = response.data;
             // console.log(this.resource);
						}						
					})
					.catch(function (error) {
						console.log(error);
					});
    },
  },
   mounted:function(){
    this.getUserAsklab();
  }
}

</script>
<style scoped>
.askitem{
  margin:auto;
}
.rili{
  margin:auto;
  margin-top:0px;
  display: block;
  width: 500px;
  height: 350px;
}
.biao{
   margin:auto;
}
#uRecord /deep/ .el-calendar-table tbody .el-calendar-table__row .el-calendar-day{
  height: 30px;
} 
</style>
