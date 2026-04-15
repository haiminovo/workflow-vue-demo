import request from '@/config/axios'
import { DataSourceLocation, ResourceVO, TenantVO } from '../base'

export interface DataSourceSaveReqVO {
  id?: number
  groupId?: number
  dataSourceTypeId: number
  code: string
  name: string
  description?: string
  configValues?: Record<string, string>
  locations?: DataSourceLocation[]
}

export interface DataSourceVO extends  TenantVO {
  id: number
  groupId?: number
  dataSourceTypeId: number
  code: string
  name: string
  description?: string
  configValues?: Record<string, string>
  locations?: DataSourceLocation[]
  version: number
}

export interface DataSourcePageReqVO extends PageParam{
  keyword?: string
  groupId?: number
  dataSourceTypeId?: number
  status?: string
  startTime?: Date
  endTime?: Date
}

export interface DataSourceListReqVO {
  keyword?: string
  groupId?: number
  dataSourceTypeId?: number
  status?: string
  startTime?: Date
  endTime?: Date
}

export interface ConnectionTestResult {
  success: boolean
  message?: string
}

export interface ValidationResult {
  valid: boolean
  message?: string
}

// 创建数据源
export const createDataSource = (data: DataSourceSaveReqVO) => {
  return request.post({ url: '/model/data-source/create', data })
}

// 更新数据源
export const updateDataSource = (data: DataSourceSaveReqVO) => {
  return request.put({ url: '/model/data-source/update', data })
}

// 删除数据源
export const deleteDataSource = (id: number) => {
  return request.delete({ url: `/model/data-source/delete?id=${id}` })
}

// 获取数据源详情
export const getDataSource = (id: number) => {
  return request.get({ url: `/model/data-source/get?id=${id}` })
}

// 根据编码获取数据源
export const getDataSourceByCode = (code: string) => {
  return request.get({ url: `/model/data-source/get-by-code?code=${code}` })
}

// 分页查询数据源
export const getDataSourcePage = (params: DataSourcePageReqVO) => {
  return request.get({ url: '/model/data-source/page', params })
}

// 列表查询数据源
export const getDataSourceList = (params: DataSourceListReqVO) => {
  return request.get({ url: '/model/data-source/list', params })
}

// 发布数据源
export const publishDataSource = (id: number) => {
  return request.put({ url: `/model/data-source/publish?id=${id}` })
}

// 弃用数据源
export const deprecateDataSource = (releaseId: number) => {
  return request.put({ url: `/model/data-source/deprecate?releaseId=${releaseId}` })
}

// 测试数据源连接
export const testDataSourceConnection = (id: number) => {
  return request.get({ url: `/model/data-source/test-connection?id=${id}` })
}

// 验证数据源配置
export const validateDataSourceConfig = (configValues: string, dataSourceTypeId: number) => {
  return request.post({ 
    url: '/model/data-source/validate-config', 
    params: { configValues, dataSourceTypeId } 
  })
}

// 检查编码是否存在
export const checkDataSourceCodeExists = (code: string) => {
  return request.get({ url: `/model/data-source/exists-by-code?code=${code}` })
}

// 检查名称是否存在
export const checkDataSourceNameExists = (name: string) => {
  return request.get({ url: `/model/data-source/exists-by-name?name=${name}` })
}



// 创建数据源定位
export const createDataSourceLocation = (data: DataSourceLocation) => {
  return request.post({ url: '/model/data-source/location/create', data })
}

// 更新数据源定位
export const updateDataSourceLocation = (data: DataSourceLocation) => {
  return request.put({ url: '/model/data-source/location/update', data })
}

// 删除数据源定位
export const deleteDataSourceLocation = (locationId: number) => {
  return request.delete({ url: `/model/data-source/location/delete?locationId=${locationId}` })
}

// 根据数据源ID获取数据源定位列表
export const getLocationsByDataSource = (id: number) => {
  return request.get({ url: `/model/data-source/location/getLocationsByDataSource?id=${id}` })
}
