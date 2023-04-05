import React from 'react'
import { assetURI } from '../../utils/assetURI'
import { useDispatch, useSelector } from 'react-redux'
import { setMessageDetails } from '../../features/general/generalSlice'
import { CloseFullscreenTwoTone } from "@mui/icons-material";

const MediaDisplay = ({ image, setImage, setText, setAttachmentsFile }) => {
    const dispatch = useDispatch()

    const { messageDetails } = useSelector((state) => state.general)

    const resetImage = () => {
        setImage(null)
        setAttachmentsFile(null)
    }

    const resetEditMsg = () => {
        dispatch(setMessageDetails(null))
        setText('')
    }

    return (
        <>
            {
                (!image && !messageDetails?.image && messageDetails?.type === "edit") &&
                <div className='d-flex justify-content-between align-items-center edit-box'>
                    <p className=''>Editing</p>
                    <CloseFullscreenTwoTone onClick={resetEditMsg} />
                </div>
            }

            {image ? (
                <div className="position-relative">
                    <CloseFullscreenTwoTone onClick={resetImage} />
                    <img src={image} alt='selected image' width="200px" height="200px" className="media-image" />
                </div>
            )
                : messageDetails?.type === "edit" && (
                    <div className="position-relative">
                        {/* <CloseFullscreenTwoTone size="17" color="#00b8a5" cursor="pointer" className="image-close" onClick={resetEditMsg} /> */}
                        {
                            messageDetails?.image && <img width="200px" height="200px" src={messageDetails?.image}
                                alt='selected image' className="media-image" />
                        }
                    </div>
                )
            }
        </>
    )
}

export default MediaDisplay