import React, {useState, useEffect, useRef} from 'react';
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Button} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { getCommunityUserEn, updateSubscriptionDetailsEn} from '../../../features_en/profile/profileSlice';
import Compress from 'compress.js';
import axios from "axios";
import Dropzone, { useDropzone } from "react-dropzone";
import { getUserFromLocalStorage } from '../../../utils/localStorage';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

export default function SubscriptionVerification(props) {
   
    const [images, setImages] = useState([]);
    const { user, isLoading } = useSelector(
        (state) => state.profileEn
    );
   
    const [wait, setWait] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCommunityUserEn());
        // eslint-disable-next-line
    }, [])

    const { isDragActive, isDragAccept, isDragReject } = useDropzone();
    const compress = new Compress();
    // Styles
    const style = React.useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        //  API CALL.
        if(user?.profile){
            //'6351ffd902ff67c2bfac755f'
            //console.log(user.profile._id)
        dispatch(
            updateSubscriptionDetailsEn({
                subscriptionPackage : props.pacakgeName[0]._id,
                subscriptionVerificationImage: images[0],
                profileId: user.profile._id,
                subscriptionVerified : false
            })
        );
        }
    };
    return (
        <Wrapper>
        <div className="popup-box">
          <div className="box">
            <span className="close-icon" onClick={props.handleClose}>x</span>
            <div style={{"textAlign" : "center", "fontSize" : '20px'}}>
            <b>Please Send {props.content} Riyals in the below Account Number and Upload the Receipt Screenshot</b>
            </div>
            <div style={{"textAlign" : "center", "fontSize" : '20px', "color" : "blue"}}>
            <b>22334455667788</b>
            </div>
            <br></br>
            {/* <Button variant="contained" component="label" style={{"marginLeft" : "45%"}}>
                Upload
                <input hidden accept="image/*" multiple type="file" />
                </Button>
                <IconButton  color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" />
                <PhotoCamera/>
                </IconButton>  */}
                <Dropzone
                        onDrop={(acceptedFiles) => {
                            setWait(true);
                            compress.compress(acceptedFiles, {
                                size: 1,
                                quality: 0.7,
                                maxHeight: 1080,
                                maxWidth: 1080,
                            }).then((data) => {


                                data.map((image) => {
                                    const base64str = image.data;
                                    const imgExt = image.ext;
                                    const file = Compress.convertBase64ToFile(base64str, imgExt);

                                    const formData = new FormData();

                                    formData.append("file", file);
                                    formData.append("upload_preset", "kae4qxnj");

                                    axios.post("https://api.cloudinary.com/v1_1/mahnty/image/upload", formData).then((Response) => {
                                        setImages((images) => [...images, Response.data.secure_url]);
                                    })

                                    return null;
                                })

                            });
                        }}
                        accept="image/*"
                        name="heroImage"
                        maxFiles={1}
                        multiple={false}
                        maxSize={10 * 1024 * 1024}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: "dropzone", style })}>
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <p className="drop">Drop the files here ...</p>
                                ) : (
                                    <p className="drop">
                                        Drag 'n' Drop Only Image Files Here, or Click to
                                        Select Files
                                        <br />
                                        (Only 1 Image File Can be Selected)
                                    </p>
                                )}
                            </div>
                        )}
                    </Dropzone>
                    <Typography align='center'>
                    <Button onClick={handleSubmit} variant="contained" component="label" style={{"justifyContent" : "center", "marginTop" : "5%"}}>
                    Submit Payment Request
            
                    </Button>
                    </Typography>
  
          </div>
        </div>
        </Wrapper>
      );
    
  }
  const Wrapper = styled.section`
   /* Popup style */
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
  width: 50%;
  margin: 0 auto;
  height: auto;
  max-height: 70vh;
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
  right: calc(15% - 30px);
  top: calc(100vh - 85vh - 33px);
  background: #ededed;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  border: 1px solid #999;
  font-size: 20px;
}`
  ;
  
const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    textAlign: "center",
};

const activeStyle = {
    borderColor: "#2196f3",
};

const acceptStyle = {
    borderColor: "#00e676",
};

const rejectStyle = {
    borderColor: "#ff1744",
};
  
  