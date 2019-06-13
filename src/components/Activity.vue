<template>
    <el-container class="hello">
      <el-header class="title">
          <h3>{{ msg }}</h3>
      </el-header>
      <el-container>
        <el-tabs type="border-card" v-model="name" stretch tab-position="top"class="act" @tab-click="handleClick">
          <el-tab-pane label="报名中" name="wait" @click="wait()">
            <el-card class="box-card" v-for="item in join" :key="item.actid">
              <div class="top">
                <h3> {{item.title}}</h3>
              </div>
              <p class="date">{{item.datetime}}</p>
              <div class="detail">
                {{item.detail}}
              </div>
              <div class="bottom">
                 <span class="people">已报名人数：<span style="color:red">{{item.number}}</span>人</span><el-button type="success" class="sign" size="mini"round disabled>已参加</el-button>
              </div>
            </el-card>
            <el-card class="box-card" v-for="item in unjoin" :key="item.actid">
              <div class="top">
                <h3> {{item.title}}</h3>
              </div>
              <p class="date">{{item.datetime}}</p>
              <div class="detail">
                {{item.detail}}
              </div>
              <div class="bottom">
                <span class="people">已报名人数：<span style="color:red">{{item.number}}</span>人</span><el-button @click="signup(item.actid)" type="primary"size="mini" class="sign" round :disabled="(item.state!='报名中')">参加</el-button>
              </div>
            </el-card>
            
          </el-tab-pane>
          <el-tab-pane label="进行中" name="process">
            <el-card class="box-card" v-for="item in join" :key="item.actid">
              <div class="top">
                <h3> {{item.title}}</h3>
              </div>
              <p class="date">{{item.datetime}}</p>
              <div class="detail">
                {{item.detail}}
              </div>
              <div class="bottom">
                 <span class="people">已报名人数：<span style="color:red">{{item.number}}</span>人</span><el-button type="success" class="sign" size="mini"round disabled>已参加</el-button>
              </div>
            </el-card>
            <el-card class="box-card" v-for="item in unjoin" :key="item.actid">
              <div class="top">
                <h3> {{item.title}}</h3>
              </div>
              <p class="date">{{item.datetime}}</p>
              <div class="detail">
                {{item.detail}}
              </div>
              <div class="bottom">
                <span class="people">已报名人数：<span style="color:red">{{item.number}}</span>人</span><el-button  @click="signup(item.actid)" type="danger"size="mini" class="sign" round :disabled="(item.state!='报名中')">未参加</el-button>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="已结束" name="finish">
            <el-card class="box-card" v-for="item in join" :key="item.actid">
              <div class="top">
                <h3> {{item.title}}</h3>
              </div>
              <p class="date">{{item.datetime}}</p>
              <div class="detail">
                {{item.detail}}
              </div>
              <div class="bottom">
                 <span class="people">已报名人数：<span style="color:red">{{item.number}}</span>人</span><el-button type="success" class="sign" size="mini"round disabled>已参加</el-button>
              </div>
            </el-card>
            <el-card class="box-card" v-for="item in unjoin" :key="item.actid">
              <div class="top">
                <h3> {{item.title}}</h3>
              </div>
              <p class="date">{{item.datetime}}</p>
              <div class="detail">
                {{item.detail}}
              </div>
              <div class="bottom">
                <span class="people">已报名人数：<span style="color:red">{{item.number}}</span>人</span><el-button  @click="signup(item.actid)" type="danger"size="mini" class="sign" round :disabled="(item.state!='报名中')">未参加</el-button>
              </div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'Activity',
  data () {
    return {
      msg: '学校为同学们提供了丰富的活动，学生可以报名参加！',
      name:"wait",
      activity:[],
      userActivity:[],
      userid:0
    }
  },
  computed:{
    join: function(){//用户参加过的活动
      console.log("调用了计算属性join");
      let act = [];
      if(this.userActivity.length ==0){
        return act;
      }else{
        this.activity.forEach(element => {
          let add = 0;
          this.userActivity.forEach(e =>{
            if(element.actid == e.actid){
              add =1;
            }
          });
          if(add==1){
            act.push(element);
          }
        });
        return act;
      }
    } ,
    unjoin: function(){//用户没有参加的活动
      console.log("调用了计算属性unjoin");
      let act = [];
      if(this.userActivity.length ==0){
        return this.activity;
      }else{
        this.activity.forEach(element => {
          let add = 0;
          this.userActivity.forEach(e =>{
            if(element.actid == e.actid){
              add =1;
            }
          });//遍历所有活动，与用户参加活动进行对比
          if(add==0){
            act.push(element);
          }//将用户没有参加的活动，加入数组
        });
        return act;
      }
    }  
  },
  methods:{
		wait(){
			console.log("点击报名中");
		},
		handleClick(tab,event){
      console.log("tab",tab.name);
      if(tab.name=="wait"){
        var s ='报名中';
        this.getActivity(s);
        console.log("tab",tab.name);
      };
      if(tab.name=="process"){
        var s ='进行中';
        this.getActivity(s);
        console.log("tab",tab.name);
      };
      if(tab.name=="finish"){
        var s ='已结束';
        this.getActivity(s);
        console.log("tab",tab.name);
      };
    },
    getActivity(s){
				var api = this.$store.state.baseUrl+'activity/getByState.action';
				this.$http.post(api, {
          state:s
					})
					.then(function(response){
						console.log(response.data);
						if(response.data==null){
							this.msg="获取活动失败！";
						}else{
              this.activity = response.data;
             // console.log(this.resource);
						}						
					})
					.catch(function (error) {
						console.log(error);
					});
    },
    getUserActivity(){
				var api = this.$store.state.baseUrl+'activity/getByUserid.action';
				this.$http.post(api, {
          actid:this.userid
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
    signup(id){
      if(this.userid==0){
        this.$message({
								message: '请先登陆！',
								type: 'error',
								showClose: true,
								duration:2000
								});
      }else{
        var api = this.$store.state.baseUrl+'sign/addSign.action';
				this.$http.post(api, {
          userid:this.$store.state.userInfo.userid,
          actid:id,
          username:this.$store.state.userInfo.name,
          state:"正常"
					})
					.then(function(response){
						console.log(response.data);
						if(response.data==null){
							this.msg="参加活动失败！";
						}else{
              this.$message({
								message: '参加活动成功！',
								type: 'success',
								showClose: true,
								duration:2000
								});
              this.getActivity("报名中");
              this.getUserActivity();
						}						
					})
					.catch(function (error) {
						console.log(error);
					});
      }
    }
  },
  mounted:function(){
    if(this.$store.state.userInfo.userid != undefined){
      this.userid = this.$store.state.userInfo.userid
    }
    this.getActivity("报名中");
    this.getUserActivity();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top{
  margin: 0px;
  padding: 0px;
  border-bottom:1px solid black;
}
.date{
  text-align: right;
}
.detail{
  margin:5px auto;
  text-align: left;
  text-indent: 20px;
  color:#027c45;
}

.people{
  float:left;
  color:blue;
}
.sign{
  float:right;
}
.box-card {
  width: 350px;
  height:200px;
  float:left;
  margin:10px;
  padding: 0px;
  background-color: rgb(255, 255, 182);
  /* margin:auto; */
}
.bottom{
  padding-bottom: 0px;
}
/* .el-card_body{
  margin:0px;
  padding:1px;
} */
.hello{
  margin-top: 20px;
  width:800px;
  margin:auto;
}
.title{
	background-color:#afd2f5;
	color: aliceblue;
	padding-top: 20px;
}
.act{
  min-height: 500px;
  width:800px;
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
