import React,{Component} from "react";

class Form extends Component{

    state={
        name:""
    };

    createPlugin(){
        fetch("http://localhost:8080/api/plugins", )
        .then(response => {
          return response.json();
        }).then(resp => {
          let maxpagevalue = Math.ceil(resp.data/this.state.nbPlugin)-1;
          this.setState({maxPage: maxpagevalue, page:maxpagevalue});
    
        }).catch(err => {
          console.log("erreur dans le get : " + err)
        });
      }

    render(){
        return (
            <div>
        <form>
            <input
            placeholder="name"
            value={this.state.name}
            onChange={e=>this.setState({name:e.target.value})}/>
            
        </form>
        </div>  );
    }
}
export default Form;
