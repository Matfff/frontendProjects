import Vue from 'vue'
import App from './App.vue'
import './assets/less/index.less'
// 完整引入element-ui
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// 按需引入
import {
  Button,
  Radio,
  Container,
  Main,
  Header,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Icon,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Switch,
  DatePicker,
  Option,
  Dialog,
  Pagination,
  MessageBox,
  Message
} from 'element-ui';
// 引入VueRouter
import VueRouter from 'vue-router'
// 引入路由器
import router from './router'
//
import store from './store'
import http from 'axios'
import '../api/mock.js'
// 关闭生产提示
Vue.config.productionTip = false
// Vue.use(ElementUI);
Vue.use(Button)
Vue.use(Radio)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Icon)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)
// 应用插件
Vue.use(VueRouter)

Vue.prototype.$http = http;
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

// 路由守卫
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  // 没有token或者不在登录页
  if(!token && to.name !== 'login'){
    next({ name: 'login'})
  } else if(token && to.name === 'login') {
    // 如果已经登录再去访问 login， 跳转到home
    next({ name: 'home' })
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
