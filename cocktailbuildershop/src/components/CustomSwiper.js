import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "../styles.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";

export default function CustomSwiper() {
	const latter = ['s']
	const [itemData, setItemData] = useState([]);


	useEffect(() => {
		const asd = []
		for (let elem of latter) {
			fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${elem}`)
				.then((result) => result.json())
				.then((data) => {
					data.drinks ? asd.push(...data.drinks) : asd.push(...data.drinks.drinks)
					if (elem === 's') {
						setItemData(asd)
					}
				});
		}
	}, []);
	return (
		<>
			<Swiper
				loop={true}
				effect={"coverflow"}
				grabCursor={true}
				centeredSlides={true}
				centeredSlidesBounds={true}
				slidesPerView={4}
				spaceBetween={50}
				scrollbar= {{
					el: '.swiper-scrollbar',
					draggable: true,}}
				coverflowEffect={{
					rotate: 0,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: true,
				}}
				//   pagination={true}
				modules={[EffectCoverflow, Pagination]}
				className="mySwiper"
			>
				{itemData.map((item) => {
					return <SwiperSlide key={item.idDrink}><img src={item.strDrinkThumb} /></SwiperSlide>
				})}
				{/* <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide> */}
			</Swiper>
		</>
	);
}
