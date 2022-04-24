
<template>
  <div>
    <el-descriptions class="margin-top" :column="3" :colon="false">
      <el-descriptions-item
        v-for="item in list"
        :key="item.id"
      >
        <el-checkbox>

          {{ item.menuName }}
        </el-checkbox>
      </el-descriptions-item>
      <!-- <el-descriptions-item>18100000000</el-descriptions-item>
      <el-descriptions-item>苏州市</el-descriptions-item>
      <el-descriptions-item>江苏省苏州</el-descriptions-item>
      <el-descriptions-item>kooriookami</el-descriptions-item>
      <el-descriptions-item>18100000000</el-descriptions-item>
      <el-descriptions-item>苏州市</el-descriptions-item>
      <el-descriptions-item>江苏省苏州</el-descriptions-item> -->
    </el-descriptions>
  </div>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  data() {
    return {
      list: [
        { id: 1, menuName: 'qqqq' },
        { id: 2, menuName: 'qqqq' },
        { id: 3, menuName: 'qqqq' },
        { id: 4, menuName: 'qqqq' },
        { id: 1, menuName: 'qqqq' },
        { id: 2, menuName: 'qqqq' },
        { id: 3, menuName: 'qqqq' },
        { id: 4, menuName: 'qqqq' }
      ]
    }
  }
}
</script>

<style>
  .my-label {
    background: #E1F3D8;
  }

  .my-content {
    background: #FDE2E2;
  }
</style>
