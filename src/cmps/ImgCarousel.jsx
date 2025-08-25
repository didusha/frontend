import Slider from "react-slick";


export function ImgCarousel({ imgUrls = [], stayName = "" }) {

  const slides = imgUrls.length ? imgUrls : ["/images/placeholder.jpg"]

  const settings = {
    dots: true,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: "ondemand",
    arrows: true,
    adaptiveHeight: true,
    swipeToSlide: true,
    prevArrow: <Arrow direction="left" />,
    nextArrow: <Arrow direction="right" />,
    appendDots: dots => (
      <div style={{ bottom: "20px" }}>
        <ul style={{ margin: 0 }}>{dots}</ul>
      </div>
    ),
  }

  function addToWishList(){

  }

  return (
    <div className="stay-media slider-container">
      <Slider {...settings}>
        {slides.map((src, i) => (
            <div className="slide stay-img-wrapper" key={i}>
            <img
              className="stay-img"
              src={src}
              alt={stayName ? `${stayName} – image ${i + 1}` : `Stay image ${i + 1}`}
              loading="lazy"
            />
            <button className="heart-btn" onClick={addToWishList} aria-label="Add to wishlist">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ width: "24px", height: "24px"}}
              >
                <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" />
              </svg>
            </button>
          </div>
        ))}
      </Slider>
    </div>
  )
}
function Arrow({ direction, onClick, currentSlide, slideCount }) {

  if (direction === "left" && currentSlide === 0) return null
  if (direction === "right" && currentSlide === slideCount - 1) return null

  return (
    <button
      className={`carousel-arrow ${direction}`}
      onClick={onClick}
      aria-label={direction === "left" ? "Previous" : "Next"}
    >
      {direction === "left" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: "scale(1.8)" }}
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: "scale(1.8)" }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </button>
  )
}





