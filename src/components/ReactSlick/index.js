import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const ReactSlick = props => {
  const {ratedData} = props
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {ratedData.map(data => (
          <div className="book-con">
            <img src={data.coverPic} alt="pic" className="top-image" />
            <div>
              <p className="title">{data.title}</p>
              <p className="a-name">{data.authorName}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ReactSlick
