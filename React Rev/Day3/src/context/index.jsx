// 2.need to import the createCOntext from react
import { createContext } from "react";
// 1.create a context 3.export the GLobalCOntext
export const GlobalContext = createContext(null);

// 4.creat ethe global state the recieve the component as children

function GlobalState({children})
    {
        return <GlobalContext.Provider  value={{}}>{children}</GlobalContext.Provider>
    }
export default  GlobalState;