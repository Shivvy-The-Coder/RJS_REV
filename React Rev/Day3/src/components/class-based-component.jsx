import { Component } from "react";
class ClassBasedComponent extends Component
{

    // STate Management 

    // her we dont need to write const as datatype for declaring state varinle because we are inside of class component
    state ={
        showText : false,
        changeColor: false
    }

    handleClick=()=>{
        console.log("button clicked");
        this.setState({
            showText:!this.state.showText,
            changeColor:!this.state.changeColor
            
        });
    };
    handleColor=()=>{
        console.log("color has been chamged");
        this.setState({
            changeColor:!this.state.changeColor
        });
    };
    render (){
        console.log(this.state.showText)
        return (<div>

            {this.state.showText?(<h3 style={{color:this.state.changeColor?"red":"blue"}}>Class based Components</h3>):""}
            <button onClick={this.handleClick}>Toggle Text</button>
            <button onClick={this.handleColor}>Change Color</button>
        </div>)
    }
}

export default ClassBasedComponent;