import React from 'react'
import SectionHeading from '../sectionHeading/SectionHeading'
import Card from '../card/Card';
import Jeans from '../../assets/img/jeans.jpg'
import Shirts from '../../assets/img/shirts.jpg'
import Tshirt from '../../assets/img/tshirts.jpeg'
import dresses from '../../assets/img/dresses.jpg'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../../utils/Section.constants';
import Joggers from '../../assets/img/joggers.jpg';
import Kurtis from '../../assets/img/kurtis.jpg';
import './NewArrivals.css';

const items = [{
    'title':'Jeans',
    imagePath:Jeans
},{
    'title':'Shirts',
    imagePath:Shirts
},{
    'title':'T-Shirts',
    imagePath:Tshirt
},{
    'title':'Dresses',
    imagePath:dresses
},
{
    'title':'Joggers',
    imagePath:Joggers
},
{
    'title':'Kurtis',
    imagePath:Kurtis
}];

const NewArrivals = () => {
  return (
    <div className="new-arrivals-container">
      <SectionHeading title={'New Arrivals'}/>
      <div className="carousel-wrapper">
        <Carousel
          responsive={responsive}
          autoPlay={false}
          swipeable={true}
          draggable={true}
          showDots={true}
          infinite={true}
          partialVisible={false}
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          {items && items?.map((item,index)=> (
            <div key={item?.title + index} className="carousel-card-wrapper">
              <Card 
                title={item.title} 
                imagePath={item.imagePath}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default NewArrivals