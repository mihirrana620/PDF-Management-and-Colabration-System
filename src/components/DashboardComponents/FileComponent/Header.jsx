import { faSave , faArrowLeftLong} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = ({fileName}) => {

  const navigate = useNavigate();
  return (
    <nav className='navbar navbar-expand-lg mt-1 navbar-light mt-2 bg-white shadow-sm'>
        <p className='navbar-brand my-0 fw-bold  ms-5'> {fileName} </p>
          <ul className='navbar-nav ms-auto me-5'>
            <li className='nav-item mx-2'>
                <button className='btn btn-success' disabled={true}>
                    <FontAwesomeIcon   icon={faSave} /> Save
                </button>
            </li>
            <li className='nav-item'>
            <button className='btn btn-dark' onClick={()=> navigate(-1)} >
                    <FontAwesomeIcon   icon={faArrowLeftLong} /> Go Back
                </button>
            </li>
          </ul>
        
    </nav>
  )
}

export default Header