import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'

import ReactSlick from '../ReactSlick'
import './index.css'

class Home extends Component {
  state = {
    getTopRatedItemsList: [],
    isLoading: true,
    failureView: false,
  }

  componentDidMount() {
    this.getRatedItems()
  }

  getRatedItems = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const URL = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(URL, options)
    const data = await response.json()
    console.log(response)

    if (response.status === 200) {
      const updatedData = data.books.map(eachItem => ({
        id: eachItem.id,
        authorName: eachItem.author_name,
        coverPic: eachItem.cover_pic,
        title: eachItem.title,
      }))

      this.setState({
        getTopRatedItemsList: updatedData,
        isLoading: false,
      })
    } else if (response.status === 400) {
      this.setState({failureView: true, isLoading: false})
    }
  }

  retryButton = () => {
    this.getRatedItems()
  }

  findBooks = () => {
    const {history} = this.props
    history.replace('/bookshelves')
  }

  render() {
    const {getTopRatedItemsList, isLoading, failureView} = this.state

    return (
      <div className="home-home">
        <Header />
        <div className="home-matter-con">
          <h1 className="heading-home">Find Your Next Favorite Books?</h1>
          <p className="des-home">
            You are in the place. Tell us what titles or genres you have enjoyed
            in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <div className="top-rated-container">
            <div className="top-con">
              <p className="top-rated">Top Rated Books </p>
              <button
                type="button"
                className="find-books"
                onClick={this.findBooks}
              >
                Find Books
              </button>
            </div>
            <>
              {isLoading ? (
                <div className="loader-container" testid="loader">
                  <Loader
                    type="TailSpin"
                    color="#0284C7"
                    height={50}
                    width={50}
                  />
                </div>
              ) : (
                <>
                  {failureView ? (
                    <div>
                      <img
                        src="https://res.cloudinary.com/dxslfmoiw/image/upload/v1690961870/Something_went_wrong_oysfjj.png"
                        className="error-image"
                        alt="imag"
                      />
                      <button
                        className="retry-btn"
                        type="button"
                        onClick={this.retryButton}
                      >
                        Retry
                      </button>
                    </div>
                  ) : (
                    <ReactSlick ratedData={getTopRatedItemsList} />
                  )}
                </>
              )}
            </>
          </div>
          <div className="footer-con">
            <img
              src="https://res.cloudinary.com/dxslfmoiw/image/upload/v1683700931/google_gl5etn.png"
              alt="google"
              className="img"
            />
            <img
              src="https://res.cloudinary.com/dxslfmoiw/image/upload/v1683701160/twitter_txbmdc.png"
              alt="twitter"
              className="img"
            />
            <img
              src="https://res.cloudinary.com/dxslfmoiw/image/upload/v1683701219/instagram_ueydig.png"
              alt="instagram"
              className="img"
            />
            <img
              src="https://res.cloudinary.com/dxslfmoiw/image/upload/v1683701272/youtube_f8m6qh.png"
              alt="youtube"
              className="img"
            />
            <p className="bold">Contact Us</p>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
