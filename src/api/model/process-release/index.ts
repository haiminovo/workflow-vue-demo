import request from '@/config/axios'

export interface ProcessReleaseVO {
  id: number
  processId: number
  code: string
  name: string
  description?: string
  bpmnXml?: string
  definition?: any
  nodes?: any[]
  edges?: any[]
  dataModels?: any[]
  dataSources?: any[]
  envs?: any[]
  status: string
  version: number
  publishedTime?: Date
  deprecatedTime?: Date
  tenantId?: number
  creator?: string
  createTime?: Date
  updater?: string
  updateTime?: Date
}

export interface ProcessReleaseDetailVO extends ProcessReleaseVO {
  // 可能包含更多详细信息
}

export interface ProcessReleasePageReqVO {
  page?: number
  size?: number
  code?: string
  name?: string
  status?: string
}

// 已发布流程分页查询
export const getProcessReleasePage = (params: ProcessReleasePageReqVO) => {
  return request.get({ url: '/model/process-release/page', params })
}

// 已发布流程详情
export const getProcessReleaseDetail = (id: number) => {
  return request.get({ url: `/model/process-release/detail?id=${id}` })
}

// 发布流程
export const publishProcessRelease = (id: number) => {
  return request.put({ url: `/model/process-release/publish?id=${id}` })
}

// 回撤流程
export const deprecateProcessRelease = (id: number) => {
  return request.put({ url: `/model/process-release/deprecate?id=${id}` })
}
