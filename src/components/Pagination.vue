<template>
	<div class="">
		<span class="demonstration">完整功能</span>
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage4"
			:page-sizes="[5, 10, 15, 20]"
			:page-size="100"
			layout="total, sizes, prev, pager, next, jumper"
			:total="400">
		</el-pagination>		
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"Pagination",
		data(){
			return {				
				currentPage:1,
				pageSize:5,
				totol:50
			}
		},
		methods:{
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
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
					.then(function (response) {
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