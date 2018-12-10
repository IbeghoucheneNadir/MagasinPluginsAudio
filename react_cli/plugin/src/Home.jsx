import React from 'react';
import {Link} from 'react-router-dom';
export default class Home extends React.Component {

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
    
        if(el.name.length>40){
        let plugin = {
           _id:el._id,
           name:el.name,
           screenshot_href:el.screenshot_href
         }
        plugins.push(plugin);
      }});
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
                  <div key={index} id="blocPlugin">
                      <br/>
                      
                      <div><center><h2>ndlzjflzbflb</h2></center></div>
                      <div >{<img src={plugin.screenshot_href }/>}</div><br/>
                      <div ><center>{plugin.name}</center></div>
                      <div id="boutonDetail"><h3><center>DETAILS</center></h3></div>     
                  </div>
              </Link>
            )}
          );

          return (
              <div>
                <div id="entete-plugin">
                  <br/>
                        <h1><center>Inspiration in all the Classics</center></h1>
                        <h3><center> All the famous stompboxes, FX, synths, sequencers and amps that made history</center></h3>
                        <br/>
                 </div>                 
                 <div id="divContener">
                       {listePlugins} 
                        <div id="blocBeforeShop"><h2>Explore hundreds more on our Plugin page</h2></div>
                        <div id="boutonDetailShop"><h3><center>GO TO PLUGIN SHOP</center></h3></div>     
                        <br/><br/><br/>
                 </div>           
              </div>
          )
    }
}