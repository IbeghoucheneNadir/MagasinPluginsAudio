import React from 'react'
import './index.css';
import {Link} from 'react-router-dom';
export default class DetailsPlugin extends React.Component{


  constructor(props){
    super(props);
    this.state = {
    plugin:'',
    a:'',
    id:''
    //   plugin: this.props.match.params._id
      }
} 

getDataFromServer() {

  const search =this.props.location.search;
  const params = new URLSearchParams(search);
  const id=this.props.match.params.id;
  fetch('http://localhost:8080/api/plugins/'+id)

  .then(response => response.json())
  // ...then we update the users state
  .then(data =>
    this.setState({
      plugin: data,
      id:id
    })
  )
  // Catch any errors we hit and update the app
  .catch(error => this.setState({ error }));
}

 componentWillMount() {
    console.log("Component will mount   1 ");
    this.getDataFromServer();
  }   
     
    render(){

      let plug=this.state.plugin.plugin;
      let name = "ups";
      let img="";

      if(plug) {
        console.log(plug.name); 
        //debugger; 
        name = plug.name;  
        img=plug.screenshot_href;
      }

      return (
          <div>
            <div id="pagePluginDetail">
              <br/>
                    <h1><center>Inspiration in all the Classics</center></h1>
                    <br/>
             </div>                 
             <div id="blocDetailImage">
                    <div>{name}</div>
                    <div>{name}</div>
                    <div>{name}</div>
                    <div>{img}</div>
                    <div> {<img src={img} alt=""/>}</div>
                    <br/><br/><br/>
             </div>           
          </div>
      )
  }
}
