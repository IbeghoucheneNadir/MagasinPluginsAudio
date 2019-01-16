import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import homebillboard from './images/home-billboard.jpg';
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
    
        if(el.name.length>40 && el.screenshot_href){
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

    render(){
      console.log(this.state.plugins);

          let listePlugins = this.state.plugins.map( (plugin, index) => {
            return(    
              <Link to={{
                pathname:'/detailsPlugin/' + plugin._id,
                }}>
                  <div key={index} id="blocPlugin">
                      <br/>
                      <div><center><h2>{plugin.name}</h2></center></div>
                      <div >{<img src={plugin.screenshot_href }/>}</div><br/>
                      <div id="boutonDetail"><h3>DETAILS</h3></div>     
                  </div>
              </Link>
            )}
          );

          return (
            <div>
              <div class="blocPlogin">
                <div id="entete-plugin">
                  <br/>
                        <h1><center>Inspiration in all the Classics</center></h1>
                            <h3><center> All the famous stompboxes, FX, synths, sequencers and amps that made history</center></h3>
                        <br/>
                 </div>                 
                 <div id="divContener">
                       {listePlugins} 
                        <div id="blocBeforeShop"><h2>Explore hundreds more on our Plugin page</h2></div>
                        <Link to={{
                        pathname:'/ShowPlugins/',
                         }}>
                        <div id="boutonDetailShop"><h3><center>GO TO PLUGIN SHOP</center></h3></div>  
                        </Link>   
                        <br/><br/><br/>
                 </div>           
               </div>
             </div>
            
          )
    }
}