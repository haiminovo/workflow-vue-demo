import request from '@/config/axios'
import { TenantVO } from '../base'

export interface ResourceGroupSaveReqVO {
  id?: number
  parentId?: number
  code: string
  name: string
  icon?: string
  description?: string
}

export interface ResourceGroupVO extends ResourceGroupSaveReqVO, TenantVO {
  id: number
  treePath?: string
}

// 创建资源分组
export const createResourceGroup = (data: ResourceGroupSaveReqVO) => {
  return request.post({ url: '/model/resource-group/create', data })
}

// 更新资源分组
export const updateResourceGroup = (data: ResourceGroupSaveReqVO) => {
  return request.put({ url: '/model/resource-group/update', data })
}

// 删除资源分组
export const deleteResourceGroup = (id: number) => {
  return request.delete({ url: `/model/resource-group/delete?id=${id}` })
}

// 获取资源分组详情
export const getResourceGroup = (id: number) => {
  return request.get({ url: `/model/resource-group/get?id=${id}` })
}

// 根据编码获取资源分组
export const getResourceGroupByCode = (code: string) => {
  return request.get({ url: `/model/resource-group/get-by-code?code=${code}` })
}

// 查询所有资源分组
export const getAllResourceGroups = () => {
  return request.get({ url: '/model/resource-group/all' })
}

// 根据父级 ID 查询资源分组
export const getResourceGroupsByParentId = (parentId: number) => {
  return request.get({ url: `/model/resource-group/by-parent-id?parentId=${parentId}` })
}

// 检查编码是否存在
export const checkResourceGroupCodeExists = (code: string) => {
  return request.get({ url: `/model/resource-group/exists-by-code?code=${code}` })
}

// 检查名称是否存在
export const checkResourceGroupNameExists = (name: string) => {
  return request.get({ url: `/model/resource-group/exists-by-name?name=${name}` })
}
