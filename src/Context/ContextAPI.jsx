import React, { createContext, useEffect, useState } from 'react'

export const addResponseContext = createContext()
export const editResponseContext = createContext()
export const isAuthorizedContext = createContext()

// inorder to pass state updating function and state store to the required components the component should be children of contextAPI
// check main.jsx
// by doing so  all the component becomes the childre of contextAPI

function ContextAPI({ children }) {

    const [addResponse, setAddResponse] = useState("")

    const [editResponse, setEditResponse] = useState("")

    const [isAuhtorized, setIsAuhtorized] = useState(false)
    useEffect(() => {

        if(sessionStorage.getItem("token")){
            setIsAuhtorized(true)
        }
        else{
            setIsAuhtorized(false)
        }
      
    }, [])
    
    return (
        <>
            <isAuthorizedContext.Provider value={{ isAuhtorized, setIsAuhtorized }}>


                <editResponseContext.Provider value={{ editResponse, setEditResponse }}>

                    <addResponseContext.Provider value={{ addResponse, setAddResponse }}>

                        {children}

                    </addResponseContext.Provider>

                </editResponseContext.Provider>
            </isAuthorizedContext.Provider>


        </>
    )
}

export default ContextAPI