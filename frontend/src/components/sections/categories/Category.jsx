import React from 'react'
import SectionHeading from '../../sectionHeading/SectionHeading'
import Card from '../../card/Card'
const Category = ({title,data}) => {
  return (
    <>
      <SectionHeading title={title}/> 
      <div className='flex px-8 items-center flex-wrap'>
      {data && data?.map((item,index)=>{
        return(
            <Card title={item?.title} description={item?.description} imagePath={item.image} actionArrow={true}/>
        )
      })}
        </div>
    </>
  )
}

export default Category
