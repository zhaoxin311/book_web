<template>
  <div class="bigScreen">
    <div class="clock">

      <Clock></Clock>
    </div>
  </div>
</template>
<script>
import Clock from "./components/clock/index.vue";
export default {
  components: {
    Clock,
  },
  data() {
    return {};
  },

  mounted() {
    this.getEcharts();
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.bigScreen {
  min-height: 100%;
  width: 100%;
  background: #fff;
  // background: #282c34;
  // background: url(../../assets/img/screenbg.png) no-repeat;
  // background-size: cover;
  overflow: hidden;
}
.clock {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>