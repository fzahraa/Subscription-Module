import React, {useState} from "react";
import { Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import ImageSlideView from "./ImageSlideView";
import CommentIcon from '@mui/icons-material/Comment';


const IdeaBookGallery = (props) => {
    const[showSlider, setShowSlider] =useState(false);
    const[changeCategory, setCategory] =useState('');
    const [isHovered, setHover] = useState(false);

    const openSlideView =(category, id, comments)=>{
        setShowSlider(true);
        setCategory(category);
        console.log(changeCategory);
        props.onClickCategory(category);
     }
     
//const filteredCategory = [...new Set(data.map((item)=>item.category))];
const res = Object.values(props.data.reduce((a,{category, id, img, comments})=>{
    a[category]={category, id, img, comments}
    return a;
 },{}))
//console.log(res);
  if (res) {
    return (
      <Wrapper>
       <div className="portfolio__grid">
          {res.map((images, index) => {
            const count = props.data.reduce((accumulator, obj) => {
                                            if (obj.category === images.category) {
                                                return accumulator + 1;
                                            }

                                            return accumulator;
                                            }, 0)
                                     
            return (
              <div key={index} className="container" onClick={() => openSlideView(images.category, images.id, images.comments)}>
                <img src={images.img} className="image" alt="fields" onMouseOver={() => setHover(true)}
              onMouseLeave={() => setHover(false)} />
              <div class="middle">
                                     <header>
                                     <h1> {images.category} ({count })

                                                                            
                                     </h1>
                                    
                                      </header>
                                    </div>
              </div>
            );
          })}
        </div>
        {/* { showSlider === true && (
            
            <ImageSlideView slideData= {props.data} imageCategory = {changeCategory}>
            </ImageSlideView>
        )} */}
      </Wrapper>
    );
  }
  return null;
};

export default IdeaBookGallery;

const Wrapper = styled.section`
  .portfolio__grid {
    max-width: 110rem;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2rem;
    margin-bottom: 2rem;
  }
  .item-info header{
    display: flex;
    justify-content: space-between;
  }
  .top-right {
  position: absolute;
  top: 8px;
  right: 16px;
}

  .item-info h4{
    margin-bottom: 0.5rem;
  }
  @media only screen and (max-width: 900px) {
    .portfolio__grid {
      max-width: 100%;
    }
  }
  @media only screen and (max-width: 500px) {
    .portfolio__grid {
      max-width: 100%;
      grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    }
  }
  .portfolio__div {
    position: relative;
    overflow: hidden;
    height: 30rem;
    border: 1px solid blue;
    border-radius: 20px;
    box-shadow: -2px 3px 8px 0px rgba(199,185,185,0.75);
  -webkit-box-shadow: -2px 3px 8px 0px rgba(199,185,185,0.75);
  -moz-box-shadow: -2px 3px 8px 0px rgba(199,185,185,0.75);

  }
  .portfolio__div button {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  opacity:0;
} 
.portfolio__div:hover button {   
  opacity: 1;
}
  .photoStyle:hover{
    filter: opacity(0.6);
  }
  .portfolio__div img {
    height: 100%;
    width: 100%;
    transition: all 0.3s ease-out;
    cursor: pointer;
    
  }
  .portfolio__div img: hover {
    filter: opacity(0.6);
    
  }
  .container {
  position: relative;
    overflow: hidden;
    height: 20rem;
    border: 1px solid blue;
    border-radius: 20px;
    box-shadow: -2px 3px 8px 0px rgba(199,185,185,0.75);
  -webkit-box-shadow: -2px 3px 8px 0px rgba(199,185,185,0.75);
  -moz-box-shadow: -2px 3px 8px 0px rgba(199,185,185,0.75);
}

.image {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: .5s ease;
  backface-visibility: hidden;
}

.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 90%;
  left: 20%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.container:hover .image {
  opacity: 0.3;
}

.container:hover .middle {
  opacity: 1;
}

.left {
    transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 90%;
  right: 0%
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
`;
