<template>
	<div>
	  <el-card shadow="hover" class="card">
      {{ msg }}
    </el-card>
    <el-table
    stripe
    :data="cart"
    >
    <el-table-column type="expand" label="点击查看">
      <template slot-scope="props">
        <el-form label-position="left" inline class="">
          <el-form-item label="资源主要用途：">
            <span>{{ props.row.func }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <!-- <el-table-column
      type="index"
      width="50">
    </el-table-column> -->
    <el-table-column
      prop="resourceid"
      label="资源ID"
      width="100">
    </el-table-column>
    <el-table-column
      prop="name"
      label="资源名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="price"
      label="资源价格"
      width="100">
    </el-table-column>
    <!-- <el-table-column
      prop="number"
      label="资源数量"
      width="120">
    </el-table-column> -->
    <el-table-column
      prop="type"
      label="资源类型"
      width="100">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="300">
      <template slot-scope="scope">
        <!-- <span class="subtract" @click="numberSub(scope.$index)" :class="{disabled:(scope.row.number<=1)}">-</span>
				<input type="text" class="input_num" v-model:value="scope.row.number" />
				<span class="add" @click="numberAdd(scope.$index)" :class="{disabled:scope.row.number>=8}">+</span> -->
        <el-button size="mini" type="primary" class="" @click="numberSub(scope.$index)" :disabled="(scope.row.number<=1)">-</el-button>
        <input type="text" class="input_num" v-model:value="scope.row.number" />
        <el-button size="mini" type="primary" class=""  @click="numberAdd(scope.$index)" >+</el-button>
        <el-button @click="del(scope.$index)" type="danger" size="mini">移除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div>
    <span>共有资源{{num}}种</span>----<span>总金额：{{money}}元</span>
  </div>
  <div>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入申请原因"
      v-model="reason">
    </el-input>
  </div>
  <div>
    <el-button type="warning" @click="toRes()">添加资源</el-button>
    <el-button type="primary" round @click="subApp()" :disabled="(money==0||reason=='')">提交申请</el-button>
  </div>
	</div>
	
</template>
<script>
export default {
  name: 'UserApp',
  data () {
    return {
      msg:"欢迎来到资源申请页面，填写申请原因后，点击提交即可申请您申请单里面的资源！",
      cart:[],
      num:0,
      money:0,
      reason:''
    }
  },
  methods:{
    toRes(){
      this.$router.push("/resource");
    },
    numberSub(index){
      this.cart[index].number--;
      this.$store.commit('setShopcart',this.cart);
      this.count();
    },
    numberAdd(index){
      //console.log("scope"+index.row);
      this.cart[index].number++;
      this.$store.commit('setShopcart',this.cart);
      this.count();
    },
    del(index){
      this.cart.splice(index,1);
      this.$store.commit('setShopcart',this.cart);
      let n=this.num;
      n--;
      this.num = n;
      this.$store.commit('shopcart_num',this.num);
      this.count();
    },
    count(){
      let total = 0.0;
      let price = 0.0;
      let number = 0;
      let product = 0.0;//乘积
      this.cart.forEach(e => {
        price = e.price;
        number = e.number;
        product = price*number;
        total += product;
      });
      this.money = total;
    },
    clear(){
      this.cart =[];
      this.num = 0;
      this.money =0;
      this.$store.commit('setShopcart',this.cart);
      this.$store.commit('shopcart_num',this.num);
    },
    subApp(){
      let api = this.$store.state.baseUrl+'application/addApplication.action';
      let items = JSON.stringify(this.cart);
      console.log("items:"+items);
      let test = JSON.parse(items);
      console.log("test:"+test[0].name);
      this.$http.post(api, {
          userid:this.$store.state.userInfo.userid,
          username:this.$store.state.userInfo.name,
          askitem:items,
          money:this.money,
          reason:this.reason,
          state:"等待处理"
        })
        .then(function (response) {
          console.log(response.data);
          if(response.data==null){
            this.$message({
              message: '提交申请失败！',
              type: 'error',
              showClose: true,
              duration:2000
              });
          }else{
            this.$message({
            message: '提交申请成功！',
            type: 'success',
            showClose: true,
            duration:2000
  
            });
            this.clear();
            this.reason="";
           // this.$router.push("/user/record");
          }						
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  mounted:function(){
      this.cart = this.$store.state.shopcart;
      this.num = this.$store.state.num;
      this.count();
	}
}

</script>
<style  scoped>
.card{
  width: 400px;
  margin: auto;
  margin-top:0px;
  margin-bottom:0px;
  background-color: aliceblue;
  color: rgb(240, 114, 131);
}
.input_num{display: inline-block;width: 25px;height: 22px;}

</style>
