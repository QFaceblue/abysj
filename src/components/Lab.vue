<template>
  <div class="hello" >
    <carousel2></carousel2>
    <el-card class="card">
       <h3>{{msg}}</h3>
    </el-card>
    <!-- <div class="title"> <h3>{{msg}}</h3></div>  -->
    <el-card class ="labclass">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="(item,index) in labs" :name="index" :key="item.labid">
          <template slot="title">
            <div class="labid"><h3><i class="el-icon-info"></i>实验室号：{{item.labid}}</h3></div>
          </template>
          <div class="detail">
            <div class="t_left">
              <h4><i class="el-icon-location-outline"></i>实验室地址：{{item.address}}</h4>
            </div>
            <div class="t_left">
              <h4><i class="el-icon-edit"></i>实验室详情：</h4>
              <div class="labinfo">{{item.info}}</div>
            </div>
            <div class="t_left">
              <h4 class="max">实验室可容人数：{{item.maxnum}}</h4>
            </div>
            <div class="t_left">
              <h4 class="num">实验室入住人数：{{item.num}}</h4>
            </div>
            <div class="app">
              <el-button v-if= "(item.labid === labid)" type="success" size="small" round disabled>已入住</el-button>
              <el-button v-if= "(item.labid === labid)" type="danger" size="small" @click="exitlab()"round >退出实验室</el-button>
              <el-button v-else type="primary" size="small" round :disabled="(labid!=0||asklabid!=0)||(item.maxnum===item.num)" @click="applab(item.labid,index)">申请入住</el-button>
              <el-button v-if = "(item.labid === asklabid && item.labid != labid)" type="warning" size="small" round disabled>当前已申请</el-button>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <!-- <el-dialog title="入住申请" :visible.sync="dialogFormVisible"  width="30%"center>
    <el-form :model="form">
      <el-form-item label="用户号" label-width="100px">
        <el-input v-model="form.userid" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="实验室号" label-width="100px">
        <el-input v-model="form.labid" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户姓名" label-width="100px">
        <el-input v-model="form.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="申请原因" label-width="100px">
        <el-input v-model="form.reason" type="textarea" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="subApp()">申请</el-button>
    </div>
  </el-dialog> -->
  </div>
</template>

<script>
import Carousel2 from './Carousel2.vue'
export default {
  name: 'Lab',
  data () {
    return {
      msg: '学校为支持学生进行创新创业，特在学校七教建立实验室。实验室提供各种丰富资源给学生利用。同学可以申请入住实验室。',
      activeName:0,
      labs:[],
      labid:0,//记录用户当前实验室号
      asklabid:0,//记录用户申请实验室号
      userid:0,
      // dialogFormVisible:false,
      // form:{
      //   userid:0,
      //   labid:0,
      //   username:"",
      //   reason:""
      // }
    }
  },
  components:{
    Carousel2,
  },
  methods:{
    	getLabs(){
				var api = this.$store.state.baseUrl+'lab/getAll.action';
				this.$http.post(api, {
					})
					.then((response) =>{
						console.log(response.data);
						if(response.data==null){
							this.msg="获取信息失败！";
						}else{
              this.labs = response.data;
             // console.log(this.resource);
						}						
					})
					.catch(function (error) {
						console.log(error);
					});
      },
      exitlab() {
        this.$confirm('退出后，入住实验室需重新申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.exit();
          // this.$message({
          //   type: 'success',
          //   message: '退出成功!'
          // });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
      },
      applab(labid,index){
        if(this.userid==0){
        this.$message({
								message: '请先登陆！',
								type: 'error',
								showClose: true,
								duration:2000
								});
      }else{
        // this.form.userid = this.userid;
        // this.form.username = this.$store.state.userInfo.name;
        // this.form.labid = labid;
        // this.dialogFormVisible = true;
        this.$store.commit('setAsklabid',labid);
        this.$store.commit('setActiveName',index);
        this.$router.push("/asklab");
      }
      },
      exit() {
        var api = this.$store.state.baseUrl+'exitlab.action';
        this.$http.post(api, {
            userid:this.$store.state.userInfo.userid,
            labid:this.$store.state.userInfo.labid,
            type:this.$store.state.userInfo.type
          })
          .then(function (response) {
            console.log(response.data);
            if(response.data<=0){
              this.$message({
                message: '退出实验室失败！',
                type: 'error',
                showClose: true,
                duration:2000
                });
            }else{
              var u = this.$store.state.userInfo;
              u.labid =0;
              this.labid=0;
              this.$store.commit('getUserInfo',u);
              this.getLabs();//刷新实验室数据
              this.$message({
              message: '退出实验室成功！',
              type: 'success',
              showClose: true,
              duration:2000
    
              });
            }						
          })
          .catch(function (error) {
            console.log(error);
          });
        },
      subApp() {
      var api = this.$store.state.baseUrl+'asklab/addAsklab.action';
      this.$http.post(api, {
          userid:this.form.userid,
          labid:this.form.labid,
          username:this.form.username,
          reason:this.form.reason,
          state:"等待处理"
        })
        .then(function (response) {
          console.log(response.data);
          if(response.data<=0){
            this.$message({
              message: '提交申请单失败！',
              type: 'error',
              showClose: true,
              duration:2000
              });
          }else{
            this.asklabid = this.form.labid;
            this.$store.commit('setAsklabid',this.asklabid);
            this.$message({
            message: '提交申请成功！',
            type: 'success',
            showClose: true,
            duration:2000
            });false
            this.dialogFormVisible = false;
          }						
        })
        .catch(function (error) {
          console.log(error);
        });
      } 
  },
  mounted:function(){
    if(this.$store.state.userInfo.userid != undefined){
      this.userid = this.$store.state.userInfo.userid
    }
    this.getLabs();
    if(this.$store.state.isLogin===true){
      console.log("用户登陆")
      this.labid = this.$store.state.userInfo.labid;
    }
    this.asklabid = this.$store.state.asklabid;
    this.activeName = this.$store.state.activeName;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{
  margin:auto 5px;
  background-color: aliceblue;
}
.labclass{
  margin:auto 5px;
  margin-top:10px;
  
}
.labid{
  margin:auto;
  /* color:brown; */
}
.detail{
  padding-left:80px;
  margin:auto;
  width:500px;
}
.t_left{
  text-align: left;
}

.labinfo{
  text-align: center;
}
.hello{
  margin:auto;
  margin-top: 0px;
  width:1000px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
