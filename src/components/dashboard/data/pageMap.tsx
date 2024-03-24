import General from '../overview/general/General'
import ResourcesManage from '../resources/manage/ResourcesManage'
import ResourcesUpload from '../resources/upload/ResourcesUpload'

export const pageMap = new Map([
  ['overview/general', <General />],
  ['resources/upload', <ResourcesUpload />],
  ['resources/manage', <ResourcesManage />],
])
