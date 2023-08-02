import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import Popup from 'reactjs-popup'

import './index.css'

const Header = props => {
  const onLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="web-con">
        <img
          src="https://res.cloudinary.com/dxslfmoiw/image/upload/v1681836505/Group_7731_xugh4o.png"
          alt="website logo"
        />
      </div>

      <div className="cont">
        <ul className="ul">
          <Link to="/" className="list">
            <li className="header-link">Home</li>
          </Link>
          <Link to="/bookshelves" className="list">
            <li>Bookshelves</li>
          </Link>
        </ul>
        {/* <button type="button" className="logout" onClick={onLogoutButton}>
          Logout
        </button> */}

        <Popup
          modal
          trigger={
            <button type="button" className="logout">
              Logout
            </button>
          }
        >
          {close => (
            <div className="modal">
              <div>
                <div className="trigger-button">
                  <div className="pop-con">
                    <p className="logout-para">Are you sure want to exit</p>
                    <div className="y-c-c">
                      <button
                        type="button"
                        onClick={onLogoutButton}
                        className="yes"
                      >
                        Yes
                      </button>
                      <button
                        className="cancel"
                        type="button"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  )
}
export default withRouter(Header)
