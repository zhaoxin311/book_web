<template>
  <AppContainer :main-height.sync="mainHeight">

    <div>个人中心</div>
  </AppContainer>
</template>
<script>
import AppContainer from '@/components/AppContainer/AppContainer.vue'

export default {
  components: {
    AppContainer
  },
  data() {
    return {
      mainHeight: 0
    }
  }
}
</script>
