import React, { useEffect, useState } from 'react';
import CarouselComponent from './CarouselComponent';
import axios from 'axios';
import './Carousel.css';

function CarouselContainer({
  heading,
  apiUrl,
  sliceStart = 0,
  sliceEnd = 5,
  dataMapper = (item) => ({
    image: item?.image || 'https://via.placeholder.com/150',
    caption: {
      title: item?.title || 'Title',
      text: item?.description || 'No description',
    }
  }),
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!apiUrl) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const fetchedData = response.data;
        const arrayData = Array.isArray(fetchedData)
          ? fetchedData
          : Array.isArray(fetchedData.products)
          ? fetchedData.products
          : [];

        const slicedData = arrayData.slice(sliceStart, sliceEnd).map(dataMapper);
        setData(slicedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, [apiUrl, sliceStart, sliceEnd, dataMapper]);

  return (
    <div className="container">
      <h2 className="heading">{heading}</h2>
      {data.length > 0 ? <CarouselComponent slides={data} /> : <p>Loading...</p>}
    </div>
  );
}

export default CarouselContainer;
