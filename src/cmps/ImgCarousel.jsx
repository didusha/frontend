import Slider from "react-slick";


export function ImgCarousel({ imgUrls = [], stayName = "" }) {
  const slides = imgUrls.length ? imgUrls : ["/images/placeholder.jpg"]

  const settings = {
    dots: true,
    infinite: slides.length > 1,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: "ondemand",
    arrows: true,
    adaptiveHeight: true,
    swipeToSlide: true,
    // prevArrow: <PrevArrow />,
    // nextArrow: <NextArrow />,
    appendDots: dots => (
      <div style={{ bottom: "20px" }}>
        <ul style={{ margin: 0 }}>{dots}</ul>
      </div>
    ),
  }

  return (
    <div className="stay-media slider-container">
      <Slider {...settings}>
        {slides.map((src, i) => (
          <div className="slide" key={i}>
            <img
              className="stay-img"
              src={src}
              // alt={stayName ? `${stayName} – image ${i + 1}` : `Stay image ${i + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}




