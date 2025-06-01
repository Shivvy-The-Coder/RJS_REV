import { useContext } from "react";
import { GlobalContext } from "../../context";

function ContextButtonComponent()
{
    const {handleChangeThemeOnButtonClick} = useContext(GlobalContext);

    return <button onClick={handleChangeThemeOnButtonClick}>ChageTheme</button>
}
export default ContextButtonComponent;