import React, { createContext, useState } from "react"

export const ModalLoginContext = createContext();


export const ModalLoginContextProvider = (props) => {
    const [loginModal, setLoginModal] = useState(false)

    return (
        <ModalLoginContext.Provider value={[loginModal, setLoginModal]}>
            {props.children}
        </ModalLoginContext.Provider>
    )
}