/**
 * @description 失败信息集合，包括 errno 和 message
 */

module.exports = {
  // 用户名已存在
  registerUserNameExistInfo: {
    errno: 10001,
    message: '用户名已存在'
  },
  // 注册失败
  registerFailInfo: {
    errno: 10002,
    message: '注册失败，请重试'
  },
  // 用户名不存在
  registerUserNameNotExistInfo: {
    errno: 10003,
    message: '用户名未存在'
  },
  // 登录失败
  loginFailInfo: {
    errno: 10004,
    message: '登录失败，用户名或密码错误'
  },
  // 未登录
  loginCheckFailInfo: {
    errno: 10005,
    message: '您尚未登录'
  },
  // 修改密码失败
  changePasswordFailInfo: {
    errno: 10006,
    message: '修改密码失败，请重试'
  },
  // 上传文件过大
  uploadFileSizeFailInfo: {
    errno: 10007,
    message: '上传文件尺寸过大'
  },
  // 上传文件过大
  uploadFileFailInfo: {
    errno: 10008,
    message: '上传文件尺寸过大'
  },
  // 创建分类失败
  createTyepFailInfo: {
    errno: 10009,
    message: '创建分类失败'
  },
  // 角色权限不够
  roleCheckFailInfo: {
    errno: 10010,
    message: '角色权限不够'
  },
  // token 验证失败
  TokenValidationFailInfo: {
    errno: 10011,
    message: 'token 验证失败'
  },
  // 创建资源失败
  createResourceFailInfo: {
    errno: 10012,
    message: '创建资源失败'
  },
  // 创建资源失败
  createTagFailInfo: {
    errno: 10013,
    message: '标签创建失败'
  },
  // 查询分类失败
  getTypesFailInfo: {
    errno: 10014,
    message: '查询分类失败'
  },
  // 分类关系创建失败
  createTypeRelationFailInfo: {
    errno: 10015,
    message: '分类关系创建失败'
  },
  // 查询资源分类信息失败
  getTypeRelationFailInfo: {
    errno: 10016,
    message: '查询资源分类信息失败'
  },
  // 查询某个资源信息失败
  getResourceFailInfo: {
    errno: 10017,
    message: '查询某个资源信息失败'
  },
  // 查询所有资源信息失败
  getAllResourceFailInfo: {
    errno: 10018,
    message: '查询所有资源信息失败'
  },
  // 删除标签失败
  deleteTagFailInfo: {
    errno: 10019,
    message: '删除标签失败'
  },
  // 删除分类关系失败
  deleteTypeRelationFailInfo: {
    errno: 10020,
    message: '删除分类关系失败'
  },
  // 删除资源失败
  deleteResourceFailInfo: {
    errno: 10021,
    message: '删除资源失败'
  },
  // 修改资源失败
  updateResourceFailInfo: {
    errno: 10022,
    message: '修改资源失败'
  },
  // 查询分类信息失败
  getTypeFailInfo: {
    errno: 10023,
    message: '查询分类信息失败'
  },
  // 修改分类失败
  updateTypeFailInfo: {
    errno: 10024,
    message: '修改分类失败'
  },
  // 删除分类失败
  deleteTypeFailInfo: {
    errno: 10025,
    message: '删除分类失败'
  },
  // 获取网站设置失败
  getSettingFailInfo: {
    errno: 10026,
    message: '获取网站设置失败'
  },
  // 修改网站设置失败
  updateSettingFailInfo: {
    errno: 10027,
    message: '修改网站设置失败'
  },
  // 修改密码失败
  updatePasswordFailInfo: {
    errno: 10028,
    message: '修改密码失败'
  },
}