import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AgentView = () => {
    const isAgent = useSelector((state) => state?.auth?.user?.is_agent)
    useEffect(() => {
        if (isAgent === undefined || !isAgent) {
            window.location.href="/"
        }
    }, [isAgent])
    return (
        <>
             <h1>Agent Home</h1>
        </>
    )
}