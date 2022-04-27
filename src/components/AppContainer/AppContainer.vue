<template>
  <div class="app-container">
    <div ref="box" class="content-box" :style="{ height: `calc(100vh - ${surplusHeight}px)` }">
      <div
        ref="header"
        class="content-header"
        :style="{height: headerHeight === 'auto' ? headerHeight : headerHeight + 'px'}"
      ><slot name="header" /></div>
      <div ref="content" class="content-body">
        <template v-if="!native">
          <el-scrollbar wrap-class="scrollbar-wrapper">
            <slot name="default" />
          </el-scrollbar>
        </template>
        <template v-else>
          <slot name="default" />
        </template>
      </div>
      <div
        ref="footer"
        class="content-footer"
        :style="{height: footerHeight === 'auto' ? footerHeight : footerHeight + 'px'}"
      ><slot name="footer" /></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    headerHeight: {
      type: [Number, String],
      default: 'auto'
    },
    mainHeight: {
      type: [Number, String],
      default: 0
    },
    footerHeight: {
      type: [Number, String],
      default: 'auto'
    },
    surplusHeight: {
      type: [Number, String],
      default: 108
    },
    native: Boolean
  },
  mounted() {
    this.updateHeight()
  },
  methods: {
    updateHeight() {
      this.$nextTick(() => {
        const box = this.$refs.box
        const header = this.$refs.header
        const footer = this.$refs.footer
        // const bodyHeight = document.body.clientHeight
        const contentHeight = Math.ceil(box.offsetHeight - header.offsetHeight - footer.offsetHeight - (20 * 2)) - 1
        const content = this.$refs.content
        content.style['height'] = contentHeight + 'px'
        this.$emit('update:main-height', contentHeight)
        // 除去内容区外高度：119
      })
    }
  }
}
</script>
<style lang="scss">
.app-container {
  padding: 10px;
}

.content-box {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  // height: calc(100vh - 133px);
  display: flex;
  flex-direction: column;
  .content-header {
    .apply-query-form {
      display: flex;
    }
  }
  .content-body {
    flex-grow: 1;
    overflow-y: auto;
    & > .el-scrollbar {
      height: 100%;
      & > .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
  }
  & > .content-footer {
    // padding-top: 20px;
    display: flex;
    justify-content: center;
    .el-pagination {
      margin-top: 20px;
    }
    &.is-top-border {
      border-top: 1px solid #EBEEF5;
    }
  }
}
</style>
