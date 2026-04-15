import request from '@/config/axios'

// 节点相关接口
export interface ProcessNodeSaveReqVO {
  id?: number
  name: string
  processId: number
  processNodeTypeId: number
  positionX?: number
  positionY?: number
  configValues?: Record<string, string>
}

export interface ProcessNodeVO {
  id: number
  name: string
  processId: number
  processNodeTypeId: number
  positionX?: number
  positionY?: number
  configValues?: Record<string, string>
  tenantId?: number
  creator?: string
  createTime?: Date
  updater?: string
  updateTime?: Date
}

// 边（连线）相关接口
export interface ProcessEdgeSaveReqVO {
  id?: number
  name: string
  processId: number
  sourceNodeId: number
  targetNodeId: number
}

export interface ProcessEdgeVO {
  id: number
  name: string
  processId: number
  sourceNodeId: number
  targetNodeId: number
  tenantId?: number
  creator?: string
  createTime?: Date
  updater?: string
  updateTime?: Date
}

// 流程环境相关接口
export interface ProcessEnvSaveReqVO {
  id?: number
  processId: number
  envType: string
  name: string
  value: string
  description?: string
}

export interface ProcessEnvVO {
  id: number
  processId: number
  envType: string
  name: string
  value: string
  description?: string
  tenantId?: number
  creator?: string
  createTime?: Date
  updater?: string
  updateTime?: Date
}

// 流程数据模型相关接口
export interface ProcessDataModelSaveReqVO {
  id?: number
  processId: number
  dataModelId: number
  alias?: string
}

export interface ProcessDataModelVO {
  id: number
  processId: number
  dataModelId: number
  alias?: string
  tenantId?: number
  creator?: string
  createTime?: Date
  updater?: string
  updateTime?: Date
}

// 流程数据源相关接口
export interface ProcessDataSourceSaveReqVO {
  id?: number
  processId: number
  dataSourceId: number
  alias?: string
}

export interface ProcessDataSourceVO {
  id: number
  processId: number
  dataSourceId: number
  alias?: string
  tenantId?: number
  creator?: string
  createTime?: Date
  updater?: string
  updateTime?: Date
}

// 节点相关操作
// 创建流程节点
export const createProcessNode = (data: ProcessNodeSaveReqVO) => {
  return request.post({ url: '/model/process-editor/node/create', data })
}

// 更新流程节点
export const updateProcessNode = (data: ProcessNodeSaveReqVO) => {
  return request.put({ url: '/model/process-editor/node/update', data })
}

// 删除流程节点
export const deleteProcessNode = (nodeId: number) => {
  return request.delete({ url: `/model/process-editor/node/delete?nodeId=${nodeId}` })
}

// 获取流程节点详情
export const getProcessNode = (nodeId: number) => {
  return request.get({ url: `/model/process-editor/node/get?nodeId=${nodeId}` })
}

// 边（连线）相关操作
// 创建流程连线
export const createProcessEdge = (data: ProcessEdgeSaveReqVO) => {
  return request.post({ url: '/model/process-editor/edge/create', data })
}

// 更新流程连线
export const updateProcessEdge = (data: ProcessEdgeSaveReqVO) => {
  return request.put({ url: '/model/process-editor/edge/update', data })
}

// 删除流程连线
export const deleteProcessEdge = (edgeId: number) => {
  return request.delete({ url: `/model/process-editor/edge/delete?edgeId=${edgeId}` })
}

// 获取流程连线详情
export const getProcessEdge = (edgeId: number) => {
  return request.get({ url: `/model/process-editor/edge/get?edgeId=${edgeId}` })
}

// 流程环境相关操作
// 创建流程环境
export const createProcessEnv = (data: ProcessEnvSaveReqVO) => {
  return request.post({ url: '/model/process-editor/env/create', data })
}

// 更新流程环境
export const updateProcessEnv = (data: ProcessEnvSaveReqVO) => {
  return request.put({ url: '/model/process-editor/env/update', data })
}

// 删除流程环境
export const deleteProcessEnv = (envId: number) => {
  return request.delete({ url: `/model/process-editor/env/delete?envId=${envId}` })
}

// 获取流程环境详情
export const getProcessEnv = (envId: number) => {
  return request.get({ url: `/model/process-editor/env/get?envId=${envId}` })
}

// 流程数据模型相关操作
// 创建流程数据模型
export const createProcessDataModel = (data: ProcessDataModelSaveReqVO) => {
  return request.post({ url: '/model/process-editor/data-model/create', data })
}

// 更新流程数据模型
export const updateProcessDataModel = (data: ProcessDataModelSaveReqVO) => {
  return request.put({ url: '/model/process-editor/data-model/update', data })
}

// 删除流程数据模型
export const deleteProcessDataModel = (modelId: number) => {
  return request.delete({ url: `/model/process-editor/data-model/delete?modelId=${modelId}` })
}

// 获取流程数据模型详情
export const getProcessDataModel = (modelId: number) => {
  return request.get({ url: `/model/process-editor/data-model/get?modelId=${modelId}` })
}

// 流程数据源相关操作
// 创建流程数据源
export const createProcessDataSource = (data: ProcessDataSourceSaveReqVO) => {
  return request.post({ url: '/model/process-editor/data-source/create', data })
}

// 更新流程数据源
export const updateProcessDataSource = (data: ProcessDataSourceSaveReqVO) => {
  return request.put({ url: '/model/process-editor/data-source/update', data })
}

// 删除流程数据源
export const deleteProcessDataSource = (sourceId: number) => {
  return request.delete({ url: `/model/process-editor/data-source/delete?sourceId=${sourceId}` })
}

// 获取流程数据源详情
export const getProcessDataSource = (sourceId: number) => {
  return request.get({ url: `/model/process-editor/data-source/get?sourceId=${sourceId}` })
}
