# 关于react lifting state up的问题

    div#main-div
    script(type='text/babel').
      /**
       * 这个决定修改成类
       */
      class AddInputDialog extends React.Component {
        constructor(props) {
          super(props);
          this.handleConfirmClick = this.handleConfirmClick.bind(this);
          this.state = {
            // 注意这里
            componentIsVisible: this.props.componentIsVisible
          }
        }
        handleConfirmClick() {
          alert('click');
          var val = this.textInput.value;
          this.props.handleConfirm(val);
          this.textInput.value = "";
        }
        render() {
          var componentStyle = {};
          // 注意这里
          if (!this.state.componentIsVisible)
            componentStyle.display = 'none';
          return (
              <div id = 'add-new-group-div' style = {componentStyle}>
                <div id = 'add-new-group-title'>{this.props.title}</div>
                <input id = 'add-new-group-input' ref = {(input) => (this.textInput = input)}/>
                <div id = 'add-new-group-button-div'>
                  <button id = 'add-new-group-confirm-button' onClick = {this.handleConfirmClick}>确定</button>
                  <button id = 'add-new-group-cancel-button'>取消</button>
                </div>
              </div>
          );
        }
      }
      class PhotoItem extends React.Component {
        constructor(props) {
          super(props);
        }
        render() {
          return (
            <li className = 'photo-flow-item-li'>
              <img className = 'photo-flow-item-li-img' src="/images/rabbit.gif"></img>
              <div className = 'photo-flow-item-li-ope-bar'>
              </div>
            </li>
          );
        }
      }
      class PhotoFlow extends React.Component {
        constructor(props) {
          super(props);
        }
        render() {
          const items = [];
          for (let i = 0; i < this.props.count; i++) {
            items.push(<PhotoItem />);
          }
          return (
            <div id = 'photo-flow-div'>
              <div id = 'photo-operation-bar'>
                <button id = 'upload-image-button' className='operation-button'>上传图片</button>
              </div>
              <ul id = 'photo-flow-items-ul'>
                {items}
              </ul>
            </div>
          );
        }
      }
      class PhotoGroupBar extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            groups: this.props.groups,
            componentIsVisible: false
          }
          this.handleConfirm = this.handleConfirm.bind(this);
          this.showAddDialog = this.showAddDialog.bind(this);
        }
        showAddDialog() {
          alert('show add dialog');
          this.setState({
            componentIsVisible: true
          });
        }
        handleConfirm(groupname) {
          alert(groupname);
          this.setState({
            componentIsVisible: false
          });
        }
        render() {
          var groupItems = this.state.groups.map((group) => (
            <li className = 'photo-group-item-li'>{group.name}</li>
          ));
          var componentIsVisible = this.state.componentIsVisible;
          var addDialog = <AddInputDialog title = '新建分组' handleConfirm = {this.handleConfirm} componentIsVisible = {componentIsVisible}/>;
          console.log('photo group bar: ' + componentIsVisible);
          var key = new Date().getTime();
          return (
            <div id = 'photo-group-div'>
              <ul id = 'photo-group-items-ul'>
                {groupItems}
                <li id = 'add-new-photo-group-item' className = 'photo-group-item-li' onClick = {this.showAddDialog}>新建分组</li>
                {addDialog}
              </ul>
            </div>
          );
        }
      }
      class PhotoArea extends React.Component {
        constructor(props) {
          super(props);
        }
        render() {
          var groups = [
            {name: 'title1'},
            {name: 'title2'}
          ];
          return (
            <div id='photo-div'>
              <PhotoFlow count = '200' />
              <PhotoGroupBar groups = {groups}/>
            </div>
          );
        }
      }
      ReactDOM.render(
        <PhotoArea />,
        document.getElementById('main-div')
      );
这个不能正确的显示和隐藏 AddInputDialog

extends base_layout

block main-body-block
  div.main
    div#main-div
    script(type='text/babel').
      /**
       * 这个决定修改成类
       */
      class AddInputDialog extends React.Component {
        constructor(props) {
          super(props);
          this.handleConfirmClick = this.handleConfirmClick.bind(this);
        }
        handleConfirmClick() {
          alert('click');
          var val = this.textInput.value;
          this.props.handleConfirm(val);
          this.textInput.value = "";
        }
        render() {
          var componentStyle = {};
          if (!this.props.componentIsVisible)
            componentStyle.display = 'none';
          return (
              <div id = 'add-new-group-div' style = {componentStyle}>
                <div id = 'add-new-group-title'>{this.props.title}</div>
                <input id = 'add-new-group-input' ref = {(input) => (this.textInput = input)}/>
                <div id = 'add-new-group-button-div'>
                  <button id = 'add-new-group-confirm-button' onClick = {this.handleConfirmClick}>确定</button>
                  <button id = 'add-new-group-cancel-button'>取消</button>
                </div>
              </div>
          );
        }
      }
      class PhotoItem extends React.Component {
        constructor(props) {
          super(props);
        }
        render() {
          return (
            <li className = 'photo-flow-item-li'>
              <img className = 'photo-flow-item-li-img' src="/images/rabbit.gif"></img>
              <div className = 'photo-flow-item-li-ope-bar'>
              </div>
            </li>
          );
        }
      }
      class PhotoFlow extends React.Component {
        constructor(props) {
          super(props);
        }
        render() {
          const items = [];
          for (let i = 0; i < this.props.count; i++) {
            items.push(<PhotoItem />);
          }
          return (
            <div id = 'photo-flow-div'>
              <div id = 'photo-operation-bar'>
                <button id = 'upload-image-button' className='operation-button'>上传图片</button>
              </div>
              <ul id = 'photo-flow-items-ul'>
                {items}
              </ul>
            </div>
          );
        }
      }
      class PhotoGroupBar extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            groups: this.props.groups,
            componentIsVisible: false
          }
          this.handleConfirm = this.handleConfirm.bind(this);
          this.showAddDialog = this.showAddDialog.bind(this);
        }
        showAddDialog() {
          alert('show add dialog');
          this.setState({
            componentIsVisible: true
          });
        }
        handleConfirm(groupname) {
          alert(groupname);
          this.setState({
            componentIsVisible: false
          });
        }
        render() {
          var groupItems = this.state.groups.map((group) => (
            <li className = 'photo-group-item-li'>{group.name}</li>
          ));
          var componentIsVisible = this.state.componentIsVisible;
          var addDialog = <AddInputDialog title = '新建分组' handleConfirm = {this.handleConfirm} componentIsVisible = {componentIsVisible}/>;
          console.log('photo group bar: ' + componentIsVisible);
          var key = new Date().getTime();
          return (
            <div id = 'photo-group-div'>
              <ul id = 'photo-group-items-ul'>
                {groupItems}
                <li id = 'add-new-photo-group-item' className = 'photo-group-item-li' onClick = {this.showAddDialog}>新建分组</li>
                {addDialog}
              </ul>
            </div>
          );
        }
      }
      class PhotoArea extends React.Component {
        constructor(props) {
          super(props);
        }
        render() {
          var groups = [
            {name: 'title1'},
            {name: 'title2'}
          ];
          return (
            <div id='photo-div'>
              <PhotoFlow count = '200' />
              <PhotoGroupBar groups = {groups}/>
            </div>
          );
        }
      }
      ReactDOM.render(
        <PhotoArea />,
        document.getElementById('main-div')
      );

这个能正确的显示和隐藏  AddInputDialog

原因就在与 AddInputDialog 中的 contructor 函数，对于同一个组件在构建时只调用一次, 所以不更新 this.state.