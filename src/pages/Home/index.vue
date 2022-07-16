<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>


  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from './Like';
import Floor from './Floor';
import Brand from './Brand';

import {mapState} from "vuex";


export default {
  name: "",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    //获取floor组件信息
    this.$store.dispatch("getFloorList");
    //获取用户登录情况信息
    // this.$store.dispatch("getUserInfo");

  },
  computed:{
    ...mapState({
      floorList:state=>state.home.floorList,
    })
  }
};
</script>

<style lang="less" scoped>
</style>