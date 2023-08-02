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
          <span className="author-name">{authorName}</span>
          <br />
          <span className="rating">
            Avg rating <AiOutlineStar className="star" /> {rating}
          </span>
          <br />
          <span className="status">
            Status <span className="st">{readStatus}</span>
          </span>
        </div>
      </div>
    </li>
  )
}

export default BookItem
