import {
    Box,
    IconButton,
    useTheme,
    InputBase,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import { PhotoCamera, SendAndArchiveOutlined } from "@mui/icons-material";
import { CirclesWithBar } from "react-loader-spinner"
import { useEffect, useState, useRef } from "react";
import { useAddMessageMutation, useEditMessageMutation, useGetMessagesQuery, useReplyMessageMutation } from "../../features/chat/messageApiSlice";
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next"
import MediaDisplay from './MediaDisplay'
import ReplyBox from './ReplyBox'
import { setMessageDetails } from "../../features/general/generalSlice";

const ChatForm = ({ chatId }) => {
    const [attachmentsFile, setAttachmentsFile] = useState(null)
    const [image, setImage] = useState(null)
    const [text, setText] = useState('')

    const theme = useTheme();

    const dispatch = useDispatch()
    const { t } = useTranslation()

    const { messageDetails } = useSelector((state) => state.general)

    useEffect(() => {
        if (messageDetails?.type === 'edit') {
            setText(messageDetails?.text)
        }
    }, [messageDetails]);

    const [addMessage, { isLoading, isSuccess, isError, error }] =
        useAddMessageMutation()

    const [
        EditMessage,
        { isSuccess: isEditSuccess, isError: isEditError, error: Editerror },
    ] = useEditMessageMutation()

    const [
        addReplyMessage,
        { isSuccess: isReplySuccess, isError: isReplyError, error: Replyerror },
    ] = useReplyMessageMutation()

    const onChange = (e) => {
        const reader = new FileReader()
        const files = e.target.files
        reader.onload = () => {
            setImage(reader.result)
            setAttachmentsFile(e.target.files[0])
        }
        reader.readAsDataURL(files[0])
    }

    const sendMessage = async () => {
        try {
            if (messageDetails?.type === "reply") {
                await addReplyMessage({
                    chatId: messageDetails.chatId,
                    msgId: messageDetails.msgId,
                    text,
                    preText: messageDetails.text,
                }).unwrap()

                dispatch(setMessageDetails(null))
                setAttachmentsFile(null)
                setImage(null)
                setText('')
            } else {

                const formData = new FormData()
                formData.append("text", text)
                formData.append("attachments", attachmentsFile)

                if (messageDetails?.type === "edit")
                    await EditMessage({
                        chatId: messageDetails.chatId,
                        msgId: messageDetails.msgId,
                        formData,
                    }).unwrap()
                else
                    await addMessage({ formData, chatId }).unwrap()

                dispatch(setMessageDetails(null))
                setAttachmentsFile(null)
                setImage(null)
                setText('')
            }


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.bgColor[1000],
                mx: "10px",
                px: "10px",
                position: "absolute",
                bottom: "0",
                // left: "0",
                width: "95%",
                borderRadius: "20px",
                py: "5px",
            }}
        >
            {messageDetails?.type === "reply" && <ReplyBox />}
            <MediaDisplay image={image} setImage={setImage} setAttachmentsFile={setAttachmentsFile} setText={setText} />

            <Box display="flex" alignItems="center">
                <Box flexGrow={1}>
                    <InputBase
                        placeholder="Type your message here..."
                        sx={{ ml: "5px", fontWeight: "bold" }}
                        fullWidth
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </Box>
                <FlexBetween>
                    <FlexBetween sx={{ mt: "20px" }}>
                        <FlexBetween>
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="label"
                            >
                                <input
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={onChange}
                                />
                                <PhotoCamera />
                            </IconButton>
                        </FlexBetween>
                    </FlexBetween>

                    <IconButton onClick={sendMessage}>
                        <SendAndArchiveOutlined sx={{ color: theme.palette.grey[800] }} />
                    </IconButton>
                </FlexBetween>
            </Box>
        </Box>
    )
}

export default ChatForm