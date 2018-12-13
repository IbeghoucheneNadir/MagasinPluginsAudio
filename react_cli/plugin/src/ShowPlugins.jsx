import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import searchLogo from './images/search.png';

export default class ShowPlugins extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            plugins:[],
            maxPag:0,
            nbPlugi:0,
            plugin:null
          }
    }
      
  componentWillMount() {
    console.log("Component will mount");
    this.getDataFromServer();
  }

  getDataFromServer() {
    fetch('http://localhost:8080/api/plugins')
    .then(response => {
      return response.json() // transforme le json texte en objet js
    })
    .then(res => { // data c'est le texte json de response ci-dessus
      let plugins = [];
      res.data.forEach((el) => {
        if(el.name.length>30){
        let plugin = {
           _id:el._id,
           name:el.name,
           screenshot_href:el.screenshot_href
         }
        plugins.push(plugin);
       } });
      this.setState({
       plugins: plugins
     });
      
    }).catch(err => {
      console.log("erreur dans le get : " + err)
    });
 }

  getMaxPage(){
    fetch("http://localhost:8080/api/dataPlugin/count")
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
      console.log(this.state.plugins);

          let listePlugins = this.state.plugins.map( (plugin, index) => {
            return(    
              <Link to={{
                pathname:'/detailsPlugin/' + plugin._id,
                }}>
                  <div key={index} id="blocPluginShow">
                      <br/>
                      <div class="imgPluginShow">{<img src={plugin.screenshot_href }/>}</div><br/>
                      <div ><center>{plugin.name}</center></div>
                      <div id="boutonDetail"><h3><center>DETAILS</center></h3></div>     
                  </div>
              </Link>
            )}
          );

          return (
              <div class="blocShowPlugin">
                <br/>
                <div class="page-title">
                        <p>Here be plugins</p>
                        <h1>PLUGINS</h1>
                        <p class="shortline"></p>
                 </div>
                 <div class="containerShow">
                  <div class="search-container whiteframe">
                    <input class="feed-search-text" type="text" placeholder="Search plugins"/>
                    <button class="feed-search-button" type="bouton">
                      <img class="imgSearch" alt="Search" src={searchLogo}></img>
                    </button>
                  </div>
                 </div>   
                 <div id="divContenerShow">
                       {listePlugins} 
                 </div>           
              </div>
            
          )
    }
}