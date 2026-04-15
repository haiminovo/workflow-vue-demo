import request from '@/config/axios'

export interface ProcessInstanceVO {
  id: number
  processId: number
  processName: string
  businessKey: string
  status: string
  startTime?: Date
  endTime?: Date
  tenantId?: number
  creator?: string
  createTime?: Date
  updater?: string
  updateTime?: Date
}

export interface ProcessInstanceDetailVO extends ProcessInstanceVO {
  currentNode?: any
  variables?: Record<string, any>
  logs?: any[]
}

export interface ProcessInstancePageReqVO {
  page?: number
  size?: number
  processId?: number
  processName?: string
  businessKey?: string
  status?: string
  startTime?: string
  endTime?: string
}

// 流程实例分页查询
export const getProcessInstancePage = (params: ProcessInstancePageReqVO) => {
  return request.post({ url: '/model/process-instance/page', data: params })
}

// 流程实例详情
export const getProcessInstanceDetail = (id: number) => {
  return request.get({ url: `/model/process-instance/detail?id=${id}` })
}
