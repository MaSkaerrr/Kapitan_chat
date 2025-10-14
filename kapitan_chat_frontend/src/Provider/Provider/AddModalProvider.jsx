import { createContext,useContext } from "react"
const context = createContext({});
export default function AddModalProvider({value,children}){
    return (
        <context.Provider value={value}>
            {children}
        </context.Provider>
    )
}
export const AddModalContext = () => useContext(context);