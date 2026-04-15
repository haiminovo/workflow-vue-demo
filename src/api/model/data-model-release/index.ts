import request from '@/config/axios'
import { ResourceVO, TenantVO } from '../base'
import { DataFieldDTO, DataConstraint, DataModelPageReqVO } from '../data-model'

export interface DataModelReleaseDTO extends ResourceVO{
  id: number
  modelId: number
  code: string
  name: string
  description?: string
  fields: DataFieldDTO[]
  constraints: DataConstraint[]
}

export interface DataModelReleaseVO extends ResourceVO{
  id: number
  modelId: number
  code: string
  name: string
  description?: string
  fields: DataFieldDTO[]
  constraints: DataConstraint[]
}

export interface DataModelReleaseDetailVO extends DataModelReleaseVO{
}

// 获取数据模型详情
export const getDataModelDetail = (releaseId: number): Promise<DataModelReleaseDetailVO> => {
  return request.get({ url: `/model/data-model-release/get?releaseId=${releaseId}` })
}


// 分页查询数据模型
export const getDataModelPage = (params: DataModelPageReqVO) => {
  return request.get({ url: '/model/data-model-release/page', params })
}


// 获取指定模型的所有发布版本
export const getDataModelList = (modelId: number) => {
  return request.get({ url: `/model/data-model-release/list?modelId=${modelId}`})
}


// 发布数据模型
export const publishDataModel = (releaseId: number) => {
  return request.put({ url: `/model/data-model-release/publish?releaseId=${releaseId}` })
}

// 发布数据模型
export const deprecateDataModel = (releaseId: number) => {
  return request.put({ url: `/model/data-model-release/deprecate?releaseId=${releaseId}` })
}