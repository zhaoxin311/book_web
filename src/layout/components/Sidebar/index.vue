<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar',
    ]),
    // routes() {
    //   return this.$router.options.routes
    // },
    routes() {
      const routes = this.$router.options.routes
      // const role = JSON.parse(localStorage.getItem('data'))
      const role = localStorage.getItem('roles')

      // 递归处理
      function dispose(routes) {
        for (let i = 0; i < routes.length; i++) {
          // if (routes[i].hidden) continue
          // if (routes[i].meta === undefined) continue
          if (routes[i].meta?.roles) {
            const flag = routes[i].meta.roles.includes(role)
            if (!flag) routes[i].hidden = true
          }
          if (routes[i].children) {
            dispose(routes[i].children)
          }
        }
      }
      dispose(routes)
      return routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
