import React from "react"
import { assetURI } from "../../utils/assetURI"
import { useDispatch, useSelector } from "react-redux"
import { setMessageDetails } from "../../features/general/generalSlice"
import { CloseOutlined } from "@mui/icons-material";

const ReplyBox = () => {
    const dispatch = useDispatch()
    const { messageDetails } = useSelector((state) => state.general)

    const closeReplyBox = () => dispatch(setMessageDetails(null))

    let content;

    if (messageDetails.text)
        content = (
            <p className="m-auto">
                {messageDetails?.text.length > 20
                    ?
                    `${messageDetails?.text.substring(0, 20)}...`
                    :
                    messageDetails?.text}
            </p>
        )

    if (messageDetails.image)
        content = (<img
            src={messageDetails?.image}
            width={30}
            height={10}
        />)

    if (messageDetails?.image && messageDetails.text)
        content = (
            <>
                <img
                    src={messageDetails?.image}
                    width={30}
                    height={10}
                />
                <p className="m-auto">
                    {messageDetails?.text.length > 20
                        ?
                        `${messageDetails?.text.substring(0, 20)}...`
                        :
                        messageDetails?.text}
                </p>
            </>
        )

    return (
        <div className="d-flex justify-content-between align-items-center reply-part h-70">
            <div className="d-flex justify-content-between gap-3">
                {content}
            </div>
            <CloseOutlined onClick={closeReplyBox} />
        </div>
    )
}

export default ReplyBox
