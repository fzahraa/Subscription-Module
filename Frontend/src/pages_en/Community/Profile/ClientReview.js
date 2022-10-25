import React, { useEffect } from 'react';
import styled from "styled-components";
import logo from '../../../images/logo.png'
import Spinner from '../../../components_en/Spinner';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Gallery } from '../../../components_en/GuestFlow';
import ReviewForm from '../../../components_en/Community/Profile/ReviewForm';
import { fetchSingleProjectEn } from '../../../features_en/guest/guestSlice';

const ClientReview = () => {
    // State.
    const { single_project, isLoading, } = useSelector((state) => state.guestEn);
    const dispatch = useDispatch();
    const { userId, id } = useParams();

    useEffect(() => {
        dispatch(fetchSingleProjectEn({ userId, id }));
        // eslint-disable-next-line
    }, [id]);

    if (isLoading) {
        return (
            <div className="section-100vh">
                <Spinner />;
            </div>
        );
    }
    if (single_project.data) {
        return (
            <Wrapper>
                <div className="review">
                    <div className="review__left">
                        <Link to="/">
                            <img className="review__left--logo" src={logo} alt="Logo" />
                        </Link>
                        <div className="review__left--content">
                            <p className='review__left--text'>Mahnty is connecting the contractor and designers worldwide while helping people to find the best contractor and designers they are looking for.
                            </p>
                        </div>
                    </div>
                    <div className="review__right">
                        <div className="form">
                            <h1 className='section__title'>Project Details</h1>
                            <div className="project">

                                <p className="project__subtitle">Project Name: <span className="project__name">{single_project.data.portfolio[0].projectName}
                                </span>
                                </p>
                                <p className="project__subtitle">Project Location: <span className="project__location">{single_project.data.portfolio[0].projectLocation}
                                </span>
                                </p>

                                {single_project.data.portfolio[0].description && <p className="project__subtitle">Project Description: <span className="project__description">{single_project.data.portfolio[0].projectDescription}</span></p>}
                
                                <p className="project__subtitle">Project Gallery: <span className="project__gallery">
                                </span></p>
                                <Gallery data={single_project.data.portfolio[0].images}></Gallery>
                            </div>
                            <ReviewForm User={single_project.data.about_en.companyName} userId={userId} id={id}></ReviewForm>
                        </div>
                    </div>
                </div>
            </Wrapper>
        )
    }
    else {
        return null;
    }
}

export default ClientReview

const Wrapper = styled.div`
    .review {
      display: flex;
      min-height: 75vh;
    }
    
    .review__left {
     position: sticky;
     top: 0;
     z-index: 1;
     background-color: #424d83;
     height: 100vh;
     flex: 0 0 32%;
     padding: 2.2rem 4rem;
     display: flex;
     flex-direction:column;
     align-items:center;
     justify-content:center;
     @media only screen and (max-width: 850px) {
        padding: 2rem;
     }
    }
    @media only screen and (max-width:850px) {
        .review {
            flex-direction: column;
        }
        .review__left {
            position: relative;
            top: 0;
            z-index: 0;
        }
    }
    .review__left--logo {
       height: 6rem;
       @media only screen and (max-width: 850px) {
       height: 4.2rem;
    }
    }
    .review__left--text{
        margin-top: 2rem;
        font-size: 1.5rem;
        color: white;
        text-align:center;
    }
    .review__right {
        position: relative;
        background-color: whitesmoke;
        opacity: 1;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem 0rem;
    }
    .form{
        background-color:white;
        font-size: 2rem;
        padding: 2rem 2rem;
        border-radius:.5rem;
        max-width: 70%;
        width:100%;
        margin: 3rem 0rem;
        @media only screen and (max-width: 1200px) {
            max-width: 90%;
            padding: 2rem;
     }
    }
    .project__subtitle{
        font-size: 2rem;
        color: var(--clr-black);
        margin-bottom: 2.2rem;
        margin-left: 2rem;
        font-weight: 700;
    }

    .project__title{
        font-size: 2rem;
        color: var(--clr-black);
        margin-top: 2.2rem;
        margin-bottom: 0.5rem;
        font-weight: 700;
    }

    .project__name,
    .project__location,
    .project__description {
        font-size: 2rem;
        margin: 1.3rem 0rem;
        margin-left: 2rem;
        font-weight: 500;
    }

    .helper {
        font-size: 1.5rem;
    }
`;