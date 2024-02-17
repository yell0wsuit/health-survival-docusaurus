import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ImageZoom = () => {
  const [show, setShow] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = (src) => {
    setImgSrc(src);
    setShow(true);
  };

  // Attach the event listener to a static parent element in useEffect
  React.useEffect(() => {
    const handleClick = (event) => {
      let targetElement = event.target.closest('.imgpop');

      if (targetElement && targetElement.nodeName === 'A') {
        event.preventDefault();
        const imgSrc = targetElement.querySelector('img').src;
        handleShow(imgSrc);
      }
    };

    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <Modal show={show} onHide={handleClose}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <img src={imgSrc} id="imagepreview" className="img-fluid mx-auto d-block" />
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageZoom;
