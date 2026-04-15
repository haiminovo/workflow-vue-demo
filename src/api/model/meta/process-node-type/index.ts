import request from '@/config/axios'
import { ConfigProperty, TenantVO } from '../../base'

export interface ProcessNodeTypeSaveReqVO {
  id?: number
  category?: string
  code: string
  name: string
  icon?:string
  version: string
  description?: string
  properties?: ConfigProperty[]
  required?: string[]
  builtIn: boolean
}

export interface ProcessNodeTypeVO extends TenantVO{
  id?: number
  category?: string
  code: string
  name: string
  icon?:string
  version: string
  description?: string
  properties?: ConfigProperty[]
  required?: string[]
  builtIn: boolean
}

// 创建流程节点类型
export const createProcessNodeType = (data: ProcessNodeTypeSaveReqVO) => {
  return request.post({ url: '/model/meta/process-node-type/create', data })
}

// 更新流程节点类型
export const updateProcessNodeType = (data: ProcessNodeTypeSaveReqVO) => {
  return request.put({ url: '/model/meta/process-node-type/update', data })
}

// 删除流程节点类型
export const deleteProcessNodeType = (id: number) => {
  return request.delete({ url: `/model/meta/process-node-type/delete?id=${id}` })
}

// 获取流程节点类型详情
export const getProcessNodeType = (id: number) => {
  return request.get({ url: `/model/meta/process-node-type/get?id=${id}` })
}

// 根据编码获取流程节点类型
export const getProcessNodeTypeByCode = (code: string) => {
  return request.get({ url: `/model/meta/process-node-type/get-by-code?code=${code}` })
}

// 查询所有流程节点类型
export const getAllProcessNodeTypes = () => {
  return request.get({ url: '/model/meta/process-node-type/all' })
}

// 根据类别查询流程节点类型
export const getProcessNodeTypesByCategory = (category: string) => {
  return request.get({ url: `/model/meta/process-node-type/by-category?category=${category}` })
}

// 发布流程节点类型
export const publishProcessNodeType = (id: number) => {
  return request.put({ url: `/model/meta/process-node-type/publish?id=${id}` })
}

// 弃用流程节点类型
export const deprecateProcessNodeType = (id: number) => {
  return request.put({ url: `/model/meta/process-node-type/deprecate?id=${id}` })
}

// 检查编码是否存在
export const checkProcessNodeTypeCodeExists = (code: string) => {
  return request.get({ url: `/model/meta/process-node-type/exists-by-code?code=${code}` })
}

// 检查名称是否存在
export const checkProcessNodeTypeNameExists = (name: string) => {
  return request.get({ url: `/model/meta/process-node-type/exists-by-name?name=${name}` })
}
