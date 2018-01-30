/**
 * Created by zhulin on 2017/7/9.
 */
const uris = {
  welcome: {
    userinfo: '/welcome/userinfo.tkm',
    updateSelf: '/welcome/updateSelf.tkm',
    updatePswd: '/welcome/updatePswd.tkm'
  },
  user: {
    logout: '/user/logout.tkm',
    submitLogin: '/user/submitLogin.tkm',
    subRegister: '/user/subRegister.tkm'
  },
  member: {
    list: '/member/list.tkm',
    deleteUserById: '/member/deleteUserById.tkm',
    forbidUserById: '/member/forbidUserById.tkm'
  },
  push: {
    send: '/push/send.tkm'
  },
  role: {
    getPermissionTree: '/role/getPermissionTree.tkm',
    clearRoleByUserIds: '/role/clearRoleByUserIds.tkm',
    allocation: '/role/allocation.tkm',
    selectRoleByUserId: '/role/selectRoleByUserId.tkm',
    addRole2User: '/role/addRole2User.tkm',
    index: '/role/index.tkm',
    deleteRoleById: '/role/deleteRoleById.tkm',
    addRole: '/role/addRole.tkm'
  },
  permission: {
    index: '/permission/index.tkm',
    allocation: '/permission/allocation.tkm',
    selectPermissionById: '/permission/selectPermissionById.tkm',
    addPermission2Role: '/permission/addPermission2Role.tkm',
    deletePermissionById: '/permission/deletePermissionById.tkm',
    addPermission: '/permission/addPermission.tkm',
    clearPermissionByRoleIds: '/permission/clearPermissionByRoleIds.tkm'
  },
  common: {
    getVCode: '/common/getVCode.tkm'
  },
  staff: {
    index: '/staff/index.tkm',
    search: '/staff/search.tkm',
    selectInfoById: '/staff/selectInfoById.tkm',
    save: '/staff/save.tkm'
  },
  project: {
    index: '/project/index.tkm',
    deleteProjectById: '/project/deleteProjectById.tkm',
    save: '/project/save.tkm',
    selectProjectById: '/project/selectProjectById.tkm',
    selectProjectParents: '/project/selectProjectParents.tkm',
    selectChartBgData: '/project/selectChartBgData.tkm',
    getChartPieData: '/project/getChartPieData.tkm'
  },
  dic: {
    index: '/dic/index.tkm',
    deleteDicById: '/dic/deleteDicById.tkm',
    save: '/dic/save.tkm',
    selectDicById: '/dic/selectDicById.tkm',
    selectDicParents: '/dic/selectDicParents.tkm'
  }
}
export default uris
