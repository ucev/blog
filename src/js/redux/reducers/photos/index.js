import { combineReducers } from 'redux'

import gid from './gid'
import groupAddVisible from './group-add-visible'
import groupOpeImgVisible from './group-ope-img-visible'
import groups from './groups'
import key from './key'
import pfobDelVisible from './pfob-del-visible'
import pfobMoveVisible from './pfob-move-visible'
import photos from './photos'

const photosApp = combineReducers({
  gid,
  groupAddVisible,
  groupOpeImgVisible,
  groups,
  key,
  pfobDelVisible,
  pfobMoveVisible,
  photos,
})

export default photosApp
