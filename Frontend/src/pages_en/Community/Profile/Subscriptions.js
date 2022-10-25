import React, {useState, useEffect, useRef} from 'react';
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { TextField, Button, InputAdornment } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaCheck, FaTimes } from "react-icons/fa";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from "react-redux";
import SubscriptionVerification from './SubscriptionVerification';
import { getCommunityUserEn, updateSubscriptionDetailsEn} from '../../../features_en/profile/profileSlice';
import { toast } from 'react-toastify';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  export default function Subscriptions(props) {
    const { user, isLoading } = useSelector(
      (state) => state.profileEn
  );
const [clickedButton, setClickedButton] =useState(false);
const [show, setShow] = useState(true);
const [pkgName, setpkgName] = useState("");
const [lookupsubsData, setLookupsubsData] = useState([]);
const [subId, setsubId] = useState("");
const [subsc, setsubs] = useState([]);

const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCommunityUserEn());
        // eslint-disable-next-line
    }, [])

    console.log(user);

const NUMBER_OF_subsData_PER_BRANCH = 11;

var subsArrayData = [];
if(props.content !== null){
subsArrayData = [
 { subsName: "Category", subsData: ["Creator Profile & Idea Book", "Add to Community", "Client's Review", "Project Limit", "Share Profile", "Priority Display Search", "Promotions", "Quotations", "Video Profile Preview", "Verification Discount", "Subscription", "New User"] },
 { subsName: "Gold", subsData: [props.content.data[0].creatorProfileAndIdeaBook, props.content.data[0].addToCommunity, props.content.data[0].clientsReview, props.content.data[0].projectLimit, props.content.data[0].shareProfile, props.content.data[0].priorityDisplaySearch, props.content.data[0].promotion, props.content.data[0].quotation, props.content.data[0].videoProfilePreview, props.content.data[0].verificationDiscount, props.content.data[0].subscriptionTime, props.content.data[0].newUser] },
 { subsName: "Silver", subsData: [props.content.data[1].creatorProfileAndIdeaBook, props.content.data[1].addToCommunity, props.content.data[1].clientsReview, props.content.data[1].projectLimit, props.content.data[1].shareProfile, props.content.data[1].priorityDisplaySearch, props.content.data[1].promotion, props.content.data[1].quotation, props.content.data[1].videoProfilePreview, props.content.data[1].verificationDiscount, props.content.data[1].subscriptionTime, props.content.data[1].newUser] },
 { subsName: "Starter", subsData: [props.content.data[2].creatorProfileAndIdeaBook, props.content.data[2].addToCommunity, props.content.data[0].clientsReview, props.content.data[0].projectLimit, props.content.data[2].shareProfile, props.content.data[2].priorityDisplaySearch, props.content.data[2].promotion, props.content.data[2].quotation, props.content.data[2].videoProfilePreview, props.content.data[2].verificationDiscount, props.content.data[2].subscriptionTime, props.content.data[2].newUser] }
];
}
let bEmp = [];
    subsArrayData.forEach((el) => {
      bEmp.push(el.subsName);
    });
    
    const subscc = [...bEmp];
    let arrLp = [];
        for (let j = 0; j < NUMBER_OF_subsData_PER_BRANCH; j++) {
          let arrayLookup = [];
          for (let i = 0; i < subsArrayData.length; i++) {
            arrayLookup.push(subsArrayData[i].subsData[j]);
          }
          arrLp.push(arrayLookup);
        }
      const lookupsSubs = [...arrLp];
   //console.log(lookupsSubs);
   //console.log(subscc);   

const hideModal = () => {
  props.contentRow(false);
          setShow(false);
        };
      
      const subscribePackage = () =>{
        if(user!==null){
        var currPack = props.content.data.filter(x => x._id === user.profile.subscriptionPackage);
        var newPack = props.content.data.filter(x => x.name_en === 'Starter');
        if(currPack[0]._id === newPack[0]._id){
          toast.error("You already have this pakage");
        }
        else{
        setClickedButton(!clickedButton);
        setpkgName(props.content.data.filter(x => x.name_en === 'Starter'));
        }
      }
      };
      const subscribeSilverPackage = () =>{
        if(user!==null){
        var currPack = props.content.data.filter(x => x._id === user.profile.subscriptionPackage);
        var newPack = props.content.data.filter(x => x.name_en === 'Silver');
        if(currPack[0]._id === newPack[0]._id){
          toast.error("You already have this pakage");
        }else{
        setClickedButton(!clickedButton);
        setpkgName(props.content.data.filter(x => x.name_en === 'Silver'));
        }
      }
      };
      const subscribeGoldPackage = () =>{
        if(user!==null){
        var currPack = props.content.data.filter(x => x._id === user.profile.subscriptionPackage);
        var newPack = props.content.data.filter(x => x.name_en === 'Gold');
        if(currPack[0]._id === newPack[0]._id){
          toast.error("You already have this pakage");
        }else{
        setClickedButton(!clickedButton);
        setpkgName(props.content.data.filter(x=>x.name_en === 'Gold'));
        }
      }
      };
    return (
              <Wrapper>
              {show && props.content.data.length > 0 &&
            <div className="popup-box">
            <section className="box">
            <span className="close-icon" onClick={hideModal}>x</span>
            <Paper>
            {show && props.content.data.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    {subscc.map((el) => (
                      <TableCell style={{"fontSize": "15px", "fontStyle" : "bold"}}><b>{el}</b></TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lookupsSubs.map((el, i) => (
                    <>
                    <TableRow key={i}>
                      {el.map((emp) => {
                        if(emp === "true"){
                          return(
                            <TableCell style={{"fontSize": "12px"}}><FaCheck /></TableCell>
                          );
                        }
                        if(emp === true){
                          return(
                            <TableCell style={{"fontSize": "12px"}}><FaCheck/></TableCell>
                          );
                        }
                        if(emp === false){
                          return(
                            <TableCell style={{"fontSize": "12px"}}><FaTimes /></TableCell>
                          );
                        }
                        if(emp === "false" || emp === "No" || emp === "None"){
                          return(
                            <TableCell style={{"fontSize": "12px"}}><FaTimes /></TableCell>
                          );
                        }
                        else{
                          return(
                        <TableCell style={{"fontSize": "12px"}}>{emp}</TableCell>
                          );
                        }
                      })}
                    </TableRow>
                    </>
                  ))}
                </TableBody>
                <TableRow>
                <TableCell></TableCell>
                      <TableCell style={{"fontSize": "12px"}}><Button variant="contained" onClick={subscribeGoldPackage}>Let's Upgrade</Button></TableCell>
                      <TableCell style={{"fontSize": "12px"}}><Button variant="contained" onClick={subscribeSilverPackage}>Let's Upgrade</Button></TableCell>
                      <TableCell style={{"fontSize": "12px"}}><Button variant="contained" onClick={subscribePackage}>Let's Upgrade</Button></TableCell>
                  </TableRow>
              </Table>
            )}
      
            
          </Paper>
            </section>
              <FaTimes onClick={hideModal} style={{"fontSize": "30px", "color" : "white", "cursor" : "pointer"}}/>
            </div>
              }
      {clickedButton &&
      <SubscriptionVerification
        content={<>
              3000
            </>}
            pacakgeName = {pkgName}
            profileId = {props.profileId}
            handleClose={subscribePackage}
            />
      }
            </Wrapper>
          );
          

  }
  const Wrapper = styled.section`
  .popup-box {
  position: fixed;
  background: #00000050;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
}

.box {
  position: relative;
  width: 80%;
  margin: 0 auto;
  height: auto;
  max-height: 80vh;
  margin-top: calc(100vh - 85vh - 20px);
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  border: 1px solid #999;
  overflow: auto;
}
.close-icon {
  content: 'x';
  cursor: pointer;
  position: fixed;
  right: calc(10% - 30px);
  top: calc(100vh - 85vh - 33px);
  background: #ededed;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  border: 1px solid #999;
  font-size: 20px;
}
   .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }
  
  .modal-main {
    position: fixed;
    background: white;
    width: 80%;
    height: 100%;
    border-radius: 55px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .display-block {
    display: block !important;
  }
  
  .display-none {
    display: none;
  }`
  ;
