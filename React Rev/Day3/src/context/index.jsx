// 2.need to import the createCOntext from react
import { createContext, useState } from "react";
// 1.create a context 3.export the GLobalCOntext
export const GlobalContext = createContext(null);

// 4.creat ethe global state the recieve the component as children



function GlobalState({children})
    {
        const [theme,setTheme] = useState('light');
        function handleChangeThemeOnButtonClick ()
            {
                setTheme(theme==='light'?'dark':'light');
            }

        return <GlobalContext.Provider  value={{theme,handleChangeThemeOnButtonClick}}>{children}</GlobalContext.Provider>
    }
export default  GlobalState; 