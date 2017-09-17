const React = require('react')
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'

const InputDialog = require("../../components/dialogs/input_dialog.js")
const PhotoGroupItem = require('./photo-group-item')
import {
  groupAddCancel,
  groupAddConfirm,
  groupOpeImgStateToggle,
  groupShowAddDialog
} from '../../redux/actions/photos'

const PhotoGroupBar = ({ addVisible, opeImgVisible, gid, groupAddCancel, groupAddConfirm,
   groupOpeImgStateToggle, groupShowAddDialog }) => {

    var opebarImg = opeImgVisible ? '/images/icons/ic_cancel_black_24dp_2x.png' : '/images/icons/ic_arrow_drop_down_circle_black_24dp_2x.png';
    var groupItems = groups.map(group => 
      <PhotoGroupItem key={group.id} group={group} gid={gid} opeImgVisible={opeImgVisible} />
    );
    var key = new Date().getTime();
    return (
      <div id='photo-group-div'>
        <div className='photo-group-operation-bar'>
          <div id='add-new-photo-group-div' onClick={groupShowAddDialog}>新建分组</div>
          <InputDialog title='新建分组' centerScreen={false} visible={addVisible} confirm={groupAddConfirm} cancel={groupAddCancel} />
        </div>
        <div className='photo-group-operation-bar'>
          <div id='photo-group-opebar-title-div' >图片组</div>
          <img id='photo-group-opebar-img' src={opebarImg} onClick={groupOpeImgStateToggle} />
        </div>
        <ul id='photo-group-items-ul'>
          {groupItems}
        </ul>
      </div>
    )
}

const mapStateToProps = (state) => ({
  addVisible: state.groupAddVisible,
  opeImgVisible: state.groupOpeImgVisible,
  groups: state.groups,
  gid: state.gid
})

const mapDispatchToProps = (dispatch) => ({
  groupAddCancel: () => {
    dispatch(groupAddCancel())
  },
  groupAddConfirm: (gname) => {
    dispatch(groupAddConfirm(gname))
  },
  groupOpeImgStateToggle: () => {
    dispatch(groupOpeImgStateToggle())
  },
  groupShowAddDialog: () => {
    dispatch(groupShowAddDialog())
  }
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoGroupItem)
