import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import {Overlay, Global , Header , CloseBtn,SlickWrapper,ImgWrapper} from './style';


const ImagesZoom =({images, onClose}) =>{
    const [currentSlide,setCurrentSlide]= useState(0);
    return(
        <Overlay>
            <Global />
            <Header>
                <h1>상세 이미지</h1>
                <CloseBtn onClick={onClose}>X</CloseBtn>
            </Header>
            <SlickWrapper>
                <div>
                    <Slick
                    initialSlide={0}   // 몇번째 슬라이드 시작인지 0번째부터
                    beforeChange={(slide)=>setCurrentSlide(slide)} // slide ->다음 숫자넘기기
                    infinite={true} //무한반복 
                    arrows={false}//화살표 지우기 
                    slidesToShow={1} //화면 하나만볼수있게
                    slidesToScroll={1} // 하나씩만넘길수있게
                    >
                        {images.map((v)=>(
                            <ImgWrapper key={v.src}>
                                <img src={`http://localhost:3065/${v.src}`} alt={v.src} />
                            </ImgWrapper>
                        ))}
                    </Slick>
                </div>
                </SlickWrapper>
            </Overlay>
     
    )
}

ImagesZoom.propTypes = {
    images : PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose : PropTypes.func.isRequired,

}

export default ImagesZoom;