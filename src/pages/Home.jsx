import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import Card from 'react-bootstrap/Card';
import { homeProjectAPI } from '../../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';



function Home() {
  const [homeProjects, setHomeProjects] = useState([])
  console.log(homeProjects);


  useEffect(() => {


    getHomeProjects()

  }, [])

  const navigate = useNavigate()


  const getHomeProjects = async () => {

    try {

      const result = await homeProjectAPI()
      console.log(result);

      if (result.status == 200) {
        setHomeProjects(result.data)
      }


    } catch (err) {
      console.log(err);

    }
  }





  const handleProjects = () => {
    if (sessionStorage.getItem("token")) {

      navigate('/projects')

    }
    else {
      toast.warning("please login to get full acess to our projects")
    }
  }


  return (
    <>

      <div className='container   ' style={{ marginTop: '100px' }}>
        <Row className='d-flex justify-content-center align-items-center'>




          <Col lg={6} md={4} sm={12}>

            <h1><img className="rounded-circle"
              style={{ height: '40px', width: '40px', marginRight: '10px', objectFit: 'cover' }}
              src="https://thumbs.dreamstime.com/b/whale-stock-market-graphs-background-crypto-value-illustration-whale-stock-market-graphs-background-crypto-value-illustration-301195168.jpg" alt="" />Project Fair</h1>
            <p>We aim to create a collaborative space for discussion of practical, equitable, and evidence-based reward approaches that enable INGOs to maximise their contributions to decent work, sustainable livelihood, and poverty eradication.</p>
            {
              sessionStorage.getItem("token") ?
                <Link to={'/dashboard'} className='btn btn-warning' style={{ borderRadius: '5px' }}>
                  MANAGE YOUR PROJECT


                </Link> :
                <Link to={'/login'} className='btn btn-warning' style={{ borderRadius: '5px' }}>
                  START TO EXPLORE


                </Link>
            }




          </Col>
          <Col lg={6} md={4} sm={12} className='mt-3'>

            <img src="https://t3.ftcdn.net/jpg/04/54/49/88/360_F_454498819_VTHYFq40dB3ur4fVGK2UdK5WeAXpch0r.jpg" className='img-fluid' alt="" />
          </Col>

        </Row>

        <div className='d-flex justify-content-center align-items-center flex-column'>
          <h2 style={{ marginTop: '250px' }} className='text-danger mb-5'>Explore Our Projects</h2>


          <marquee scrollamount="10">
            <div className='d-flex'>


              {homeProjects?.length > 0 ?

                homeProjects?.map(item => (

                  <div className='me-2'>

                    <ProjectCard displayData={item} />

                  </div>)

                )



                :
                <div className='text-danger  my-5 fw-bolder'>Project not found</div>

              }


            </div>
          </marquee>


          <button className="mt-5 text-danger fw-bold border-0 bg-transparent p-0" onClick={handleProjects}>
            Click here to view more
          </button>




        </div>

        <div className='mt-5'>
          <h2 className='text-center'>Our Testmonial</h2>

          <Row className='d-flex  justify-content-center align-items-center'>
            <Col lg={4} md={6} sm={12}>

              <Card style={{ width: '18rem' }} className='ms-5 mt-4'>
                <Card.Body>
                  <Card.Title>

                    <div className='text-center my-3'>
                      <img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4866.jpg?semt=ais_hybrid" className='img-fluid ' style={{ height: '100px' }} alt="" />


                    </div>




                  </Card.Title>
                  <Card.Text>
                    <h5 className='text-center'>Lex Luthur</h5>
                    <div className='text-center'>
                      <i class="fa-solid fa-star" style={{ color: 'yellow' }}></i>
                      <i class="fa-solid fa-star" style={{ color: 'yellow' }}></i>
                      <i class="fa-solid fa-star" style={{ color: 'yellow' }}></i>
                      <i class="fa-solid fa-star" style={{ color: 'yellow' }}></i>
                      <i class="fa-solid fa-star" style={{ color: 'yellow' }}></i>


                    </div>
                    <p>Italy, country of south-central Europe, occupying a peninsula that juts deep into the Mediterranean Sea. Italy comprises some of the most varied and scenic landscapes on Earth and is often described as a country shaped like a boot. At its broad top stand the Alps, which are among the world's most rugged mountains</p>
                  </Card.Text>
                </Card.Body>
              </Card>

            </Col>


            <Col lg={4} md={6} sm={12}>

              <Card style={{ width: '18rem' }} className='ms-5 mt-4'>
                <Card.Body>
                  <Card.Title>

                    <div className='text-center my-3'>
                      <img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4866.jpg?semt=ais_hybrid" className='img-fluid ' style={{ height: '100px' }} alt="" />


                    </div>




                  </Card.Title>
                  <Card.Text>
                    <h5 className='text-center'>Lex Luthur</h5>
                    <div className='text-center'>
                      <i class="fa-solid fa-star" style={{ color: 'yellow' }}></i>
                      <i class="fa-solid fa-star" style={{ color: 'yellow' }}></i>
                      <i class="fa-solid fa-star" style={{ color: 'yellow' }}></i>
                      <i class="fa-solid fa-star" style={{ color: 'yellow' }}></i>
                      <i class="fa-solid fa-star" style={{ color: 'yellow' }}></i>


                    </div>
                    <p>Italy, country of south-central Europe, occupying a peninsula that juts deep into the Mediterranean Sea. Italy comprises some of the most varied and scenic landscapes on Earth and is often described as a country shaped like a boot. At its broad top stand the Alps, which are among the world's most rugged mountains</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} sm={12}>


              <Card style={{ width: '18rem' }} className='ms-5 mt-4'>
                <Card.Body>
                  <Card.Title>

                    <div className='text-center my-3'>
                      <img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4866.jpg?semt=ais_hybrid" className='img-fluid ' style={{ height: '100px' }} alt="" />


                    </div>




                  </Card.Title>
                  <Card.Text>
                    <h5 className='text-center'>Lex Luthur</h5>
                    <div className='text-center'>
                      <i class="fa-solid fa-star" style={{ color: 'yellow' }}></i>
                      <i class="fa-solid fa-star" style={{ color: 'yellow' }}></i>
                      <i class="fa-solid fa-star" style={{ color: 'yellow' }}></i>
                      <i class="fa-solid fa-star" style={{ color: 'yellow' }}></i>
                      <i class="fa-solid fa-star" style={{ color: 'yellow' }}></i>


                    </div>
                    <p>Italy, country of south-central Europe, occupying a peninsula that juts deep into the Mediterranean Sea. Italy comprises some of the most varied and scenic landscapes on Earth and is often described as a country shaped like a boot. At its broad top stand the Alps, which are among the world's most rugged mountains</p>
                  </Card.Text>
                </Card.Body>
              </Card>

            </Col>


          </Row>











        </div>



      </div>









    </>
  )
}

export default Home