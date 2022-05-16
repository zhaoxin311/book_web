<template>
  <AppContainer :main-height.sync="mainHeight">
    <div class="dashboard-container">
      <div class="dashboard-text">name: {{ name }} </div>
      <div class="dashboard-text">create_time: {{ create_time }} </div>
      <div class="dashboard-text">roles: {{ roles }} </div>
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
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
