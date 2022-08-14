<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <h3>{{isCollapse ? '后台' : '通用后台管理系统'}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <!-- 二级菜单 -->
    <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.path">
        <template slot="title">
            <i :class="'el-icon-' + item.icon"></i>
            <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
            <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{subItem.label}}</el-menu-item>
        </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
        // 控制是否展开
      // isCollapse: false,
      menu: [
        // {
        //     path:'/',
        //     name:'home',
        //     label:'首页',
        //     icon:'s-home',
        //     url:'Home.vue',
        // },
        // {
        //     path:'/user',
        //     name:'user',
        //     label:'用户管理',
        //     icon:'user',
        //     url:'User.vue',
        // },
        // {
        //     path:'/mall',
        //     name:'mall',
        //     label:'商品管理',
        //     icon:'video-play',
        //     url:'Mall.vue',
        // },
        // {
        //     label:'其他',
        //     icon:'location',
        //     path:'/other',
        //     children:[
        //         {
        //             path:'/pageone',
        //             name:'pageone',
        //             label:'页面1',
        //             icon:'setting',
        //             url:'Other/PageOne.vue'
        //         },
        //         {
        //             path:'/pagetwo',
        //             name:'pagetwo',
        //             label:'页面2',
        //             icon:'setting',
        //             url:'Other/PageTwo.vue'
        //         }
        //     ]
        // }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    clickMenu(item) {
        this.$router.push({
            name: item.name
        })
        this.$store.commit('selectMenu', item)
    }
  },
  computed: {
    noChildren() {
        return this.asyncMenu.filter(item => !item.children)
    },
    hasChildren() {
        return this.asyncMenu.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    asyncMenu() {
      return this.$store.state.tab.menu
    }
  }
};
</script>

<style lang="less" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    }
    .el-menu {
        height: 100%;
        border:none;
        h3 {
            color: #fff;
            text-align: center;
            line-height: 48px;
        }
    }
</style>