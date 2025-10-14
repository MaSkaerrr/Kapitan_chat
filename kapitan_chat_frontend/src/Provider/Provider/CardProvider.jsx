import { createContext,useContext } from "react"
const context = createContext({});
export default function CardProvider({value,children}){
    return (
        <context.Provider value={value}>
            {children}
        </context.Provider>
    )
}
export const useCardContext = () => useContext(context);