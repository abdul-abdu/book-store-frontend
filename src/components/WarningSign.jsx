import { Alert } from 'react-bootstrap'


const WarningSign = (props) => {
  return (
    <Alert variant='danger'>
      {props.text}
    </Alert>
  )
}


export default WarningSign