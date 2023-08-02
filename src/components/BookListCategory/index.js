import './index.css'

const BookListCategory = props => {
  const {details, getCategoryBook, isActive} = props
  const {value, label, id} = details

  const onCategoryClick = () => {
    getCategoryBook(value, id, label)
  }

  const cc = isActive ? 'blueColor' : ''

  return (
    <div className="l-item">
      <button
        type="button"
        className={`bs-btn ${cc}`}
        onClick={onCategoryClick}
      >
        {label}
      </button>
    </div>
  )
}

export default BookListCategory
