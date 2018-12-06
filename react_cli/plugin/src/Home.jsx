
import React from 'react';
 
export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            plugins:[],
            maxPag:0,
            nbPlugi:0
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
        if(el.screenshot_href==''){
               console.log("fegegegeg");
        }
        if(el.name.length>40){
        let plugin = {
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
     
          let listePlugins = this.state.plugins.map( (plugin, index) => {
            return(    
              <div key={index} id="blocPlugin" >
                  <br/>
                  <div><center><h2>ndlzjflzbflb</h2></center></div>
                  <div >{<img src={plugin.screenshot_href }/>}</div><br/>
                  <div ><center>{plugin.name}</center></div>
                  <div id="boutonDetail"><h3><center>DETAILS</center></h3></div>     
              </div>
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
                  {  listePlugins } 
                    </div>           
                    </div>
          )
    }

}