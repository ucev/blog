import OperationButton from '../operation-button'

export default ({id = '', title = '', onClick = () => {}, dataType = '', style = {} }) => (
    <OperationButton
      type = 'cancel'
      id = {id}
      title = {title}
      dataType = {dataType}
      onClick = {onClick}
      style = {style}
    />
)
