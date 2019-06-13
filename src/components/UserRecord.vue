<template>
	<div id = "uRecord">
    <el-card class="rili">
      <!-- <div slot="header" class="clearfix">
        <h3>日历</h3>
      </div> -->
      <div class="">
        <el-calendar v-model="value" >
        </el-calendar>
      </div>
  </el-card>
    <!-- <div class="rili">
      <el-calendar v-model="value" >
      </el-calendar>
    </div> -->
    <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
      <el-tab-pane label="申请中" name="first">
        <el-table
          :data="wait"
          stripe
          border
          style="width: 100%">
          <el-table-column type="expand" label="查看申请项" width="100">
            <template slot-scope="props" class="askitem">
              <div class="askitem">
              <el-table 
                stripe
                border
                :data="JSON.parse(props.row.askitem)"
                >
                <!-- <el-table-column type="expand" label="点击查看">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="">
                      <el-form-item label="资源主要用途：">
                        <span>{{ props.row.func }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column> -->
                <!-- <el-table-column
                  type="index"
                  width="50">
                </el-table-column> -->
                <el-table-column
                  prop="resourceid"
                  label="资源ID"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="资源名"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="资源价格"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="资源类型"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="number"
                  label="申请数量"
                  width="100">
                </el-table-column>
              </el-table>
               </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="appid"
            label="申请单号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="username"
            label="申请人"
            width="120">
          </el-table-column>
          <el-table-column
            prop="reason"
            label="申请理由"
            width="120">
          </el-table-column>
          <el-table-column
            prop="money"
            label="总金额"
            width="120">
          </el-table-column>
          <el-table-column
            prop="datetime"
            label="申请时间"
            width="200">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="app(scope.row)" type="success" size="small">再次申请</el-button>
            </template>
          </el-table-column>
        </el-table>
       
      </el-tab-pane>
      <el-tab-pane label="已批准" name="second">
        <el-table
          :data="pass"
          stripe
          border
          style="width: 100%">
          <el-table-column type="expand" label="查看申请项" width="100">
            <template slot-scope="props" class="askitem">
              <div class="askitem">
              <el-table 
                stripe
                border
                :data="JSON.parse(props.row.askitem)"
                >
                <!-- <el-table-column type="expand" label="点击查看">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="">
                      <el-form-item label="资源主要用途：">
                        <span>{{ props.row.func }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column> -->
                <!-- <el-table-column
                  type="index"
                  width="50">
                </el-table-column> -->
                <el-table-column
                  prop="resourceid"
                  label="资源ID"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="资源名"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="资源价格"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="资源类型"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="number"
                  label="申请数量"
                  width="100">
                </el-table-column>
              </el-table>
               </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="appid"
            label="申请单号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="username"
            label="申请人"
            width="120">
          </el-table-column>
          <el-table-column
            prop="reason"
            label="申请理由"
            width="120">
          </el-table-column>
          <el-table-column
            prop="money"
            label="总金额"
            width="120">
          </el-table-column>
          <el-table-column
            prop="datetime"
            label="申请时间"
            width="200">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="app(scope.row)" type="success" size="small">再次申请</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已领取" name="third">
        <el-table
          :data="getapp"
          stripe
          border
          style="width: 100%">
          <el-table-column type="expand" label="查看申请项" width="100">
            <template slot-scope="props" class="askitem">
              <div class="askitem">
              <el-table 
                stripe
                border
                :data="JSON.parse(props.row.askitem)"
                >
                <!-- <el-table-column type="expand" label="点击查看">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="">
                      <el-form-item label="资源主要用途：">
                        <span>{{ props.row.func }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column> -->
                <!-- <el-table-column
                  type="index"
                  width="50">
                </el-table-column> -->
                <el-table-column
                  prop="resourceid"
                  label="资源ID"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="资源名"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="资源价格"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="资源类型"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="number"
                  label="申请数量"
                  width="100">
                </el-table-column>
              </el-table>
               </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="appid"
            label="申请单号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="username"
            label="申请人"
            width="120">
          </el-table-column>
          <el-table-column
            prop="reason"
            label="申请理由"
            width="120">
          </el-table-column>
          <el-table-column
            prop="money"
            label="总金额"
            width="120">
          </el-table-column>
          <el-table-column
            prop="datetime"
            label="申请时间"
            width="200">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="app(scope.row)" type="success" size="small">再次申请</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="未通过" name="fourth">
        <el-table
          :data="fail"
          stripe
          border
          style="width: 100%">
          <el-table-column type="expand" label="查看申请项" width="100">
            <template slot-scope="props" class="askitem">
              <div class="askitem">
              <el-table 
                stripe
                border
                :data="JSON.parse(props.row.askitem)"
                >
                <!-- <el-table-column type="expand" label="点击查看">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="">
                      <el-form-item label="资源主要用途：">
                        <span>{{ props.row.func }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column> -->
                <!-- <el-table-column
                  type="index"
                  width="50">
                </el-table-column> -->
                <el-table-column
                  prop="resourceid"
                  label="资源ID"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="资源名"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="资源价格"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="资源类型"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="number"
                  label="申请数量"
                  width="100">
                </el-table-column>
              </el-table>
               </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="appid"
            label="申请单号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="username"
            label="申请人"
            width="120">
          </el-table-column>
          <el-table-column
            prop="reason"
            label="申请理由"
            width="120">
          </el-table-column>
          <el-table-column
            prop="money"
            label="总金额"
            width="120">
          </el-table-column>
          <el-table-column
            prop="datetime"
            label="申请时间"
            width="200">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="app(scope.row)" type="success" size="small">再次申请</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

	</div>
	
</template>
<script>
export default {
  name: 'UserRecord',
  data () {
    return {
      msg:"",
      activeName:"first",
      applications:[],
      value: new Date()
    }
  },
  computed:{
    wait: function(){
      let app = [];
      if(this.applications.length ==0){
        return app;
      }else{
        this.applications.forEach(element => {
          if(element.state=="等待处理"){
            app.push(element);
          }
        });
        return app;
      }
    },
    pass: function(){
      let app = [];
      if(this.applications.length ==0){
        return app;
      }else{
        this.applications.forEach(element => {
          if(element.state=="批准申请"){
            app.push(element);
          }
        });
        return app;
      }
    },
    getapp: function(){
      let app = [];
      if(this.applications.length ==0){
        return app;
      }else{
        this.applications.forEach(element => {
          if(element.state=="资源已取"){
            app.push(element);
          }
        });
        return app;
      }
    },
    fail: function(){
      let app = [];
      if(this.applications.length ==0){
        return app;
      }else{
        this.applications.forEach(element => {
          if(element.state=="拒绝申请"){
            app.push(element);
          }
        });
        return app;
      }
    },
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    getUserActivity(){
				var api = this.$store.state.baseUrl+'application/getByuserid.action';
				this.$http.post(api, {
          userid:this.$store.state.userInfo.userid
					})
					.then(function(response){
						console.log(response.data);
						if(response.data==null){
							this.msg="获取用户申请单失败！";
						}else{
              this.applications = response.data;
             // console.log(this.resource);
						}						
					})
					.catch(function (error) {
						console.log(error);
					});
    },
    app(row){
      console.log("传入申请单："+row);
      var cart =JSON.parse(row.askitem);
      this.$store.commit('setShopcart',cart);
      this.$store.commit('shopcart_num',cart.length);
      this.$router.push("/user/app");
      this.$store.commit("setUserindex","5");
    }
  },
   mounted:function(){
    this.getUserActivity();
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
#uRecord /deep/ .el-calendar-table tbody .el-calendar-table__row .el-calendar-day{
  height: 30px;
} 
</style>
