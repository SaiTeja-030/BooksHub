import {Component} from 'react'

import {AiOutlineSearch} from 'react-icons/ai'
import Cookies from 'js-cookie'
import BookListCategory from '../BookListCategory'
import Header from '../Header'
import BookItem from '../BookItem'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },

  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class BookShelves extends Component {
  state = {
    getResValue: '',
    getBooksApiList: [],
    searchValue: '',
    booksId: bookshelvesList[0].id,
    label: bookshelvesList[0].label,
  }

  componentDidMount() {
    this.getBooksCategory()
  }

  getCategoryBook = (value, id, label) => {
    this.setState(
      {getResValue: value, booksId: id, label},
      this.getBooksCategory,
    )
  }

  getBooksCategory = async () => {
    const {getResValue, searchValue} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${getResValue}&search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    const updatedBooksData = data.books.map(eachB => ({
      id: eachB.id,
      authorName: eachB.author_name,
      coverPic: eachB.cover_pic,
      rating: eachB.rating,
      title: eachB.title,
      readStatus: eachB.read_status,
    }))

    this.setState({getBooksApiList: updatedBooksData})
  }

  onSearchInput = event => {
    this.setState({searchValue: event.target.value})
  }

  render() {
    const {getBooksApiList, searchValue, booksId, label} = this.state
    const filteredData = getBooksApiList.filter(eachData =>
      eachData.title.toLowerCase().includes(searchValue.toLowerCase()),
    )

    return (
      <div>
        <Header />
        <div className="shelves-container">
          <div className="books-list-con">
            <h1 className="books-list">BookShelves</h1>
            <>
              {bookshelvesList.map(eachBook => (
                <BookListCategory
                  details={eachBook}
                  getCategoryBook={this.getCategoryBook}
                  isActive={booksId === eachBook.id}
                />
              ))}
            </>
          </div>
          <div className="books-shelves-search-container">
            <div className="search-row">
              <p className="heading-book">{label} Books</p>
              <div>
                <input
                  type="search"
                  className="search-book"
                  onChange={this.onSearchInput}
                />

                <button type="button" className="i-btn">
                  <AiOutlineSearch className="search-icon-btn" />
                </button>
              </div>
            </div>
            <div className="un-li-con">
              <ul className="un-list">
                {filteredData.map(eb => (
                  <BookItem detail={eb} key={eb.id} />
                ))}
              </ul>
            </div>
            <div className="footer-container">
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
              <br />
              <span className="bold">Contact Us</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelves
