<template>
	<div id="uAct">

    <el-card class="rili">
          <el-calendar v-model="value" >
          </el-calendar>
    </el-card>
      <el-steps :active="index" simple process-status="wait" finish-status="finish"> 
        <el-step title="报名中" icon="el-icon-edit" @click.native="sign()"></el-step>
        <el-step title="进行中" icon="el-icon-loading" @click.native="going()"></el-step>
        <el-step title="已结束" icon="el-icon-circle-check" @click.native="finish()"></el-step>
      </el-steps>
      <div class="actrecord">
       <el-table 
        stripe
        style="width: 100%"
        :data="newActivity"
        >
        <el-table-column type="expand" label="查看细节">
          <template slot-scope="props">
            <el-form label-position="left" inline class="">
              <el-form-item label="活动细节：">
                <span>{{ props.row.detail }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="actid"
          label="活动号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="title"
          label="活动标题"
          width="100">
        </el-table-column>
        <el-table-column
          prop="state"
          label="活动状态"
          width="100">
        </el-table-column>
        <el-table-column
          prop="number"
          label="参加人数"
          width="100">
        </el-table-column>
        <el-table-column
          prop="datetime"
          label="报名日期"
          >
        </el-table-column>
        <!-- <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="del(scope.row.actid)" type="danger" size="small">删除记录</el-button>
            </template>
        </el-table-column> -->
      </el-table>
      </div>
	</div>
	
</template>
<script>
export default {
  name: 'UserAct',
  data () {
    return {
      index:1,
      userActivity:[],
      activity:[],
      msg:"",
      signinfo:[],
      type:"报名中",
      datevalue:new Date()
    }
  },
  computed:{
    newActivity: function(){
      console.log("调用了计算属性newActivity");
      let act = this.userActivity;
      let sg = this.signinfo;
      if(act.length>0 && sg.length>0){
          for(let i=0;i<act.length;i++){
          act[i].datetime = sg[i].datetime;
        }
      }
      // return act;
      let a =[];
      act.forEach(element => {
          if(element.state==this.type){
            a.push(element);
          }
        });
      return a;
    },
    // acts:function(){
    //   let as = this.newActivity;
    //   let a =[];
    //   as.forEach(e=>{
    //     if(e.state==this.type){
    //         a.push(e);
    //       }
    //   });
    //   return a;
    // }   
  },
  methods:{
    sign(){
      // console.log("点击报名中");
      // this.index=1;
      // this.activity=[];
      // let act=[];
      // var newact = this.userActivity;
      // for(let i=0;i<newact.length;i++){
      //   newact[i].datetime = this.signinfo[i].datetime;
      // }
      // if(newact.length>0){
      //   newact.forEach(element => {
      //     if(element.state=="报名中"){
      //       act.push(element);
      //     }
      //   });
      //   this.activity = act;
      // }
      // console.log("act:"+act);
      console.log("点击报名中");
      this.index=1;
      this.type="报名中";
      // var act = [];
      // console.log("计算属性:"+this.newActivity);
      // this.newActivity.forEach(element => {
      //   if(element.state=="报名中"){
      //     act.push(element);
      //   }
      // });
      // this.activity = act;
      // if(this.newActivity.length>0){
      //   console.log("计算属性:"+this.newActivity);
      //   this.newActivity.forEach(element => {
      //     if(element.state=="报名中"){
      //       act.push(element);
      //     }
      //   });
      //   this.activity = act;
      // }
    },
    going(){
      console.log("点击进行中");
      this.index=2;
      this.type="进行中";
      // this.activity=[];
      // var act = [];
      // if(this.newActivity.length>0){
      //   this.newActivity.forEach(element => {
      //     if(element.state=="进行中"){
      //       act.push(element);
      //     }
      //   });
      //   this.activity = act;
      // }
    },
    finish(){
      console.log("点击已结束");
      this.index=3;
      this.type = "已结束";
      // this.activity=[];
      // var act = [];
      // if(this.newActivity.length>0){
      //   this.newActivity.forEach(element => {
      //     if(element.state=="已结束"){
      //       act.push(element);
      //     }
      //   });
      //   this.activity = act;
      // }
    },
    getUserActivity(){
				var api = this.$store.state.baseUrl+'activity/getByUserid.action';
				this.$http.post(api, {
          actid:this.$store.state.userInfo.userid
					})
					.then(function(response){
						console.log(response.data);
						if(response.data==null){
							this.msg="获取用户参加的活动失败！";
						}else{
              this.userActivity = response.data;
             // console.log(this.resource);
						}						
					})
					.catch(function (error) {
						console.log(error);
          });
    },
    getSigninfo(){
				var api = this.$store.state.baseUrl+'sign/getByUid.action';
				this.$http.post(api, {
          userid:this.$store.state.userInfo.userid
					})
					.then(function(response){
						console.log(response.data);
						if(response.data==null){
							this.msg="获取用户参加的活动信息失败！";
						}else{
              this.signinfo = response.data;
             // console.log(this.resource);
						}						
					})
					.catch(function (error) {
						console.log(error);
          });
    },
    del(){
				var api = this.$store.state.baseUrl+'sign/getByUid.action';
				this.$http.post(api, {
          userid:this.$store.state.userInfo.userid
					})
					.then(function(response){
						console.log(response.data);
						if(response.data==null){
							this.msg="获取用户参加的活动信息失败！";
						}else{
              this.signinfo = response.data;
             // console.log(this.resource);
						}						
					})
					.catch(function (error) {
						console.log(error);
          });
    }
  },
  mounted:function(){
    this.getUserActivity();
    this.getSigninfo();  
  }
}

</script>
<style  scoped>
.el-step:hover {
  color: #67c23a;
  border-color: #67c23a;
}
.actrecord{
  width:800px;
  margin:auto;
}
.rili{
  margin:auto;
  margin-top:0px;
  display: block;
  width: 500px;
  height: 350px;
}
#uAct /deep/ .el-calendar-table tbody .el-calendar-table__row .el-calendar-day{
  height: 30px;
} 
</style>
