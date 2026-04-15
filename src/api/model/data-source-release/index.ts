import request from '@/config/axios'
import { DataSourceLocation, ResourceVO } from '../base'

export interface DataSourceReleaseDTO {
  id: number
  dataSourceId: number
  code: string
  name: string
  description?: string
  configValues: Record<string, string>
  locations?: DataSourceLocation[]
  version: number
  status: string
  publishedTime?: Date
  deprecatedTime?: Date
  tenantId?: number
  creator?: string
  createTime?: Date
  updater?: string
  updateTime?: Date
}

export interface DataSourceReleaseVO extends ResourceVO{
  id: number
  dataSourceId: number
  code: string
  name: string
  description?: string
  configValues?: Record<string, string>
  locations?: DataSourceLocation[]
}

export interface DataSourceReleaseDetailVO extends DataSourceReleaseVO{
}

export interface DataSourcePageReqVO extends PageParam{
  keyword?: string
  groupId?: number
  dataSourceTypeId?: number
  status?: string
  startTime?: Date
  endTime?: Date
}

// 获取已发布数据源详情
export const getDataSourceRelease = (id: number) => {
  return request.get({ url: `/model/data-source-release/get?id=${id}` })
}

// 分页查询已发布数据源
export const getDataSourceReleasePage = (params: DataSourcePageReqVO) => {
  return request.get({ url: '/model/data-source-release/page', params })
}

// 根据数据源ID获取已发布数据源的所有版本
export const getDataSourceReleaseList = (sourceId: number) => {
  return request.get({ url: `/model/data-source-release/list?sourceId=${sourceId}` })
}

// 发布数据源
export const publishDataSourceRelease = (releaseId: number) => {
  return request.put({ url: `/model/data-source-release/publish?releaseId=${releaseId}` })
}

// 弃用数据源
export const deprecateDataSourceRelease = (releaseId: number) => {
  return request.put({ url: `/model/data-source-release/deprecate?releaseId=${releaseId}` })
}
