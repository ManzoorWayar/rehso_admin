import React from 'react'
import { Box, Typography, Avatar, Badge, useTheme } from "@mui/material";
import profile from "../../assets/img/profile.jpeg";
import FlexBetween from "../../components/FlexBetween";
import { useGetChatsQuery } from '../../features/chat/chatApiSlice'
import { setChatDetails } from '../../features/general/generalSlice';
import { useDispatch } from 'react-redux';

const ChatItem = ({ chatId }) => {
    const theme = useTheme();
    const dispatch = useDispatch()

    const { chat } = useGetChatsQuery('chatsList', {

        selectFromResult: ({ data }) => ({
            chat: data?.entities[chatId],
        }),
    })

    const getChatId = () => {
        dispatch(setChatDetails(chat?._id))
    }

    return (
        <Box
            display="flex"
            sx={{
                py: "10px",
                px: "10px",
                cursor: "pointer",
                ":hover": { backgroundColor: theme.palette.bgColor[500] },
            }}
            onClick={getChatId}
        >
            <Badge
                color="warning"
                variant="dot"
                overlap="circular"
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <Avatar alt="Remy Sharp" src={profile} />
            </Badge>
            <Box
                display="flex"
                flexDirection="column"
                width="100%"
                sx={{
                    ml: "5px",
                    display: {
                        xs: "none",
                        lg: "flex",
                    },
                }}
            >
                <FlexBetween>
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: "600", color: theme.palette.grey[900] }}
                    >
                        {chat?.client_id?.fullName}
                    </Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.grey[800] }}>
                        {
                            new Date(chat?.messages[0]?.createdAt).toDateString()
                        }
                    </Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography
                        variant="body1"
                        sx={{ color: theme.palette.grey[800], fontWeight: "bold" }}
                    >
                        {chat?.messages[0]?.text}
                    </Typography>
                    {/* {hasMessage && (
                        <Box sx={{ mr: "10px" }}>
                            <Badge badgeContent={4} color="error"></Badge>
                        </Box>
                    )} */}
                </FlexBetween>
            </Box>
        </Box>
    );
}

export default ChatItem