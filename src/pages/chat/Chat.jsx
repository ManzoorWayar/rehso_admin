import {
  Box,
  Container,
  Typography,
  useTheme,
  IconButton,
  InputBase,
  Badge,
  Divider,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import FlexBetween from "../../components/FlexBetween";
import profile from "../../assets/img/profile.jpeg";
import { Search } from "@mui/icons-material";
import Contact from "./Contact";
import Messages from "./Messages";
import { useGetChatsQuery } from "../../features/chat/chatApiSlice";
import ChatItem from './ChatItem'
import { CirclesWithBar } from "react-loader-spinner"
import { useSelector } from "react-redux";

const Chat = () => {
  const theme = useTheme();

  const {
    data: chats,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetChatsQuery('chatList', {
    // pollingInterval: 1000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  const { chatDetails } = useSelector(state => state.general)

  let content
  if (isLoading) return <CirclesWithBar color="#00b8a5 " height="50" width="50"
    wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '53vh' }} />

  if (isSuccess) {
    const { ids } = chats

    content = ids?.length > 0 && ids.map(chatId => (<ChatItem key={chatId} chatId={chatId} />))

    return (
      <Container maxWidth="xl" sx={{ mt: "20px" }}>
        <Grid container height="75vh">
          <Grid
            className="scrollbar"
            xs={1.7}
            lg={3.5}
            sx={{
              backgroundColor: theme.palette.bgColor[1000],
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
          >
            <Box display="flex" alignItems="center" p="10px" height="70px">
              <Badge
                color="success"
                variant="dot"
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={profile}
                  sx={{ cursor: "pointer" }}
                />
              </Badge>
              <Box
                display={"flex"}
                backgroundColor={theme.palette.light.main}
                borderRadius="20px"
                p="0.1rem 1rem"
                flexGrow={1}
                sx={{
                  display: {
                    xs: "none",
                    lg: "flex",
                    border: `1px solid ${theme.palette.black[1100]}`,
                  },
                  ml: "10px",
                }}
              >
                <IconButton>
                  <Search sx={{ color: theme.palette.grey[800] }} />
                </IconButton>
                <InputBase placeholder="Search..." sx={{ ml: "5px" }} />
              </Box>
            </Box>
            <Divider />
            {/* Chats users and contacts */}
            <Box py="10px" height="70vh" sx={{ overflowY: "scroll" }}>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                  py: "15px",
                  px: "10px",
                  fontSize: {
                    xs: "11px",
                    md: "20px",
                  },
                }}
              >
                Chats
              </Typography>
              {content ? content : <h5 className="d-flex justify-content-center">No Chats Are Exists!</h5>}
            </Box>
          </Grid>

          {/* Messges */}
          <Grid
            className="scrollbar"
            xs={10}
            lg={8}
            sx={{
              backgroundColor: theme.palette.bgColor[600],
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
            flexGrow={1}
          >
            {chatDetails && <Messages chatId={chatDetails} />}
          </Grid>
        </Grid>
      </Container>
    );
  }
};

export default Chat;
