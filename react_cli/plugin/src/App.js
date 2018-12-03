import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
      
    this.state = {
      plugins:[],
      maxPag:0,
      nbPlugi:0
    }
    this.update = this.update.bind(this);
  }
  
	update(event){
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name] : value
    });
  }
 
  getDataFromServer() {
     fetch('http://localhost:8080/api/plugins')
     .then(response => {
       return response.json() // transforme le json texte en objet js
     })
     .then(res => { // data c'est le texte json de response ci-dessus
       let plugins = [];
       res.data.forEach((el) => {
         let plugin = {
            name:el.name,
          }
         plugins.push(plugin);
       });
       this.setState({
        plugins: plugins
      });
       
     }).catch(err => {
       console.log("erreur dans le get : " + err)
     });
  }

  getMaxPage(){
    fetch("http://localhost:8080/api/plugin/count")
    .then(response => {
      return response.json();
    }).then(resp => {
      let maxpagevalue = Math.ceil(resp.data/this.state.nbPlugin)-1;
      this.setState({maxPage: maxpagevalue, page:maxpagevalue});

    }).catch(err => {
      console.log("erreur dans le get : " + err)
    });
  }
  
  componentWillMount() {
    console.log("Component will mount");
    this.getDataFromServer();
  }
 
  render() {

    let listePlugins = this.state.plugins.map( (plugin, index) => {
      return(
        <tr v-for="(plugin,index) in filteredplugins" key={index}>
          <td>{plugin.name}</td>
          <td>
          </td>
        </tr>
      )}
    );
    
    return (
      <div id="app">
      <div id="entete">
              Nombre de plugins : {this.state.plugins.length} 
              </div>
                <table  id="myTable" >
                <thead >
                <tr>
                    <th><p>Nom</p></th>
                </tr>
                </thead>
                <tbody>
                   {
                     listePlugins
                   }
                </tbody>
                </table>
              </div>
      
    );
  }
}
export default App;



