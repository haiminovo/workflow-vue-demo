import request from '@/config/axios'
import {ConfigProperty,TenantVO } from '../../base'

export interface DataFieldTypeSaveReqVO {
  id?: number
  baseType: string
  code: string
  name: string
  icon?:string
  version: string
  description?: string
  properties?: ConfigProperty[]
  required?: string[]
  builtIn: boolean
}

export interface DataFieldTypeVO extends DataFieldTypeSaveReqVO, TenantVO {
  status?: string
}

export interface ValidationResult {
  valid: boolean
  message?: string
}

// 创建字段类型
export const createDataFieldType = (data: DataFieldTypeSaveReqVO) => {
  return request.post({ url: '/model/meta/data-field-type/create', data })
}

// 更新字段类型
export const updateDataFieldType = (data: DataFieldTypeSaveReqVO) => {
  return request.put({ url: '/model/meta/data-field-type/update', data })
}

// 删除字段类型
export const deleteDataFieldType = (id: number) => {
  return request.delete({ url: `/model/meta/data-field-type/delete?id=${id}` })
}

// 获取字段类型详情
export const getDataFieldType = (id: number) => {
  return request.get({ url: `/model/meta/data-field-type/get?id=${id}` })
}

// 根据编码获取字段类型
export const getDataFieldTypeByCode = (code: string) => {
  return request.get({ url: `/model/meta/data-field-type/get-by-code?code=${code}` })
}

// 查询所有字段类型
export const getAllDataFieldTypes = () => {
  return request.get({ url: '/model/meta/data-field-type/all' })
}

// 发布字段类型
export const publishDataFieldType = (id: number) => {
  return request.put({ url: `/model/meta/data-field-type/publish?id=${id}` })
}

// 弃用字段类型
export const deprecateDataFieldType = (id: number) => {
  return request.put({ url: `/model/meta/data-field-type/deprecate?id=${id}` })
}

// 验证字段配置
export const validateDataFieldConfig = (configValues: string, fieldTypeId: number) => {
  return request.post({ 
    url: '/model/meta/data-field-type/validate-config', 
    params: { configValues, fieldTypeId } 
  })
}

// 检查编码是否存在
export const checkDataFieldTypeCodeExists = (code: string) => {
  return request.get({ url: `/model/meta/data-field-type/exists-by-code?code=${code}` })
}

// 检查名称是否存在
export const checkDataFieldTypeNameExists = (name: string) => {
  return request.get({ url: `/model/meta/data-field-type/exists-by-name?name=${name}` })
}
