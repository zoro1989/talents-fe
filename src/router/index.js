import Vue from 'vue'
import Router from 'vue-router'
const PersonalData = resolve => require(['@/pages/personal-data'], resolve)
const InfoModify = resolve => require(['@/pages/info-modify'], resolve)
const PdwModify = resolve => require(['@/pages/pdw-modify'], resolve)
const MyPermission = resolve => require(['@/pages/my-permission'], resolve)
const MessagePush = resolve => require(['@/pages/message-push'], resolve)
const MemberList = resolve => require(['@/pages/member-list'], resolve)
const RoleList = resolve => require(['@/pages/role-list'], resolve)
const RoleAllocation = resolve => require(['@/pages/role-allocation'], resolve)
const PermissionList = resolve => require(['@/pages/permission-list'], resolve)
const PermissionAllocation = resolve => require(['@/pages/permission-allocation'], resolve)
const Login = resolve => require(['@/pages/login'], resolve)
const Register = resolve => require(['@/pages/register'], resolve)
const First = resolve => require(['@/pages/first'], resolve)
const TalentsSearch = resolve => require(['@/pages/talents-search'], resolve)
const TalentsSearchList = resolve => require(['@/pages/talents-search-list'], resolve)
const ProjectList = resolve => require(['@/pages/project-list'], resolve)
const DicList = resolve => require(['@/pages/dic-list'], resolve)
const ProjectAnalyze = resolve => require(['@/pages/project-analyze'], resolve)
const TalentsImport = resolve => require(['@/pages/talents-import'], resolve)
const CodeConvertor = resolve => require(['@/pages/code-convertor'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册'
      },
      component: Register
    },
    {
      path: '/first',
      name: 'first',
      meta: {
        title: '首页'
      },
      component: First,
      children: [
        {
          path: '/personal-data',
          name: 'personal-data',
          meta: {
            title: '个人资料'
          },
          component: PersonalData
        },
        {
          path: '/info-modify',
          name: 'info-modify',
          meta: {
            title: '资料修改'
          },
          component: InfoModify
        },
        {
          path: '/pdw-modify',
          name: 'pdw-modify',
          meta: {
            title: '密码修改'
          },
          component: PdwModify
        },
        {
          path: '/my-permission',
          name: 'my-permission',
          meta: {
            title: '我的权限'
          },
          component: MyPermission
        },
        {
          path: '/message-push',
          name: 'message-push',
          meta: {
            title: '消息推送'
          },
          component: MessagePush
        },
        {
          path: '/member-list',
          name: 'member-list',
          meta: {
            title: '用户列表'
          },
          component: MemberList
        },
        {
          path: '/role-list',
          name: 'role-list',
          meta: {
            title: '角色列表'
          },
          component: RoleList
        },
        {
          path: '/role-allocation',
          name: 'role-allocation',
          meta: {
            title: '角色分配'
          },
          component: RoleAllocation
        },
        {
          path: '/permission-list',
          name: 'permission-list',
          meta: {
            title: '权限列表'
          },
          component: PermissionList
        },
        {
          path: '/permission-allocation',
          name: 'permission-allocation',
          meta: {
            title: '权限分配'
          },
          component: PermissionAllocation
        },
        {
          path: '/talents-search',
          name: 'talents-search',
          meta: {
            title: '人才检索'
          },
          component: TalentsSearch
        },
        {
          path: '/talents-search-list',
          name: 'talents-search-list',
          meta: {
            title: '人才检索列表'
          },
          component: TalentsSearchList
        },
        {
          path: '/project-list',
          name: 'project-list',
          meta: {
            title: '项目列表'
          },
          component: ProjectList
        },
        {
          path: '/dic-list',
          name: 'dic-list',
          meta: {
            title: '字典列表'
          },
          component: DicList
        },
        {
          path: '/talents-import',
          name: 'talents-import',
          meta: {
            title: '人才导入'
          },
          component: TalentsImport
        },
        {
          path: '/project-analyze',
          name: 'project-analyze',
          meta: {
            title: '项目分析'
          },
          component: ProjectAnalyze
        },
        {
          path: '/code-convertor',
          name: 'code-convertor',
          meta: {
            title: '代码转换'
          },
          component: CodeConvertor
        }
      ]
    }
  ]
})
