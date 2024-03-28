import CollectionsCreate from '../collections/create/CollectionsCreate'
import General from '../overview/general/General'
import ResourcesGeneral from '../resources/general/ResourcesGeneral'
import ResourcesManage from '../resources/manage/ResourcesManage'
import ResourcesUpload from '../resources/upload/ResourcesUpload'

export const pageMap = new Map([
  ['overview/general', <General />],
  ['resources/general', <ResourcesGeneral />],
  ['resources/upload', <ResourcesUpload />],
  ['resources/manage', <ResourcesManage />],
  ['collections/create', <CollectionsCreate />],
])
