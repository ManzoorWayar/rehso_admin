import {
    Box,
    Avatar,
    useTheme,
    Typography,
} from "@mui/material";
import profile from "../../assets/img/profile.jpeg";
import { DoneAll } from "@mui/icons-material";
import { ThreeDots } from "react-loader-spinner"
import { useEffect, useRef } from "react";
import { useGetMessagesQuery } from "../../features/chat/messageApiSlice";
import { useSelector } from "react-redux";
import MessageAction from './MessageAction'

const MessageItem = ({ messageId }) => {
    const theme = useTheme();
    const { chatDetails } = useSelector(state => state.general)

    const { message } = useGetMessagesQuery(chatDetails, {
        selectFromResult: ({ data }) => ({
            message: data?.entities[messageId],
        }),
    })

    if (!message) return <ThreeDots color="#00b8a5 " height="50" width="50" />

    return (
        <>
            {message?.userType === 'Admin' ?
                <>
                    <Box className="sender" alignSelf="end">
                        <Box display="flex" alignItems="start">
                            <Box
                                display="flex"
                                flexDirection="column"
                                gap="10px"
                                alignItems="end"
                                sx={{ mr: "10px" }}
                            >
                                <div className="reply-show-msg">
                                    {message?.replyTo && message?.preText &&
                                        <div className="d-flex">
                                            <div className="d-flex flex-column ps-2">
                                                <h6>{message?.user?.fullName}</h6>
                                                <p>{message?.preText}</p>
                                            </div>
                                        </div>
                                    }
                                </div>
                                {message?.image && < img src={message?.image} width="150px" height="150px" alt="image" />}
                                <Typography
                                    variant="body1"
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        p: "10px",
                                        borderRadius: "5px",
                                        borderTopRightRadius: "0",
                                    }}
                                >
                                    {message?.text}
                                </Typography>
                                <MessageAction message={message} />
                            </Box>
                            <Avatar
                                alt="Remy Sharp"
                                src={profile}
                                sx={{ width: 34, height: 34 }}
                            />
                        </Box>
                        <Box
                            display="flex"
                            className="time"
                            sx={{ float: "right", mr: "44px", mt: "10px" }}
                        >
                            <DoneAll color="success" sx={{ mr: "5px" }} />
                            <Typography sx={{ color: theme.palette.grey[800] }}>
                                12:45 Am
                            </Typography>
                        </Box>
                    </Box>
                </>
                :
                <>
                    <Box className="receiver" alignSelf="start">
                        <Box display="flex" flexDirection="row-reverse" alignItems="start">
                            <Box
                                display="flex"
                                flexDirection="column"
                                gap="10px"
                                alignItems="start"
                                sx={{ ml: "10px" }}
                            >
                                {message?.replyTo && message?.preText &&
                                    <div className="d-flex">
                                        <div className="d-flex flex-column ps-2">
                                            <h6>{message?.user?.fullName}</h6>
                                            <p>{message?.preText}</p>
                                        </div>
                                    </div>
                                }
                                {message?.image && < img src={message?.image} width="150px" height="150px" alt="image" />}
                                <Typography
                                    variant="body1"
                                    sx={{
                                        backgroundColor: theme.palette.bgColor[1000],
                                        p: "10px",
                                        borderRadius: "5px",
                                        borderTopLeftRadius: "0",
                                    }}
                                >
                                    {message?.text}
                                </Typography>
                                {/* <Typography
                                    variant="body1"
                                    sx={{
                                        backgroundColor: theme.palette.bgColor[1000],
                                        p: "10px",
                                        borderRadius: "5px",
                                        borderTopLeftRadius: "0",
                                    }}
                                >
                                </Typography> */}
                            </Box>
                            <Avatar
                                alt="Remy Sharp"
                                src={profile}
                                sx={{ width: 34, height: 34 }}
                            />
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row-reverse"
                            className="time"
                            sx={{ float: "left", ml: "44px", mt: "10px" }}
                        >
                            <DoneAll color="success" sx={{ ml: "5px" }} />
                            <Typography sx={{ color: theme.palette.grey[800] }}>
                                12:45 Am
                            </Typography>
                        </Box>
                    </Box>
                </>
            }
        </>
    )
}

export default MessageItem