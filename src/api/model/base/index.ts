export interface TenantVO {
  tenantId?: number
  creator?: string
  createTime?: Date
  updater?: string
  updateTime?: Date
}

export interface ResourceVO extends TenantVO {
  isActive: boolean
  status: string
  version: number
  publishedTime: Date
  deprecatedTime?: Date
}

export interface ConfigProperty {
  code:string
  name:string
  valType:string
  description?:string
}

export interface DataSourceLocation {
  id?: number
  name: string
  dataSourceId: number
  dataModelId: number
  location: Record<string, String>
}
