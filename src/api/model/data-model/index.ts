import request from '@/config/axios'
import { TenantVO } from '../base'

export interface DataFieldDTO extends TenantVO {
  id?: number
  fieldTypeId: number
  fieldTypeCode: string
  fieldTypeName: string
  modelId: number
  code: string
  name: string
  description?: string
  configValues?: Record<string, any>
}

export interface DataConstraint {
  type: string
  name: string
  fields: string[]
}

export interface DataModelSaveReqVO {
  id?: number
  groupId?: number
  code: string
  name: string
  description?: string
  fields?: DataFieldDTO[]
  constraints?: DataConstraint[]
}

export interface DataModelVO extends TenantVO{
  id: number
  groupId?: number
  code: string
  name: string
  version?: number
  description?: string
  fields?: DataFieldDTO[]
  constraints?: DataConstraint[]
}

export interface DataModelPageReqVO extends PageParam{
  keyword?: string
  groupId?: number
  status?: string
  startTime?: Date
  endTime?: Date
}

export interface DataModelListReqVO {
  keyword?: string
  groupId?: number
  status?: string
  startTime?: Date
  endTime?: Date
}

export interface DataFieldSaveReqVO {
  id?: number
  fieldTypeId: number
  modelId: number
  code: string
  name: string
  description?: string
  configValues?: Record<string, string>
}

export interface DataConstraintSaveReqVO extends DataConstraint {
  modelId: number
}

export interface DataConstraintDeleteReqVO {
  modelId: number
  name: string
}

// 创建数据模型
export const createDataModel = (data: DataModelSaveReqVO) => {
  return request.post({ url: '/model/data-model/create', data })
}

// 更新数据模型
export const updateDataModel = (data: DataModelSaveReqVO) => {
  return request.put({ url: '/model/data-model/update', data })
}

// 删除数据模型
export const deleteDataModel = (id: number) => {
  return request.delete({ url: `/model/data-model/delete?id=${id}` })
}

// 获取数据模型详情
export const getDataModel = (id: number) => {
  return request.get({ url: `/model/data-model/get?id=${id}` })
}

// 根据编码获取数据模型
export const getDataModelByCode = (code: string) => {
  return request.get({ url: `/model/data-model/get-by-code?code=${code}` })
}

// 分页查询数据模型
export const getDataModelPage = (params: DataModelPageReqVO) => {
  return request.get({ url: '/model/data-model/page', params })
}

// 查询所有数据模型
export const getAllDataModels = () => {
  return request.get({ url: '/model/data-model/all' })
}

// 列表查询数据模型
export const getDataModelList = (params: DataModelListReqVO) => {
  return request.get({ url: '/model/data-model/list', params })
}

// 发布数据模型
export const publishDataModel = (id: number) => {
  return request.put({ url: `/model/data-model/publish?id=${id}` })
}

// 检查编码是否存在
export const checkDataModelCodeExists = (code: string) => {
  return request.get({ url: `/model/data-model/exists-by-code?code=${code}` })
}

// 检查名称是否存在
export const checkDataModelNameExists = (name: string) => {
  return request.get({ url: `/model/data-model/exists-by-name?name=${name}` })
}

// 增加字段
export const addField = (data: DataFieldSaveReqVO) => {
  return request.post({ url: '/model/data-model/addField', data })
}

// 更新字段
export const updateField = (data: DataFieldSaveReqVO) => {
  return request.put({ url: '/model/data-model/updateField', data })
}

// 删除字段
export const deleteField = (fieldId: number) => {
  return request.delete({ url: `/model/data-model/deleteField?fieldId=${fieldId}` })
}



// 增加约束
export const addConstraint = (data: DataConstraintSaveReqVO) => {
  return request.post({ url: '/model/data-model/addConstraint', data })
}

// 更新约束
export const updateConstraint = (data: DataConstraintSaveReqVO) => {
  return request.put({ url: '/model/data-model/updateConstraint', data })
}

// 删除约束
export const deleteConstraint = (data: DataConstraintDeleteReqVO) => {
  return request.delete({ url: `/model/data-model/deleteConstraint` })
}
