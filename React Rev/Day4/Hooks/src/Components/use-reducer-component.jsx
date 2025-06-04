import { useReducer } from "react";
const currentState= {
    showTextFlag : false,
    changeTextStyleFlag : false
}
const SHOW_TEXT= "SHOW_TEXT";
const HIDE_TEXT= "HIDE_TEXT";
const TOGGLE_TEXT= "TOGGLE_TEXT";


function reducer(state,action)
{
    switch(action.type)
    {
        case SHOW_TEXT:
            return {
                    ...state,
                   showTextFlag : true,
            }
        case HIDE_TEXT:
            return {
                ...state,
                    showTextFlag : false,
            }
        case TOGGLE_TEXT:
            return {
                    ...state,
                    changeTextStyleFlag:!state.changeTextStyleFlag
            }
        default:
            return state;
        
    }
}
function UseReducerExample()
{

    const [state,dispatch] = useReducer(reducer,currentState);
    console.log(state);
    return(
        <div >
            {state.showTextFlag?(
                <h3 style={{
                        color:state.changeTextStyleFlag?"red":"blue",
                        backgroundColor:state.changeTextStyleFlag?"blue":"red",
                }}            
            >Hello this is Shivamm,</h3>):''}
            <button onClick={()=>dispatch({type:SHOW_TEXT})}>Show Text</button>
            <button onClick={()=>dispatch({type:HIDE_TEXT})}>Hide Text</button>
            <button onClick={()=>dispatch({type:TOGGLE_TEXT})}>Toggle TextStyle</button>
        </div>
    )
}

export default UseReducerExample;