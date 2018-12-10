import React from 'react'
import './index.css';
export default class About extends React.Component{

    state={
        name:"",
        plugins: [],
        showNewPlugin: false
    };

    

    change=e =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    } 
    onSubmit=e=>{
        e.preventDefault();
        console.log(this.setState);
    };
      closeNewPlugin(){

        this.setState({showNewPlugin:false});
    
      }

      createPlugin(event){
       
        event.preventDefault();
    
    
        let nom = document.getElementById('namePlugin').value;
    
    
        if(nom === ""){return;}
    
        console.log("nom=" + nom );
    
        let form = new FormData(document.getElementById('formulaireInsertionform'));
    
        fetch('http://localhost:8080/api/plugins', {
    
          method: 'POST',
    
          body: form
    
        }).then((response) => {
    
          if (response.ok) {
    
            return response
    
          } else {
    
            throw new Error('Something went wrong ...');
    
          }
    
        }).catch(error => this.setState({ error, isLoading: false }));
    
        this.closeNewPlugin();
    
      }
    render(){
        return (
            <div id="Globaldiv" >  <h1>Create Plugin</h1>
                <div id="formDiv">
                  <form id="formulaireInsertionform">
                      <input
                      id="namePlugin"
                      type="text"
                      name="nom"
                      required
                      placeholder="name plugin"/>
                      <br/>
                    <button onClick={(event) => this.createPlugin(event)} >Submit</button>
                  </form>
                </div>
            </div>  );
    }
}