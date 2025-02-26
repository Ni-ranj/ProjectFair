import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthorizedContext } from '../Context/ContextAPI'


function Header() {
  const navigate=useNavigate()

    const {setIsAuhtorized}=useContext(isAuthorizedContext)
  

  const logout=()=>{
    sessionStorage.clear()
    setIsAuhtorized(false)
    navigate('/')
  }
  return (
    <>
    <nav className="navbar  bg-secondary " >
  <div className="container-fluid ">
    <Link to={'/'} className='text-decoration-none'>
    <h2 className="text-white"><img  className="rounded-circle"
    style={{ height: '40px', width: '40px', marginRight: '10px', objectFit: 'cover' }}
   src="https://thumbs.dreamstime.com/b/whale-stock-market-graphs-background-crypto-value-illustration-whale-stock-market-graphs-background-crypto-value-illustration-301195168.jpg" alt="" />Project Fair</h2>
    
    
    </Link>
    <form className="d-flex" role="search">
      <button className="btn btn-outline-white bg-black me-5 " onClick={logout} style={{borderRadius:'10px'}} type="submit">Logout</button>
    </form>
  </div>
</nav>
    
    
    </>
  )
}

export default Header