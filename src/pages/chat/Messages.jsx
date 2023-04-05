import {
  Box,
  Badge,
  Avatar,
  Divider,
  IconButton,
  useTheme,
  Typography,
  InputBase,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import profile from "../../assets/img/profile.jpeg";
import { VideoCall, Call, KeyboardVoice, DoneAll } from "@mui/icons-material";
import { CirclesWithBar } from "react-loader-spinner"
import { useEffect, useRef } from "react";
import { useGetMessagesQuery } from "../../features/chat/messageApiSlice";
import { useSelector } from 'react-redux'
import MessageItem from "./MessageItem";
import ChatForm from "./ChatForm";

const Messages = ({ chatId }) => {
  const theme = useTheme();

  const scrollRef = useRef()

  const {
    data: messages,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetMessagesQuery(chatId, {
    // pollingInterval: 1000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }

  }, [messages])

  let content
  if (isLoading) return <CirclesWithBar color="#00b8a5 " height="50" width="50"
    wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '53vh' }} />

  if (isSuccess) {
    const { ids } = messages

    content = ids?.length > 0 && ids.map(messageId => (<MessageItem key={messageId} messageId={messageId} />))

    return (
      <Box height="75vh" width="100%" sx={{ position: "relative" }}>
        <FlexBetween px="20px" height="70px">
          <Box
            display="flex"
            sx={{
              py: "10px",
            }}
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
              sx={{ ml: "10px" }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "600", color: theme.palette.grey[900] }}
              >
                Sara Sussan
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: theme.palette.grey[800], fontWeight: "bold" }}
              >
                Web developer
              </Typography>
            </Box>
          </Box>
          <FlexBetween>
            <IconButton>
              <Call
                sx={{ color: theme.palette.primary.main, fontSize: "25px" }}
              />
            </IconButton>
            <IconButton>
              <VideoCall
                sx={{ color: theme.palette.primary.main, fontSize: "25px" }}
              />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        <Divider />

        <ChatForm chatId={chatId} />

        <Box
          className="messages-container "
          display="flex"
          flexDirection="column"
          gap="10px"
          sx={{ p: "20px", overflowY: "scroll", height: "70vh" }}
        >
          {content}
        </Box>
      </Box>
    );
  }
};

export default Messages;
