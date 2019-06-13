<template>
	<div>
	    <div class="info">
				<el-form :model="user" :rules="rules2" ref="Form" label-width="100px" class="">
					<el-form-item label="账号" prop="account">
						<el-input v-model="user.account"  disabled></el-input>
					</el-form-item>
					<el-form-item label="姓名" prop="name">
						<el-input v-model="user.name"></el-input>
					</el-form-item>
					<el-form-item  label="密码" prop="password">
						<el-input type="password" autocomplete="off" v-model="user.password"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="password1">
						<el-input  type="password" autocomplete="off" v-model="user.password1"></el-input>
					</el-form-item>
					<el-form-item label="手机号" prop="phonenum">
						<el-input v-model="user.phonenum"></el-input>
					</el-form-item>
          <el-form-item label="实验室号" prop="labid">
						<el-input v-model="user.labid" disabled></el-input>
					</el-form-item>
          <el-form-item label="用户号" prop="userid">
						<el-input v-model="user.userid" disabled></el-input>
					</el-form-item>
          <el-form-item label="用户状态" prop="state">
						<el-input v-model="user.state" disabled></el-input>
					</el-form-item>
          <el-form-item label="用户类型" prop="type">
						<el-input v-model="user.type" disabled></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="update()" 
            :disabled="(user.name==this.$store.state.userInfo.name
            && user.phonenum == this.$store.state.userInfo.phonenum
            && user.password == this.$store.state.userInfo.password)">
            保存修改</el-button>
						<el-button @click="reset()"
            :disabled="(user.name==this.$store.state.userInfo.name
            && user.phonenum == this.$store.state.userInfo.phonenum
            && user.password == this.$store.state.userInfo.password)">
            恢复默认</el-button>
					</el-form-item>
				</el-form>
			 </div>
	</div>
	
</template>
<script>
export default {
  name: 'UserInfo',
  data () {
    var validatePass = (rule, value, callback) => {
				if (value === '') {
				callback(new Error('请再次输入密码'));
				} else if (value !== this.user.password) {
				callback(new Error('两次输入密码不一致!'));
				} else {
				callback();
				}
			};
    return {
      user:{
        account:"",
        labid:0,
        name:"",
        password:"",
        password1:"",
        phonenum:"",
        state:"",
        type:"",
        userid:0
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
    }
  },
  methods:{
    reset(){
      console.log("重置");
      this.$refs.Form.resetFields();
      this.setUser();
    },
    setUser(){
      this.user.account = this.$store.state.userInfo.account;
      this.user.labid = this.$store.state.userInfo.labid;
      this.user.name = this.$store.state.userInfo.name;
      this.user.password = this.$store.state.userInfo.password;
      this.user.password1 = this.$store.state.userInfo.password;
      this.user.phonenum = this.$store.state.userInfo.phonenum;
      this.user.state = this.$store.state.userInfo.state;
      this.user.type = this.$store.state.userInfo.type;
      this.user.userid = this.$store.state.userInfo.userid;
    },
    update() {
				this.$refs.Form.validate((valid) => {
				if (valid) {
					var api = this.$store.state.baseUrl+'updUser.action';
				this.$http.post(api, {
            userid:this.user.userid,
						name:this.user.name,
						phonenum:this.user.phonenum,
						password:this.user.password
					})
					.then(function (response) {
						console.log(response.data);
						if(response.data<=0){
							this.$message({
								message: '修改失败！',
								type: 'error',
								showClose: true,
								duration:2000
								});
						}else{
              var u = this.$store.state.userInfo;
              u.name = this.user.name;
              u.phonenum = this.user.phonenum;
              u.password = this.user.password;
							this.$store.commit('getUserInfo',u);
							this.$message({
							message: '保存修改成功！',
							type: 'success',
							showClose: true,
							duration:2000
		
							});
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
			}
  },
  mounted:function(){
    this.setUser();
  }
}

</script>
<style scoped>
.info{
  width:600px;
  margin:auto;
}
</style>
