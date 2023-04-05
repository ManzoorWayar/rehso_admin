import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Protected = ({ role, children }) => {
    const { userInfo } = useSelector(state => state.auth)

    if (userInfo.superAdmin)
        return children

    if (!userInfo.superAdmin && userInfo.role === role) {
        return children
    }

    return <Navigate to="/unauthorized" replace />

}

export default Protected