<template>
  <div class="resource" >
    <!-- <h1>{{ msg }}</h1> -->
  
    <el-card shadow="hover" class="card">
      {{ msg }}
    </el-card>
    <div class="search">
    <el-form :inline="true" :model="search" class="">
      <el-form-item label="资源名称">
        <el-input v-model="search.name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="主要用途">
        <el-input v-model="search.func" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="资源类型">
        <el-input v-model="search.type" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchResources()">查询</el-button>
      </el-form-item>
    </el-form>
    </div>
    
    <el-table
    stripe
    :data="resource"
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
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="资源名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="price"
      label="资源价格"
      width="120">
    </el-table-column>
    <!-- <el-table-column
      prop="number"
      label="资源数量"
      width="120">
    </el-table-column> -->
    <el-table-column
      prop="type"
      label="资源类型"
      width="300">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="300">
      <template slot-scope="scope">
        <!-- <span class="subtract" @click="numberSub(scope.$index)" :class="{disabled:(scope.row.number<=1)}">-</span>
				<input type="text" class="input_num" v-model:value="scope.row.number" />
				<span class="add" @click="numberAdd(scope.$index)" :class="{disabled:scope.row.number>=8}">+</span> -->
        <el-button size="mini" type="primary" icon="el-icon-minus" class="" @click="numberSub(scope.$index)" :disabled="(scope.row.number<=1)"></el-button>
        <input type="text" class="input_num" v-model:value="scope.row.number" />
        <el-button size="mini" type="primary" icon="el-icon-plus" class=""  @click="numberAdd(scope.$index)" ></el-button>
        <el-button @click="addto(scope.row)" type="warning" icon="el-icon-circle-plus-outline" size="small">加入申请单</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-sizes="[5, 10, 15, 20]"
			:page-size="pageSize"
			layout="total, sizes, prev, pager, next, jumper"
      prev-text="上一页"
      next-text="下一页"
			:total="total">
		</el-pagination>
    <div class="btn">
      <el-badge :value="this.$store.state.num" class="choose">
        <el-button icon="el-icon-goods" type="success" @click="dialogVisible = true" round >已选资源</el-button>
      </el-badge>
      <el-button type="primary" class="submit" @click="app()">申请资源</el-button>
    </div>
    <el-dialog
      title="已选资源"
      :visible.sync="dialogVisible"
      width="50%"
      center>
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
          width="250">
          <template slot-scope="scope">
            <!-- <span class="subtract" @click="numberSub(scope.$index)" :class="{disabled:(scope.row.number<=1)}">-</span>
            <input type="text" class="input_num" v-model:value="scope.row.number" />
            <span class="add" @click="numberAdd(scope.$index)" :class="{disabled:scope.row.number>=8}">+</span> -->
            <el-button size="mini" type="primary" class="" @click="Sub(scope.$index)" :disabled="(scope.row.number<=1)">-</el-button>
            <input type="text" class="input_num" v-model:value="scope.row.number" />
            <el-button size="mini" type="primary" class=""  @click="Add(scope.$index)" >+</el-button>
            <el-button @click="del(scope.$index)" type="danger" size="mini">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center">
        <span>共有资源{{num}}种</span>----<span>总金额：{{money}}元</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="clear()">清空</el-button>
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'Resource',
  data () {
    return {
      msg: '创新创业基地为支持同学们更好的创新创业，特为同学们提供了丰富的学校资源。同学们可以选择自己需要的资源，提交申请，待老师批准后，便可到创新创业基地进行领取！',
      currentPage:1,
			pageSize:5,
      total:0,
      resources:[],
      search:{
        name:'',
        func:'',
        type:''
      },
      cart:[],
      num:0,
      money:0,
      dialogVisible: false,
      userid:0
    }
  },
  computed:{
    resource: function(){
      console.log("调用了计算属性resource");
      let s =this.pageSize;
      let c = this.currentPage;
      let start = s*(c-1);
      //return this.resources.slice(start,(start+s));
      let rs = this.resources.slice(start,(start+s));
      rs.forEach(element => {
        element.number =1;
      });//使用foreach遍历
      return rs;
    }
    // apply:function(){
    //   console.log("调用了计算属性apply");
    //   let s =this.pageSize;
    //   let c = this.currentPage;
    //   let start = s*(c-1);
    //   // return this.resources.slice(start,(start+s));
    //   let rs = this.resources.slice(start,(start+s));
    //   rs.forEach(element => {
    //     element.number =1;
    //   });//使用foreach遍历
    //   // for(var i=0;i<rs.length;i++){
    //   //   rs[i].number = 1;
    //   // }
    //   return rs;
    //   // for(var r in rs){
    //   //   r.number = 1;
    //   // }
    //   // return rs;//不能读取其子元素
    // //  return rs.map(function(e){
    // //    console.log(e);
    // //    e.number=1;
    // //  });//使用数组的map()函数将每个元素数量设置为1
    // }
    
  },
  methods:{
    Sub(index){
      this.cart[index].number--;
      this.$store.commit('setShopcart',this.cart);
      this.count();
    },
    Add(index){
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
    app(){
      if(this.userid==0){
        this.$message({
								message: '请先登陆！',
								type: 'error',
								showClose: true,
								duration:2000
								});
      }else{
        this.$router.push("/user/app");
        this.$store.commit("setUserindex","5");
      }
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
      searchResources(){
        var api = this.$store.state.baseUrl+'resource/search.action';
				this.$http.post(api, {
          name:this.search.name,
          func:this.search.func,
          type:this.search.type
					})
					.then(function(response){
						console.log(response.data);
						if(response.data==null){
							this.msg="获取资源失败！";
						}else{
              this.resources = response.data;
              this.total = response.data.length;
             // console.log(this.resource);
						}						
					})
					.catch(function (error) {
						console.log(error);
					});
      },
      numberSub(index){
        this.resource[index].number--;
      },
      numberAdd(index){
        //console.log("scope"+index.row);
        this.resource[index].number++;
      },
      addto(resource){
        console.log("name:"+resource.name);
        let cart = this.$store.state.shopcart;//获取store里的购物车数据
        if(cart.length>0){//判断购物车是否为空，为空不能循环
          for(var i=0;i<cart.length;i++){
            if(cart[i].resourceid == resource.resourceid){
              break;
            }
          }//判断添加的资源是否在购物车内
          if(i<cart.length){//在购物车内
            let a = cart[i].number;
            let b = resource.number;
            cart[i].number = a+b;
            //cart[i].number +=resource.number;//别用原变量做加减
            this.$store.commit('setShopcart',cart);
          }else{//不在购物车内
            let n = this.$store.state.num;
            n++;
            this.num = n;
            this.$store.commit('shopcart_num',n);
            cart.push(resource);
            this.count();
            this.$store.commit('setShopcart',cart);
          }
        }else{
          let num = this.$store.state.num;
          num++;
          this.$store.commit('shopcart_num',num);
          cart.push(resource);
          this.$store.commit('setShopcart',cart);
        }
        this.$message({//弹出提示信息
							message: resource.name+'添加成功！',
							type: 'success',
							showClose: true,
							duration:2000
        });
      },
			handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        console.log(`每页 ${val} 条`);
        console.log("页面大小："+this.pageSize);
			},
			handleCurrentChange(val) {
        this.currentPage=val;
        console.log(`当前页: ${val}`);
        console.log("当前页面"+this.currentPage);
			},
			getResources(){
				var api = this.$store.state.baseUrl+'resource/getAll.action';
				this.$http.post(api, {
					})
					.then(function(response){
						console.log(response.data);
						if(response.data==null){
							this.msg="获取资源失败！";
						}else{
              this.resources = response.data;
              this.total = response.data.length;
             // console.log(this.resource);
						}						
					})
					.catch(function (error) {
						console.log(error);
					});
			}	
		},
		mounted:function(){
      this.getResources();
      this.cart = this.$store.state.shopcart;
      this.num = this.$store.state.num;
      this.count();
      if(this.$store.state.userInfo.userid != undefined){
        this.userid = this.$store.state.userInfo.userid
      }
      // var api = this.$store.state.baseUrl+'resource/getAll.action';
			// 	this.$http.post(api, {
			// 		})
			// 		.then(function (response) {
			// 			console.log(response.data);
			// 			if(response.data==null){
			// 				this.msg="获取资源失败！";
			// 			}else{
			// 				this.resources = response.data;
			// 			}						
			// 		})
			// 		.catch(function (error) {
			// 			console.log(error);
			// 		});
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn{
  margin:20px;
}
.choose{
 margin-right: 100px;
}
.submit{
  margin-left: 100px;
}
.card{
  width: 600px;
  margin: auto;
  margin-top:10px;
  margin-bottom:10px;
  background-color: aliceblue;
  color: rgb(240, 114, 131);
}
.resource{
  margin-top: 60px;
  margin:auto;
  width:1200px;
}
.subtract{display: inline-block;width: 25px;height: 25px;text-align: center;font-weight: bold;font-size: 20px;}
.add{display: inline-block;width: 25px;height: 25px;text-align: center;font-weight: bold;font-size: 20px;}
.input_num{display: inline-block;width: 25px;height: 22px;}
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
