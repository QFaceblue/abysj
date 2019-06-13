<template>
  <!-- element-ui -->
 <el-container >
      <el-header height = '100px' >
            <div class="header">
                <div class="nav-left">
                    <img src="../assets/img/title.jpg" alt="">
                </div>
                <div class="nav-center">
                  	<ul>
                  		<li v-for = '(list,index) in headerList' :key = 'list.id'>
                  			<router-link :to = '{name:list.name}'>
                  			 {{list.title}}
                  			</router-link>
                  		</li>
                  	</ul>
                </div>
                <el-dropdown  class="nav-right " v-if = 'this.$store.state.isLogin'>
                  <el-tag class="el-dropdown-link" @click="toUser()">
                   <i class="el-icon-setting"></i>{{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                   </el-tag>
                  <!-- <span class="el-dropdown-link" @click="toUser()">
                    {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span> -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-edit-outline" > <span @click="toInfo">我的信息</span></el-dropdown-item>
                    <el-dropdown-item icon="el-icon-tickets" > <span @click="toAct">活动记录</span></el-dropdown-item>
                    <el-dropdown-item icon="el-icon-news" > <span @click="toAsk">实验室记录</span></el-dropdown-item>
                    <el-dropdown-item icon="el-icon-document" > <span @click="toRecord">申请记录</span></el-dropdown-item>
                    <el-dropdown-item icon="el-icon-circle-plus">
                      <el-badge :value="shopcart_num" @click="toApp()" class="item">
                        <span @click="toApp">申请资源</span>
                      </el-badge>
                      <!-- <span @click="toApp">申请资源</span><span class="count">({{shopcart_num}})</span> -->
                    </el-dropdown-item>
                    <el-dropdown-item icon="el-icon-error"><span @click="logout" >退出</span></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <!-- <el-dropdown> -->
               <!-- <div class="nav-right " v-if = 'this.$store.state.isLogin' @mouseenter = 'enterHandler' @mouseleave ='leaveHandler'>
                  <span class = 'el-dropdown-link'>个人中心</span> 
                 	<span class=" user">{{userInfo.name}}</span>
                 	<img :src="userInfo.avatar" alt="">
                  <ul class="" v-show = 'isShow'>
                      <li>
                        我的信息
                        <i>></i>
                      </li>
                      <li>
                        我的订单
                        <i>></i>
                      </li>
                      <li>
                        我的优惠券
                        <i>></i>
                      </li>
                      <li>
                        我的消息<span class="msg">(40)</span>
                        <i>></i>
                      </li>
                      <li @click ='shopCartInfo'>
                       申请单<span class="count">({{shopcart_num}})</span>
                        <i>></i>
                      </li>
                      <li @click="logout">
                       退出
                        <i>></i>
                      </li>
                  </ul>
                </div>  -->
              <!-- </el-dropdown> -->
                <!-- <div class="nav-right" v-else>
                  <span @click="login('login')">登录</span>
                  &nbsp;| &nbsp;
                  <span @click="login('register')">注册</span>
                  &nbsp;| &nbsp;
                  <span @click="toManager()">管理员入口</span>

                </div> -->
                <div class="nav-right" v-else>
                  <el-button-group>
                    <el-button  @click="login('login')">登陆</el-button>
                    <el-button  @click="login('register')">注册</el-button>
                    <el-button  @click="toManager()">管理员</el-button>  
                  </el-button-group>          
                </div>
            </div>
      </el-header>
    </el-container>


</template>

<script>
export default {
  name: 'LuffyHeader',
  data(){
    return {
        headerList:[
          {id:'1',name:'Home',title:'首页'},
          {id:'2',name:'Resource',title:'基地资源'},
          {id:'3',name:'Lab',title:'基地实验室'},
          {id:'4',name:'Activity',title:'创新活动'}
        ],
        isShow:false      
    }
  },
  methods:{
    shopCartInfo(){
        this.$router.push({
            name:'purchase.shop'
        })
    },
    enterHandler(){
      this.isShow = true;
    },
    leaveHandler(){
      this.isShow = false;
    },
    login(type){
      this.$store.commit("setLoginway",type);
      this.$router.push("/login");
      this.isShow = false;
      // this.isLogin = true;
      // //this.$store.commit('getUserInfo',{name:'faceblue'});
      // this.$store.dispatch('getUserInfo',{name:'faceblue'});
    },
    toManager(){
      window.location.href="./index.jsp";
    },
    toUser(){
      this.$router.push("/user/info");

      this.$store.commit("setUserindex","1");
    },
    toInfo(){
      this.$router.push("/user/info");

      this.$store.commit("setUserindex","1");
    },
    toAct(){
      this.$router.push("/user/act");
      this.$store.commit("setUserindex","2");
    },
    toAsk(){
      this.$router.push("/user/ask");
      this.$store.commit("setUserindex","3");
    },
    toRecord(){
      this.$router.push("/user/record");
      this.$store.commit("setUserindex","4");
    },
    toApp(){
      this.$router.push("/user/app");
      this.$store.commit("setUserindex","5");
    },
    logout(){
      this.$message({
							message: '退出成功！',
							type: 'success',
							showClose: true,
							duration:1000
		
							});
      this.$store.commit("setLogin",false);
      this.$store.dispatch("getUserInfo",{});
      this.$router.push("/home");
    },
    handleCommand(command) {
      this.$message('click on item ' + command);
      //this[command]();
    }


  },
  mounted:function(){
			this.isLogin = this.$store.state.isLogin;
		},
  computed:{
    userInfo(){
      console.log(this.$store.state.userInfo);
      return this.$store.state.userInfo;
    },
    shopcart_num(){
      
      return this.$store.state.num
    }
  },

};
</script>

<style lang="css" scoped>
.el-header{
  border-bottom: #c9c9c9;
  box-shadow: 0 0.5px 0.5px 0 #c9c9c973;
}
.header{
  width: 1200px;
  height: 100px;
  line-height: 100px;
  margin: 0 auto;
}
.nav-left{
  float: left;
  margin: 0px;
  height: 100px;
  margin-left: 30px;
}
.nav-left img{
  height: 100px;
  width: 250px;
  display: inline-block;
}
.nav-center{
  float: left;
  margin-left: 50px;
  /* width:  */
}
.nav-center ul{
	overflow: hidden;
}
.nav-center  ul li{
	float: left;
	margin: 0 5px;
	/*width: 100px;*/
	padding: 0 20px;
	height: 100px;
	line-height: 100px;
	text-align: center;
}
.nav-center ul li a{
	color: #4a4a4a;
	width: 100%;
	height: 70px;
  font-size: 20px;
	display: inline-block;

}
.nav-center ul li a:hover{
	color: rgb(63, 245, 27);
}
.nav-center ul li a.is-active{
	    color:  #ffc210;
     border-bottom: 4px solid #ffc210;
}
.nav-right{
  float: right;
  position: relative;
  z-index: 100;
  
}
.nav-right span{
  cursor: pointer;
}
.nav-right .user{
	margin-left: 15px;
}
.nav-right img{
	width: 26px;
	height: 26px;
	border-radius: 50%;
	display: inline-block;
	vertical-align: middle;
	margin-left: 15px;
}
.nav-right  ul{
  position: absolute;
  width: 221px;
  z-index: 100;
  font-size: 12px;
  top: 80px;
  background: #fff;
  border-top: 2px solid #d0d0d0;
    box-shadow: 0 2px 4px 0 #e8e8e8;
}
.nav-right ul li{
    height: 40px;
    color: #4a4a4a;
    padding-left: 30px;
    padding-right: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: all .2s linear;
}
.nav-right ul li span.msg{
  margin-left: -80px;
  color: red;
}
.count{
  color: red;
}

</style>
