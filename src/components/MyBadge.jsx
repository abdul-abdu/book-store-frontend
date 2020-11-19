import { Badge } from 'react-bootstrap'

const MyBadge = (props) => {

  return (
    <Badge variant={props.color}>{props.text}</Badge>
  )
}

export default MyBadge;