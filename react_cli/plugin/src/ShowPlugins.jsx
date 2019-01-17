import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import searchLogo from './images/search.png';

export default class ShowPlugins extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            plugins:[],
            nbPlugin:16,
            nomPlugin:'',
            plugin:null,
            page: 1,
            a:1,
            b:2,
            c:3,
            maxPage:'',
          }
    }
      
  componentWillMount() {
    this.getDataFromServer();
  }

  getDataFromServer() {
    fetch('http://localhost:8080/api/plugins?page='+ this.state.page + "&pagesize=" + this.state.nbPlugin+"&name="+this.state.nomPlugin)
    .then(response => {
      return response.json() // transforme le json texte en objet js
    })
    .then(res => { // data c'est le texte json de response ci-dessus
      let plugins = [];
      res.data.forEach((el) => {
       // if(el.screenshot_href!=null){
        let plugin = {
           _id:el._id,
           name:el.name,
           screenshot_href:el.screenshot_href
         }
        plugins.push(plugin);
      // }
       });
      this.setState({
       plugins: plugins
     });
      
    }).catch(err => {
      console.log("erreur dans le get : " + err)
    });
 }

 naviger(event){
    let num = event.target.innerText;
        if(num==="Max"){
              this.getMaxPage();
              this.state.c=this.state.maxPage-1;
              this.state.b=this.state.maxPage-2;
        }
        else
        {
              if(num==this.state.b && this.state.b!=2)
              {
                    this.state.b-=1;
                    this.state.c-=1;
                    }
                    else if(num==this.state.a)
                    {
                      this.state.b=2;
                      this.state.c=3;
                    }
                    else if(num==this.state.c)
                    {
                      this.state.c+=1;
                      this.state.b+=1;
                    }
}
  this.setState({page: num}, () => this.componentWillMount());
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
                      <div class="imgPluginShow"><img src={plugin.screenshot_href }/></div><br/>
                      <div ><center>{plugin.name}</center></div>
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
                 <div className="navigation"><br/>
                        <button type="button" id="idButton1" onClick={(event) => this.naviger(event)}><p class="numeroButton">{this.state.a}</p></button>
                        <button type="button" id="idButton2" onClick={(event) => this.naviger(event)}><p class="numeroButton">{this.state.b}</p></button>
                        <button type="button" id="idButton3" onClick={(event) => this.naviger(event)}><p class="numeroButton">{this.state.c}</p></button>
                        ........<button type="button" id="idButtonMax" onClick={(event) => this.naviger(event)}><p class="numeroButton">Max</p></button>
                </div>
                    
                 <div id="divContenerShow">
                       {listePlugins} 
                 </div>  
                 <div className="navigation"><br/>
                        <button type="button" id="idButton1" onClick={(event) => this.naviger(event)}><p class="numeroButton">{this.state.a}</p></button>
                        <button type="button" id="idButton2" onClick={(event) => this.naviger(event)}><p class="numeroButton">{this.state.b}</p></button>
                        <button type="button" id="idButton3" onClick={(event) => this.naviger(event)}><p class="numeroButton">{this.state.c}</p></button>
                        ........<button type="button" id="idButtonMax" onClick={(event) => this.naviger(event)}><p class="numeroButton">Max</p></button>
                </div>         
              </div>
            
          )
    }
}