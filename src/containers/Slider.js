import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../contexts/MoviesContext";
import { useTheme } from "../contexts/ThemeContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/slider.css";

export default function Slider() {
  const { sliderMovies, getSliderMovies } = useMovies();
  const { lightModeOn } = useTheme();
  const navigate = useNavigate();

  function handleClick(target) {
    navigate(`/movie/${target.id}`);
  }

  useEffect(() => {
    getSliderMovies();
  }, []);

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{ delay: 4000 }}
      className={`main-swiper ${lightModeOn ? "light" : ""}`}
    >
      {sliderMovies?.map((movie) => (
        <SwiperSlide
          style={{
            background: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path}) center/cover no-repeat`,
          }}
          id={movie.id}
          key={movie.id}
          className="d-flex align-items-center"
          onClick={() => handleClick(movie)}
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
