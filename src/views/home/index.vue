<template>
  <AppContainer :main-height.sync="mainHeight">
    <div class="dashboard-container center">
      <div class="info-container">
        <div class="dashboard-text"> 山东科技大学图书馆图书管理系统 </div>
        <div class="dashboard-text1"> Shandong University of Science and Technology library management system </div>
        <div class="center">
        <img src="../../assets/img/book4.png" width="200px" style="margin-top:35px;" alt=""></div>
      </div>
      <!-- <div class="dashboard-text">name: {{ name }} </div>
      <div class="dashboard-text">create_time: {{ create_time }} </div>
      <div class="dashboard-text">roles: {{ roles }} </div> -->
    </div>
  </AppContainer>
</template>

<script>
import { mapGetters } from 'vuex'
import AppContainer from '@/components/AppContainer/AppContainer.vue'

export default {
  name: 'Dashboard',
  components: {
    AppContainer
  },
  data() {
    return {
      mainHeight: 0
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'create_time',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    width: 100%;
    height: 81vh;
    background: url(../../assets/img/book2.png) round;
  }
  &-text {
    font-size: 30px;
    font-weight: bold;
    line-height: 46px;
    margin-top: 30px;
    text-align: center;
  }
  &-text1 {
    font-size: 16px;
    font-weight: bold;
    line-height: 0px;
    margin-top: 15px;
    color: #333;
    text-align: center;
  }
}
.info-container{
  width: 60%;
  height: 350px;
  background: rgb(246,246,246,0.5);
}
.center{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}
</style>
