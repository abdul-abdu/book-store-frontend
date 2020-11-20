import { Button } from 'react-bootstrap'


const CommentArea = ({ showComment, onClick }) => {
  const showHiddenClassName = showComment ? 'modal display-block' : 'modal display-none'
  console.log('showComment', showComment)
  console.log('hideCommentArea', onClick)
  return (
    <main>
      <div className={showHiddenClassName}>
        <section className='modal-main'>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam commodi nihil at eos voluptates minus omnis, dolor consequuntur recusandae voluptatibus error architecto atque facere sed nemo itaque laudantium optio magni.</p>
          <Button onClick={onClick}>close</Button>
        </section>
      </div>

    </main >
  )
}
export default CommentArea