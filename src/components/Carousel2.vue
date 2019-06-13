<template>
	<div>
	    <el-carousel  arrow="always" type="card" height="300px" width="1000px">
				<el-carousel-item v-for="(item, index) in imgData" :key="item.id">
				<a href="#" @click="setMessage(item.messageid)">
						<img :src="item.imgpath" alt=""> 
					</a>
				<!-- data中的路径只会被当做普通的字符串，因此无法获取图片 -->
	      </el-carousel-item>
	    </el-carousel>
			<!-- <img src='../assets/img/img1.jpg' alt=""> -->
	</div>
	
</template>
<script>
export default {
  name: 'Carousel2',
  data () {
    return {
      imgData : [
					{id:1,imgpath:require("../assets/img/building1.jpg"),messageid:65},
					{id:2,imgpath:require("../assets/img/building2.jpg"),messageid:65},
					{id:3,imgpath:require("../assets/img/lab1.jpg"),messageid:73},
					{id:4,imgpath:require("../assets/img/labrary1.jpg"),messageid:64},
					{id:5,imgpath:require("../assets/img/labrary2.jpg"),messageid:64}
				]
    }
	},
	methods:{
		setMessage(id){
      var api = this.$store.state.baseUrl+'message/getBymessageid.action';
      this.$http.post(api, {
				messageid:id
        })
        .then((response) =>{
          console.log(response.data);
          if(response.data==null){
            this.msg="获取信息失败！";
          }else{
            this.$store.commit('setMessage',response.data);
						this.$router.push("/detail");
          }						
        })
        .catch(function (error) {
          console.log(error);
        });
    },
	}
}

</script>
<style scoped>
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  	.el-carousel__item img {
		width:600px;
		height:300px;
  	} 
</style>