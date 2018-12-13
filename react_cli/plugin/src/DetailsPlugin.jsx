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
      let author="";
      let comment="";
      let parametres="";
      let control="";

      if(plug) {
        name = plug.name;  
        img=plug.screenshot_href;
        comment=plug.comment;
        author=plug.author;
        control=plug.ports;
       console.log(control);

      /*  nad = parametres.map((element, index) => {

        return (

            <tr key={index} className="parametre-row">
                <td>{element.controler}</td>
                <td>{element.default}</td>
                <td>{element.min}</td>
                <td>{element.max}</td>
            </tr>
        
        )
    })*/
  }
      return (
          <div>
                 <div class="containerDetailImage">
                    <div class="header">
                      <div class="author">
                        <div class="author-info">
                            <span class="author-name"> {author.name}</span><br/>
                            <a href > {author.email}</a>
                        </div>

                      </div>
                      <div class="pedalborad-count-container">{}
                            <a href ></a>
                            <span> </span>
                      </div>
                      <div class="title">
                            <h2>{name}</h2>
                      </div>


                    </div>
                    <div class="imageDetail"> 
                        <img src={img} alt=""/>
                    </div>

                   
                      <div class="plugin-category">Distortion</div>
                   
                   <p class="pedalboard-description">
                        {comment}
                   </p>
                   <div class="plugin-control-ports">
                   <table>
                     <head>
                       <th>Control</th>
                       <th>Default</th>
                       <th>Min</th>
                       <th>Max</th>
                     </head>
                     <tbody>
                      {//parametres
                      }
                     </tbody>
                   </table>

                   </div>

                    <br/><br/><br/>
             </div>           
          </div>
        
      )
  }
}
