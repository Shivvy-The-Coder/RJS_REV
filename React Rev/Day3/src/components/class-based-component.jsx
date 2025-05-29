import { Component } from "react";
class ClassBasedComponent extends Component
{

    // STate Management 

    // her we dont need to write const as datatype for declaring state varinle because we are inside of class component
    state ={
        showText : false,
        changeColor: false,
        count:0,
        is10:false
    }

    handleClick=()=>{
        console.log("button clicked");
        this.setState({
            showText:!this.state.showText,
        });
    };
    handleColor=()=>{
        console.log("color has been chamged");
        this.setState({
            changeColor:!this.state.changeColor
        });
    };


    // componentDidMount : this will work on page load,  we can use this to call an API on page load , ie an additional task 
    componentDidMount(){
        console.log("This will be active for first time when the page has been loaded")
        this.setState({
            changeColor:!this.state.changeColor,
            showText:!this.state.showText
        })
    }

    // componentDidUpdate : this wil be used any component is updated or props or state value changes
    componentDidUpdate(prevprops , prevstate)
    {   
        console.log("updated ")
        console.log(prevstate , this.state);
        if(prevstate && prevstate.count==10)
            this.setState({
                is10:!this.state.is10,
                count:0
        })

    }

    handleAdd=()=>
    {
        console.log("1 has been added");
        this.setState({
            count:this.state.count+1
        });
    };


    // componentWillUnmount


    componentWillUnmount()
    {
        console.log("Component is getting unmounted");
    }
    render (){
        console.log(this.state.showText)
        return (<div>

            {this.state.showText?(<h3 style={{color:this.state.changeColor?"red":"blue"}}>Class based Components</h3>):""}
            <button onClick={this.handleClick}>Toggle Text</button>
            <button onClick={this.handleColor}>Change Color</button>
            <p>{this.state.count}</p>
            {this.state.is10?<p>count has been stucked to 10</p>:""}
            <button onClick={this.handleAdd}>Increase</button>
        </div>)
    }
}

export default ClassBasedComponent;