import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessageDetails, setReplyMessage, setShowDeleteBox } from "../../features/general/generalSlice"

const MessageAction = ({ message }) => {

    const dispatch = useDispatch()

    const { chatDetails } = useSelector(state => state.general)

    // const handleDeleteMessage = () => {
    //     dispatch(setShowDeleteBox(true))
    //     setShow(false)
    //     dispatch(setReplyMessage(
    //         {
    //             chatId: chatDetails?.chatId,
    //             msgId: message._id,
    //             type: null
    //         }
    //     ))
    // }

    const handleReplyMessage = () => {
        dispatch(setMessageDetails(
            {
                chatId: chatDetails,
                msgId: message._id,
                text: message.text,
                image: message.image,
                type: 'reply'
            }
        ))
        // setShow(false)
    }

    const handleEditMessage = () => {
        dispatch(setMessageDetails(
            {
                chatId: chatDetails,
                msgId: message._id,
                text: message.text,
                image: message.image,
                type: 'edit'
            }
        ))
        // setShow(false)
    }

    return (
        <div>
            <button onClick={handleReplyMessage}>reply</button>
            <button onClick={handleEditMessage}>edit</button>
            <button>delete</button>
        </div>
    )
}

export default MessageAction