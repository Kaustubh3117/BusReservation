import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SideBar } from "./assets/SideBar";

export const AgentView = () => {
    const isAgent = useSelector((state) => state?.auth?.user?.is_agent)
    // useEffect(() => {
    //     if (isAgent === undefined || !isAgent) {
    //         window.location.href="/"
    //     }
    // }, [isAgent])
    return (
        <>
        <SideBar/>
             <h1>Agent Home</h1>
        </>
    )
}