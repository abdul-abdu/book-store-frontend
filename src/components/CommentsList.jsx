import Modal from "react-bootstrap/Modal";
import React from 'react'
import { Button } from "react-bootstrap";


const ModalView = ({ movieInfo }) => {
  const [isOpen, setIsOpnen] = React.useState(false);
  const [movieInfos, setMovieInfos] = React.useState('...')

  const showModal = () => {
    setIsOpnen(true)
  }

  const hideModal = () => {
    setIsOpnen(false)
  }

  const modalLoaded = (movieInfo) => {
    setMovieInfos(movieInfo)
  }



  return (
    <>
      <Button onClick={showModal}>Display Modal</Button>
      <Modal show={isOpen} onHide={hideModal} onEntered={modalLoaded}>
        <Modal.Header>
          <Modal.Title>{movieInfos}</Modal.Title>
        </Modal.Header>
        <Modal.Body>The body</Modal.Body>
        <Modal.Footer>
          <Button onClick={hideModal}>Cancel</Button>
          <Button>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalView
