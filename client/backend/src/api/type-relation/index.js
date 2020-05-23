import Axios from '../index'

//创建分类关系
export const createTypeRelation = function (typeId, resourceId) {
  return Axios({
    method: 'post',
    url: '/api/type-relation',
    data: {
      typeId,
      resourceId
    }
  })
}


//删除某资源的分类关系
export const deleteTypeRelationAPI = function(typeId, resourceId) {
  return Axios({
    method: 'delete',
    url: `/api/type-relation`,
    data: {
      typeId,
      resourceId
    }
  })
}