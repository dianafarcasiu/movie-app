import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/slider.css";
import { useEffect, useState } from "react";

export default function Slider({ url, options }) {
  const [sliderMovies, setSliderMovies] = useState([]);

  useEffect(
    function () {
      async function getSliderMovies() {
        const res = await fetch(url, options);
        const data = await res.json();
        setSliderMovies(data.results.slice(0, 8));
        console.log(data.results.slice(0, 5));
      }
      getSliderMovies();
    },
    [url, options]
  );

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
    >
      {sliderMovies.map((movie) => (
        <SwiperSlide
          style={{
            background: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path}) center/cover no-repeat`,
          }}
          id={movie.id}
          key={movie.id}
          className="d-flex align-items-center"
        >
          <div className="slider-text">
            <h1>{movie.original_title}</h1>
            <h5>Now in cinemas! </h5>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
