<template>
	<div class="asklab">
		<el-card shadow="hover" class="card">
		<p>按要求填写入住申请单，待老师批准后即可入住实验室。</p>
		<p>注意上传附件可以增加通过概率！</p>
		<p>上传附件前，请先<a :href="downloadurl"
		 class="download">下载申请表</a>，填写后上传！</p>
		<!-- <p>上传附件前，请先<a href="http://localhost:8888/cdut_bysj/file/download.action?filename=applicationTable.doc"
		 class="download">下载申请表</a>，填写后上传！</p> -->
		<!-- <a href="${pageContext.request.contextPath }/file/download?filename=applicationTable.doc">
          下载申请表
     	</a> -->
		</el-card>
		<el-card class="appform">
			<h3>入住申请</h3>
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
					<el-input v-model="form.reason" type="textarea" placeholder="请输入申请原因" autocomplete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="图片">
					<el-upload
							ref="upload"
							action="http://localhost:8888/cdut_bysj/file/upload.action"
							name="uploadfile"
							list-type="picture-card"
							:limit="1"
							:file-list="fileList"
							:on-exceed="onExceed"
							:before-upload="beforeUpload"
							:on-preview="handlePreview"
							:on-success="handleSuccess"
							:on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item> -->
				<el-form-item label="附件" label-width="100px">
					<el-upload
						class="upload-demo"
						name="uploadfile"
						:action="uploadurl"
						:on-preview="handlePreview"
						:on-remove="handleRemove"
						:before-remove="beforeRemove"
						:on-success="handleSuccess"
						multiple
						:limit="1"
						:on-exceed="onExceed"
						:file-list="fileList">
						<el-button size="small" type="primary">点击上传</el-button>
						<!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
					</el-upload>
				</el-form-item>
				<el-form-item>
					<el-button type="warning" @click="subApp()":disabled="(form.reason=='')">提交申请单</el-button>			
				</el-form-item>
			</el-form>
			

			<!-- <el-upload
			class=""
			action="http://localhost:8888/cdut_bysj/file/upload.action"
			:on-preview="handlePreview"
			:on-remove="handleRemove">
			<el-button size="small" type="primary">点击上传</el-button>
			<div slot="tip" class="el-upload__tip">只能上传doc/docx文件，且不超过500kb</div>
			</el-upload> -->
		</el-card>	 
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"Asklab",
		data(){
			return {
				msg:"按要求填写入住申请单，带老师批准后即可入住实验室。"
				+"注意上传附件可以增加通过概率，上传附件前，请先下载申请表，填写后上传！",	
				//文件上传的参数
				dialogImageUrl: '',
				dialogVisible: false,
				//文件列表（用于在上传组件中回显）
				fileList: [],
				form:{
					userid:0,
					labid:0,
					username:"",
					reason:"",
					filepath:""
				},
				downloadurl: this.$store.state.baseUrl+"file/download.action?filename=applicationTable.doc",
				uploadurl: this.$store.state.baseUrl+"file/upload.action"
			}
		},
		methods:{
			//文件上传成功的钩子函数
			handleSuccess(res, file) {
				console.log("服务器存储的文件名:"+res);
				this.$message({
					type: 'success',
					message: '附件上传成功',
					duration: 2000,
					showClose: true,
				});
				this.form.filepath = res;
				
			},
			//删除文件之前的钩子函数
			handleRemove(file, fileList) {
				this.$message({
					type: 'success',
					message: '已删除上传附件',
					duration: 2000,
					showClose: true,
				});
			},
			//点击列表中已上传的文件事的钩子函数
			handlePreview(file) {
			},
			//上传的文件个数超出设定时触发的函数
			onExceed(files, fileList) {
				this.$message({
					type: 'warning',
					message: '最多只能上传一个附件',
					duration: 2000,
					showClose: true,
				});
			},
			//文件上传前的前的钩子函数
			//参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
			// beforeUpload(file) {
			// 	const isJPG = file.type === 'image/jpeg';
			// 	const isGIF = file.type === 'image/gif';
			// 	const isPNG = file.type === 'image/png';
			// 	const isBMP = file.type === 'image/bmp';
			// 	const isLt2M = file.size / 1024 / 1024 < 2;

			// 	if (!isJPG && !isGIF && !isPNG && !isBMP) {
			// 		this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
			// 	}
			// 	if (!isLt2M) {
			// 		this.$message.error('上传图片大小不能超过 2MB!');
			// 	}
			// 	return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
			// },
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			subApp() {
				var api = this.$store.state.baseUrl+'asklab/addAsklab.action';
				this.$http.post(api, {
					userid:this.form.userid,
					labid:this.form.labid,
					username:this.form.username,
					reason:this.form.reason,
					filepath:this.form.filepath,
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
						this.$router.push("/lab");
					}						
					})
					.catch(function (error) {
					console.log(error);
					});
			}

		},
		mounted:function(){
			this.form.userid = this.$store.state.userInfo.userid;
			this.form.username = this.$store.state.userInfo.name;
			this.form.labid = this.$store.state.asklabid;
		}

	}
</script>
<style scoped>
.card{
  width: 600px;
  margin: auto;
  margin-top:5px;
  margin-bottom:5px;
  background-color: rgb(233, 247, 250);
  /* color: rgb(240, 114, 131); */
}
.appform{
  width: 600px;
  margin: auto;
  background-color: rgb(244, 247, 210);
}
.download{
	text-decoration-line: underline;
}
a:link {color:#2778f3;}      /* 未访问链接*/
a:visited {color:rgb(251, 255, 0);}  /* 已访问链接 */
a:hover {color:rgb(21, 255, 0);}  /* 鼠标移动到链接上 */
a:active {color:#0000FF;}  /* 鼠标点击时 */
</style>