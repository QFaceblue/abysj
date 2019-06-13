<template>
	<div>
	    <el-container class="user">
				<el-header class="title">
					<h3>{{this.$store.state.userInfo.name}}您好，这里是您的个人中心！</h3>
				</el-header>
	    <el-container>
				<el-aside class="" style="width:200px">
					<el-menu
						:default-active="this.$store.state.userindex"
						class="el-menu-vertical-demo"
						background-color="#545c64"
						text-color="#fff"
						active-text-color="#ffd04b">
						<el-menu-item index="1" @click="toInfo()">
							<i class="el-icon-edit-outline"></i>
							<span slot="title" >我的信息</span>
						</el-menu-item>
						<el-menu-item index="2" @click="toAct()" >
							<i class="el-icon-tickets"></i>
							<span slot="title" >活动记录</span>
						</el-menu-item>
						<el-menu-item index="3" @click="toAsk()" >
							<i class="el-icon-news"></i>
							<span slot="title" >实验室记录</span>
						</el-menu-item>
						<el-menu-item index="4" @click="toRecord()" >
							<i class="el-icon-document"></i>
							<span slot="title" >申请记录</span>
						</el-menu-item>
						<el-menu-item index="5"  @click="toApp()">
							<i class="el-icon-circle-plus"></i>
							<span slot="title" >申请资源</span>
						</el-menu-item>
					</el-menu>
				</el-aside>
				<el-main>
					<router-view/>
				</el-main>
				</el-container>
			</el-container>
	</div>
	
</template>
<script>
export default {
  name: 'User',
  data () {
    return {
      
    }
	},
	methods:{
		toInfo(){
			console.log("点击个人信息");
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
		}
	}
}

</script>
 <style  scoped>
.user{
  margin:auto;
  width:1200px;
	min-height: 550px;
  /* background-color: aliceblue; */
}
.title{
	background-color:#545c64;
	color: aliceblue;
	padding-top: 20px;
}
.el-aside{
	width:200px;
	background-color: #545c64;
}
</style>