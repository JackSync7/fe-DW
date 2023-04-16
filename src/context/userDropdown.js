import React, { createContext, useState } from "react"

export const UserDropDownContext = createContext();


export const UserDropDownProvider = (props) => {
    const [dropDown, setDropDown] = useState(false)

    return (
        <UserDropDownContext.Provider value={[dropDown, setDropDown]}>
            {props.children}
        </UserDropDownContext.Provider>
    )
}