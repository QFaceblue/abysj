<template>
	<div class="login">
		<h4 class="login_title">
			 <div class="login_normal_title">
				 <span @click="changeLoginway('login')" :class="{login_active:loginway==='login'}">登录</span>
				 <b>·</b>
				 <span @click="changeLoginway('register')" :class="{login_active:loginway==='register'}">注册</span>
			 </div>
			 <div v-if="loginway==='login'">
				 	
				 	<div class="input_div">
					 	<input type="text" ref="loginAccount" placeholder="账号" class="input_top input_normal">
					</div>
				 	<div class="input_div">
				 		<input type="password" ref="loginPassword" placeholder="密码" class="input_bottom input_normal">
				 	</div>
				 	<div class="forget">
				 		<span>{{msg}}</span><span>忘记密码？</span>
				 	</div>
				 	<button class="login_button" @click='login()'>登录</button>
				

			 </div>
			 <div v-if="loginway==='register'">
				 	<div class="input_div">
					 	<input type="text" ref="account" placeholder="学号" class="input_top input_normal">
					</div>
					<div class="input_div">
					 	<input type="text" ref ="name"placeholder="姓名" class="input_top input_normal">
					</div>
					<div class="input_div">
				 		<input type="password" ref="password"placeholder="输入密码" class="input_bottom input_normal">
				 	</div>
				 	<div class="input_div">
				 		<input type="test"  ref="phone" placeholder="手机号" class="input_middle input_normal">
				 	</div>
				 	<button class="login_button" @click='register()'>注册</button>
			 </div>
		</h4>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"Login",
		data(){
			return {				
				loginway:'',
				msg:null,
			}
		},
		methods:{
			changeLoginway(type){
				this.loginway = type;
			},
			login(){
				var api = this.$store.state.baseUrl+'login.action';
				//var api = this.$store.state.baseUrl+'getByLabid.action';
				console.log(api);
				console.log(this.$refs.loginAccount.value);
				console.log(this.$refs.loginPassword.value);
				this.$http.post(api, {
					//labid: 7401
						account:this.$refs.loginAccount.value,
						password:this.$refs.loginPassword.value
					})
					.then((response)=> {
						console.log(response.data);
						if(response.data==null){
							this.msg="账号或密码错误！";
						}else{
							this.$store.dispatch("getUserInfo",response.data);
							this.$store.commit('setLogin',true);
							this.$message({
							message: '登陆成功！',
							type: 'success',
							showClose: true,
							duration:1000
		
							});
							this.$router.push("/home");
						}						
					})
					.catch(function (error) {
						console.log(error);
					});
			},
			register(){
				var api = this.$store.state.baseUrl+'addUser.action';

				this.$http.post(api, {
						name:this.$refs.name.value,
						phonenum:this.$refs.name.value,
						account:this.$refs.account.value,
						password:this.$refs.password.value
					})
					.then((response)=>{
						console.log(response.data);
						if(response.data==null){
							this.msg="账号或密码错误！";
						}else{
							this.$store.dispatch("getUserInfo",response.data);
							this.$store.commit('setLogin',true);
							this.$message({
							message: '注册成功！',
							type: 'success',
							showClose: true,
							duration:1000
		
							});
							this.$router.push("/home");
						}						
					})
					.catch(function (error) {
						console.log(error);
					});
			}
		},
		mounted:function(){
			this.loginway = this.$store.state.loginway;
		}

	}
</script>
<style scoped>
	.login{width: 400px;margin: 0 auto 50px;padding: 20px 30px 30px 30px ;border-radius: 4px;box-shadow: 0 0 8px rgba(0,0,0,.1);height: 400px}
	.login_normal_title{text-align: center; font-weight: 400; color: #969696;font-size: 18px;margin-bottom: 20px}
	.login_normal_title span{display: inline-block;padding: 10px;cursor: pointer;box-sizing: border-box;}
	.login_normal_title span:hover{border-bottom: 2px solid #00BC9B;}
	.login_active{color: #00BC9B; border-bottom: 2px solid #00BC9B;}
	.input_div{width: 300px;margin: 0px auto}
	.forget{width: 300px;margin: 20px auto;text-align: right;font-weight: 400; color: #969696;font-size: 12px;}
	.input_top{border: 1px solid #c8c8c8;border-bottom: none;border-radius: 4px 4px 0 0;}
	.input_bottom{border:1px solid #c8c8c8;border-radius:0 0 4px 4px; }
	.input_middle{border: 1px solid #c8c8c8;border-radius: 0;border-bottom: none}
    .input_normal{background-color: hsla(0,0%,71%,.1);width: 100%;padding: 4px 0 4px 15px; height: 50px;box-sizing: border-box;}
	.login_button{display: block;font-size: 18px;color:#fff;background:#00BC9B;border: none;border-radius: 5px;outline: none;width: 300px;height: 43px;line-height: 43px;margin: 30px auto }
</style>