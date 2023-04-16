import React, { createContext, useState } from "react"

export const ModalContext = createContext();


export const ModalContextProvider = (props) => {
    const [isLogin, setIslogin] = useState(false)
    return (
        <ModalContext.Provider value={[isLogin, setIslogin]}>
            {props.children}
        </ModalContext.Provider>
    )
}