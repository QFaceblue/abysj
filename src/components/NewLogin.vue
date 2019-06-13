<template>
	<div class="login">
		<h4 class="login_title">
			 <div class="login_normal_title">
				 <span @click="changeLoginway('login')" :class="{login_active:loginway==='login'}">登录</span>
				 <b>·</b>
				 <span @click="changeLoginway('register')" :class="{login_active:loginway==='register'}">注册</span>
			 </div>
			 <div v-show="loginway==='login'">
				 	
				<el-form :model="loginForm" :rules="rules1" ref="loginForm" label-width="" class="">
					<el-form-item label="账号" prop="account">
						<el-input v-model="loginForm.account"></el-input>
					</el-form-item>
					<el-form-item  label="密码" prop="password">
						<el-input type="password" autocomplete="off" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitLogin()">登录</el-button>
						<el-button @click="resetForm('loginForm')">重置</el-button>
					</el-form-item>
				</el-form>
			 </div>
			 <div v-show="loginway==='register'">
				<el-form :model="registerForm" :rules="rules2" ref="registerForm" label-width="" class="">
					<el-form-item label="账号" prop="account">
						<el-input v-model="registerForm.account"></el-input>
					</el-form-item>
					<el-form-item label="姓名" prop="name">
						<el-input v-model="registerForm.name"></el-input>
					</el-form-item>
					<el-form-item  label="密码" prop="password">
						<el-input type="password" autocomplete="off" v-model="registerForm.password"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="password1">
						<el-input  type="password" autocomplete="off" v-model="registerForm.password1"></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="phonenum">
						<el-input v-model="registerForm.phonenum"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitRegister()">注册</el-button>
						<el-button @click="resetForm('registerForm')">重置</el-button>
					</el-form-item>
				</el-form>
			 </div>
		</h4>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"NewLogin",
		data(){
			 var validatePass = (rule, value, callback) => {
				if (value === '') {
				callback(new Error('请再次输入密码'));
				} else if (value !== this.registerForm.password) {
				callback(new Error('两次输入密码不一致!'));
				} else {
				callback();
				}
			};
			return {
				
				loginForm: {
					account: '',
					password: ''		
				},
				registerForm: {
					account: '',
					name:'',
					password: '',
					password1: '',
					phonenum:''	
				},	
				rules1: {
					account: [
						{ required: true, message: '请输入您的账号', trigger: 'blur' }
						// { type:'number',min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
					]
				},
				rules2: {
					account: [
						{ required: true, message: '请输入您的账号', trigger: 'blur' }
						// { type:'number',min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
					name: [
						{ required: true, message: '请输入您的姓名', trigger: 'blur' },
						{ min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'change' },
						{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
					],
					password1: [
						{ validator: validatePass, trigger: 'blur' }
					],
					phonenum: [
						{ required: true, message: '请输入您的手机号', trigger: 'blur' },
						{ min: 11, max: 11, message: '请输入正确的11位手机号', trigger: 'blur' }
					],
				},			
				loginway:''
			}
		},
		methods:{
			submitLogin() {
				this.$refs.loginForm.validate((valid) => {
				if (valid) {
					var api = this.$store.state.baseUrl+'login.action';
					this.$http.post(api, {
						account:this.loginForm.account,
						password:this.loginForm.password
						})
						.then(function (response) {
							console.log("user:"+response.data);
							if(response.data==null||response.data==''){
								this.$message({
								message: '账号或者密码错误！',
								type: 'error',
								showClose: true,
								duration:1000
								});
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
				} else {
					console.log('error submit!!');
					return false;
				}
				});
			},
			submitRegister() {
				this.$refs.registerForm.validate((valid) => {
				if (valid) {
					var api = this.$store.state.baseUrl+'addUser.action';

				this.$http.post(api, {
						name:this.registerForm.name,
						phonenum:this.registerForm.phonenum,
						account:this.registerForm.account,
						password:this.registerForm.password
					})
					.then(function (response) {
						console.log(response.data);
						if(response.data.state==null||response.data.state==""){
							this.$message({
								message: '注册失败！该账号已被使用。',
								type: 'error',
								showClose: true,
								duration:2000
								});
						}else{
							this.$store.dispatch("getUserInfo",response.data);
							this.$store.commit('setLogin',true);
							this.$message({
							message: '注册成功！',
							type: 'success',
							showClose: true,
							duration:2000
		
							});
							this.$router.push("/home");
						}						
					})
					.catch(function (error) {
						console.log(error);
					});
				} else {
					console.log('error submit!!');
					return false;
				}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			changeLoginway(type){
				this.loginway = type;
				this.resetForm('loginForm');
				this.resetForm('registerForm');
				// if(type =='register'){
				// 	this.resetForm('loginForm');
				// }
				// if(type=='login'){
				// 	this.resetForm('registerForm');
				// }
				
				
				// this.$refs["loginForm"].resetFields();
				// this.$refs["registernForm"].resetFields();
				// console.log('执行切换');
				// this.resetForm('loginForm');
				// console.log('执行切换');
				//this.$refs.loginForm.resetFields;
				//this.$refs.registerForm.resetFields;
				//this.resetForm('registerForm');
				//console.log('执行切换');
			}			
		},
		mounted:function(){
			this.loginway = this.$store.state.loginway;
		}

	}
</script>
<style scoped>
	.login{width: 400px;margin: 0 auto 50px;padding: 20px 30px 30px 30px ;border-radius: 4px;box-shadow: 0 0 8px rgba(0,0,0,.1);}
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