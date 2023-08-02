import {AiOutlineStar} from 'react-icons/ai'

import './index.css'

const BookItem = props => {
  const {detail} = props
  const {title, coverPic, authorName, rating, readStatus} = detail

  return (
    <li className="li-item">
      <div className="flex-container">
        <img src={coverPic} alt={title} className="s-image" />
        <div className="books-details-container">
          <span className="titles">{title}</span> <br />
          <p className="author-name">{authorName}</p>
          <p className="rating">
            Avg rating <AiOutlineStar className="star" /> {rating}
          </p>
          <p className="status">
            Status: <span className="st">{readStatus}</span>
          </p>
        </div>
      </div>
    </li>
  )
}

export default BookItem
