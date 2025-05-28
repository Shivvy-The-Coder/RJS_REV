import { Component } from "react";
class ClassBasedComponent2 extends Component
{
    
    state={
            count:0
    }
    
    handleAdd=()=>{
        console.log("1 has been added");
                this.setState({
            count:this.state.count+1
            
        });
    };
    handleMinus=()=>{
        if(this.state.count>0){
        console.log("1 has been Subtracted");
                this.setState({
            count:this.state.count-1
        });}
    };
    render()
    {
        return(
        <>
        <h1>Hello this is Shivam</h1>
        <p>{this.state.count}</p>
        <button onClick={this.handleAdd}>Add </button>
        <button onClick={this.handleMinus}>Minus</button>
        </>
        )}

}
export default ClassBasedComponent2;