import { combineReducers } from 'redux'

import articleCurrent from './article-current'
import articleInitial from './article-initial'
import gid from './gid'
import labelExist from './label-exist'
import labelCurrent from './label-current'
import labelTyping from './label-typing'
import photoGroups from './photo-groups'
import photoVisible from './photo-visible'
import photos from './photos'
import type from './type'
import urlVisible from './url-visible'

const articleEditApp = combineReducers({
  articleCurrent,
  articleInitial,
  gid,
  labelExist,
  labelCurrent,
  labelTyping,
  photoGroups,
  photoVisible,
  photos,
  type,
  urlVisible
})

export default articleEditApp
