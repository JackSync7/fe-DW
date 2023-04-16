import React, { createContext, useState } from "react"

export const StatusLoginContext = createContext();


export const StatusLoginContextProvider = (props) => {
    const [isLogins, setIslogins] = useState(false)




    return (
        <StatusLoginContext.Provider value={[isLogins, setIslogins]}>
            {props.children}
        </StatusLoginContext.Provider>
    )
}