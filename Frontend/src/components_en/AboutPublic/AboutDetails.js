import React from "react";
import styled from "styled-components";
import DiamondIcon from "@mui/icons-material/Diamond";
// import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import AttractionsIcon from "@mui/icons-material/Attractions";

const cardsData = [
  {
    id: 1,
    title: "Mission",
    line: ['1. Our Mission is to make online presence easy for contractors', '2. Make contractors accountable for their work and help them promote their business.', '3. Offer easy access to the clients to reach good contractors & firms.', '4. Contractors can create and join relevant groups to share their experiences.', '5. Offering easy and fast online agreement system.'],
    icon: (
      <AttractionsIcon
        sx={{
          width: 40,
          height: 40,
        }}
      ></AttractionsIcon>
    ),
  },
  {
    id: 2,
    title: "Vision",
    line: ["Empowering Contractors and construction industry."],
    icon: (
      <DiamondIcon
        sx={{
          width: 40,
          height: 40,
        }}
      ></DiamondIcon>
    ),
  },
  // {
  //   id: 3,
  //   title: "History",
  //   line: "Lorem ipsum, dolor sit amet consectetur adipisum, dolor sit amet consectetur adipisicing elit. Volsum, dolor sit amet consectetur adipisicing elit. Volsum, dolor sit amet consectetur adipisicing elit. Volsicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  //   icon: (
  //     <HistoryEduIcon
  //       sx={{
  //         width: 40,
  //         height: 40,
  //       }}
  //     ></HistoryEduIcon>
  //   ),
  // },
];

function AboutDetails() {
  return (
    <Wrapper>
      {/* <div className="hero__grid">
        <h2 className="hero__title">
          Service Providers <br></br> Customed Only For You
        </h2>
        <div className="hero__content">
          <p className="hero__paragraph">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            dolorum debitis consectetur reprehenderit non aliquam voluptates
          </p>
        </div>
      </div> */}
      {cardsData.map((card, index) => {
        const { id, icon, title, line } = card;
        return (
          <div key={index} className="content__grid">
            <div key={id} className="content__item">
              {icon}
              <h1 className="content__title">{title}</h1>
              {line.map((item, index) => {
                return (
                  <p key={index} className="content__paragraph">{item}</p>
                )
              })}
            </div>
          </div>
        );
      })}
    </Wrapper>
  );
}

export default AboutDetails;

const Wrapper = styled.section`
  background-color: #c0c1cc;
  color: #424d83;
  min-height: 50vh;
  padding: 7rem 3rem;

  // .hero__grid {
  //   max-width: 110rem;
  //   margin: auto;
  //   display: grid;
  //   grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
  //   grid-gap: 4rem;
  // }
  // @media only screen and (max-width: 800px) {
  //   .hero__grid {
  //     grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  //     max-width: 100%;
  //     grid-gap: 6rem;
  //   }
  // }


  .content__grid {
    max-width: 110rem;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
    grid-gap: 4rem;
    margin-top: 6rem;
  }
  @media only screen and (max-width: 1150px) {
    .content__grid {
      grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    }
  }
  .content__item {
    background-color: #dedeeb;
    padding: 3rem 3rem;
    border-radius: 10px 10px 10px 10px;
    color: #424d83;
    box-shadow: 0px 10px 24px 6px rgb(0 0 0 / 6%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    justify-content: center;
  }
  .content__item > * {
    margin-bottom: 1rem;
  }
  .content__paragraph {
    text-align: center;
    font-size: 1.6rem;
    color: #424d83;
    line-height: 1.5;
  }
  .content__title {
    font-weight: 800;
    font-size: 2.5rem;
    letter-spacing: 1px;
  }
  .hero__title {
    font-weight: 800;
    font-size: 3rem;
    letter-spacing: 0.5px;
  }
  .hero__paragraph {
    font-size: 1.7rem;
    line-height: 1.8;
    font-weight: 400;
  }
`;
