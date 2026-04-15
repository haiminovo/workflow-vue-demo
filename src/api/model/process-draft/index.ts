import request from '@/config/axios'

export interface ProcessDraftSaveReqVO {
  id?: number
  code: string
  name: string
  description?: string
}

export interface ProcessDraftVO {
  id: number
  code: string
  name: string
  description?: string
  status: string
  version: number
  tenantId?: number
  creator?: string
  createTime?: Date
  updater?: string
  updateTime?: Date
}

export interface ProcessDraftDetailVO extends ProcessDraftVO {
  nodes?: any[]
  edges?: any[]
  dataModels?: any[]
  dataSources?: any[]
  envs?: any[]
}

export interface ProcessDraftPageReqVO {
  page?: number
  size?: number
  code?: string
  name?: string
  status?: string
}

// 创建流程
export const createProcessDraft = (data: ProcessDraftSaveReqVO) => {
  return request.post({ url: '/model/process-draft/create', data })
}

// 更新流程
export const updateProcessDraft = (data: ProcessDraftSaveReqVO) => {
  return request.put({ url: '/model/process-draft/update', data })
}

// 删除流程
export const deleteProcessDraft = (id: number) => {
  return request.delete({ url: `/model/process-draft/delete?id=${id}` })
}

// 获取流程详情
export const getProcessDraft = (id: number) => {
  return request.get({ url: `/model/process-draft/get?id=${id}` })
}

// 分页查询流程
export const getProcessDraftPage = (params: ProcessDraftPageReqVO) => {
  return request.get({ url: '/model/process-draft/page', params })
}

// 发布流程
export const publishProcessDraft = (id: number) => {
  return request.put({ url: `/model/process-draft/publish?id=${id}` })
}

// 检查编码是否存在
export const checkProcessDraftCodeExists = (code: string) => {
  return request.get({ url: `/model/process-draft/exists-by-code?code=${code}` })
}
