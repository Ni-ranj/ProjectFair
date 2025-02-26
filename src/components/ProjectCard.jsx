import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import server_url from "../../services/server_URL";

function ProjectCard({displayData}) {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  return (
    <>
      {/* <Card style={{ width: '18rem', borderRadius: '10px' }} className='ms-4'>
        <Card.Img variant="top" onClick={handleShow} src={`${server_url}/Uploads/${displayData?.projectIMG}`} className='p-3' />
        <Card.Body>
          <Card.Title className='text-center mb-2'>{displayData?.title}</Card.Title>

        </Card.Body>
      </Card> */}

      
<Card className="ms-4 rounded-3 shadow" style={{ width: '18rem', height: '100%' }}>
  <Card.Img
    variant="top"
    onClick={handleShow}
    src={`${server_url}/Uploads/${displayData?.projectIMG}`}
    className="p-3 rounded-3"
    alt={displayData?.title || 'Project Image'}
    style={{ objectFit: 'contain', width: '100%', height: '200px' }} // Ensures the image fits well
  />
  <Card.Body className="d-flex flex-column justify-content-center text-center">
    <Card.Title className="mb-2">{displayData?.title}</Card.Title>
  </Card.Body>
</Card>

    
      
      <Modal size="lg" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Project Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5">
              <img
                src={`${server_url}/Uploads/${displayData?.projectIMG}`}
                className="img-fluid rounded"
                alt="Project Preview"
              />
            </div>
            <div className="col-md-7">
              <h3>{displayData?.title}</h3>
              <h5>
                Languages Used:{" "}
                <span className="text-danger">{displayData?.languages}</span>
              </h5>
              <h5>
                Project Overview:{" "}
                <span style={{ fontSize: "15px" }}>{displayData?.overview}</span>
              </h5>
            </div>
          </div>

          <div className="mt-4 d-flex gap-3">
            <a
              href={displayData?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-50 d-flex align-items-center justify-content-center"
            >
              <i className="fa-brands fa-github me-2"></i> GitHub
            </a>

            <a
              href={displayData?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-50 d-flex align-items-center justify-content-center"
            >
              <i class="fa-solid fa-link me-2"></i> Link
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>




    </>
  )
}

export default ProjectCard