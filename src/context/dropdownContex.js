import React, { createContext, useState } from "react"

export const DropdownContext = createContext();

export const DropdownContextProvider = (props) => {
    const [adminDown, setAdminDown] = useState(false)


    return (
        <DropdownContext.Provider value={[adminDown, setAdminDown]}>
            {props.children}
        </DropdownContext.Provider>
    )
}