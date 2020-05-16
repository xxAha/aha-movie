import Vue from 'vue'
import {
  Message,
  Form,
  FormItem,
  Button,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Container,
  Aside,
  Header,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Avatar,
  Main,
  Input,
  Table,
  TableColumn,
  Image,
  Link,
  Tag,
  MessageBox,
  Dialog,
  Transfer,
  Loading,
  Popconfirm,
  Popover,
} from 'element-ui'

Vue.use(Popover)
Vue.use(Popconfirm)
Vue.use(Loading)
Vue.use(Transfer)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Link)
Vue.use(Image)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Avatar)
Vue.use(Main)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
Vue.use(Header)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(MenuItem)

Vue.prototype.$message = Message
Vue.prototype.$messageBox = MessageBox
