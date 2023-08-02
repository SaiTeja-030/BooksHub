import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errMsg: errorMsg})
  }

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onLoginForm = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showErrorMsg, errMsg} = this.state
    return (
      <div className="bg-container">
        <div className="left-part">
          <img
            src="https://res.cloudinary.com/dxslfmoiw/image/upload/v1681835368/Rectangle_1467_npma4i.svg"
            alt="login website logo"
            className="login-website-logo"
          />
        </div>
        <div className="right-part">
          <div className="login-form-container">
            <div className="website-login-image-container">
              <img
                src="https://res.cloudinary.com/dxslfmoiw/image/upload/v1681836505/Group_7731_xugh4o.png"
                alt="website login"
                className="website-login-image"
              />
            </div>
            <form onSubmit={this.onLoginForm}>
              <div className="user-password-container">
                <div className="user-container">
                  <label htmlFor="username" className="username-label">
                    Username*
                  </label>
                  <input
                    id="username"
                    className="input"
                    onChange={this.onUsernameChange}
                  />
                </div>

                <div className="password-container">
                  <label htmlFor="password" className="password-label">
                    Password*
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="input"
                    onChange={this.onPasswordChange}
                  />
                </div>

                <div className="login-button-container">
                  <button type="submit" className="login-button">
                    Login
                  </button>
                  {showErrorMsg && <p className="error-msg">* {errMsg}</p>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
