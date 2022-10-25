import React, { useEffect } from "react";
import { Table, Buttons } from "../GuestFlow";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersEn } from "../../features_en/guest/guestSlice";
import Spinner from "../Spinner";
import styled from "styled-components";
import { getAllSubscriptionsEn } from "../../features_en/SubscriptionPackage/subscriptionPackageSlice";

const Users = () => {

  const dispatch = useDispatch();

  const searchValues = JSON.parse(localStorage.getItem("searchValues"));

  const { users, isLoading } = useSelector( 
    (state) => state.guestEn
  );
  const { subs} = useSelector(
    (state) => state.subscriptionPackage
  );
  useEffect(() => {
    dispatch(getAllSubscriptionsEn());
    // eslint-disable-next-line
}, [])
  useEffect(() => {

    dispatch(fetchUsersEn({ role: searchValues.role, category: searchValues.category, region: searchValues.region, city: searchValues.city, subCategory: searchValues.subCategory }));
    // eslint-disable-next-line
  }, []);
  var numAscending;
  var sortedArray = [];
  if(users != null && subs != null){
    numAscending = [...users?.data].sort((a,b) => a.subscriptionPackage - b.subscriptionPackage);  
    var goldRecord = subs.data.filter((data)=> data.name_en === "Gold");
    //console.log(goldRecord);
    if(goldRecord._id != numAscending[0].subscriptionPackage){
      sortedArray = [...numAscending].reverse();
    }
  }
  console.log(sortedArray);

  if (isLoading) {
    return (
      <Wrapper>
        <div className="users__left">
          <Buttons></Buttons>
        </div>
        <div className="section-50vh-1200w">
          <Spinner />;
        </div>
      </Wrapper>
    );
  }
  if (users) {
    return (
      <Wrapper>
        <div className="users__left">
          <Buttons></Buttons>
        </div>
        <Table data={sortedArray} title="Search Results" flag="users"></Table>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <div className="users__left">
        <Buttons></Buttons>
      </div>
      <Table message="No Users Are Registered" title="Search Results" flag={null}></Table>
    </Wrapper>
  );
};

export default Users;

const Wrapper = styled.div`
 
  padding: 3rem 2rem;
  display:grid;
  grid-template-columns: 1fr 2fr;
  max-width: 140rem;
  width: 100%;
  margin: auto;
  @media only screen and (max-width: 1200px) {
  grid-template-columns: 1fr;
 }
 
`;