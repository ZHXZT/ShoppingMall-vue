<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
    </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
export default {
  name: '',
  components:{ 
    Header,
    Footer
  },
  mounted(){
    //派发一个action获取商品分类的三级列表数据
    this.$store.dispatch("categoryList");
  }
}
</script>

<style lang="less" scoped>

</style>