import React, {useEffect,useState, createContext} from 'react'
import  {firebase}  from './initializeApp'
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext<any>(undefined)



export const AuthProvider: React.FC = ({children} ) => {
    
    firebase()

    const auth = getAuth();
    const [user, setUser] = useState<any>(undefined)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(undefined)
            }
          });
    }, [])

    return (
    <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
    )
}
  


