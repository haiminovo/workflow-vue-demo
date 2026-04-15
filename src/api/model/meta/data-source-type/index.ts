import request from '@/config/axios'
import {ConfigProperty, TenantVO} from '../../base'

export interface DataSourceTypeSaveReqVO {
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

export interface DataSourceTypeVO extends TenantVO{
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

export interface ValidationResult {
  valid: boolean
  message?: string
}

// 创建数据源类型
export const createDataSourceType = (data: DataSourceTypeSaveReqVO) => {
  return request.post({ url: '/model/meta/data-source-type/create', data })
}

// 更新数据源类型
export const updateDataSourceType = (data: DataSourceTypeSaveReqVO) => {
  return request.put({ url: '/model/meta/data-source-type/update', data })
}

// 删除数据源类型
export const deleteDataSourceType = (id: number) => {
  return request.delete({ url: `/model/meta/data-source-type/delete?id=${id}` })
}

// 获取数据源类型详情
export const getDataSourceType = (id: number) => {
  return request.get({ url: `/model/meta/data-source-type/get?id=${id}` })
}

// 根据编码获取数据源类型
export const getDataSourceTypeByCode = (code: string) => {
  return request.get({ url: `/model/meta/data-source-type/get-by-code?code=${code}` })
}

// 查询所有数据源类型
export const getAllDataSourceTypes = () => {
  return request.get({ url: '/model/meta/data-source-type/all' })
}

// 根据状态查询所有数据源类型
export const getAllDataSourceTypesByStatus = (status: string) => {
  return request.get({ url: `/model/meta/data-source-type/all-by-status?status=${status}` })
}

// 发布数据源类型
export const publishDataSourceType = (id: number) => {
  return request.put({ url: `/model/meta/data-source-type/publish?id=${id}` })
}

// 弃用数据源类型
export const deprecateDataSourceType = (id: number) => {
  return request.put({ url: `/model/meta/data-source-type/deprecate?id=${id}` })
}

// 验证数据源类型配置
export const validateDataSourceTypeConfig = (configValues: string, dataSourceTypeId?: number) => {
  return request.post({ 
    url: '/model/meta/data-source-type/validate-config', 
    params: { configValues, dataSourceTypeId } 
  })
}

// 检查编码是否存在
export const checkDataSourceTypeCodeExists = (code: string) => {
  return request.get({ url: `/model/meta/data-source-type/exists-by-code?code=${code}` })
}

// 检查名称是否存在
export const checkDataSourceTypeNameExists = (name: string) => {
  return request.get({ url: `/model/meta/data-source-type/exists-by-name?name=${name}` })
}
