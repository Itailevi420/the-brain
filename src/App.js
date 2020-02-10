import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Register from './Components/Register/Register';
import SignIn from './Components/SignIn/SignIn';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';



const app = new Clarifai.App({
  apiKey: 'bcab8c5a84474f509041c4c03e14c9c8'
 });
 


const particleOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      push: {
        particles_nb: 4
      },
    }
  }
}

class App extends Component {
  constructor () {
    super();
    this.state = {
      input : '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn : false,
      
    }
  }

  onInputChange = (event) => {
    // console.log('the event',event.target.value)
    this.setState({input: event.target.value})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayBoxFace = (box) => {
    // with ES6 you could do it like this to.
    // this.setState({ box })
    console.log('test', box);
    this.setState({box: box})
  }
  
  onButtonSubmit = ()=> {
    this.setState({imageUrl: this.state.input})

    app.models.predict(  
      Clarifai.FACE_DETECT_MODEL,
     this.state.input)
    .then(response => this.displayBoxFace(this.calculateFaceLocation(response))
    .catch(err => console.log(err))
    );
    
  }


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false,})
    } else if (route === 'home')  {
      this.setState({isSignedIn: true,})
    }
    this.setState({ route: route });
  }

  render() {
    return (
      <div className="App">
        <Particles 
          className='particles' 
          params={particleOptions}
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange= {this.onRouteChange} />
        { this.state.route === 'home'
         ? <div> 
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={this.state.box} imageUrl= { this.state.imageUrl }/>
          </div>
         :( this.state.route === 'register' 
           ? <Register  onRouteChange={this.onRouteChange}/>
           : <SignIn onRouteChange= {this.onRouteChange} />

         )
        } 
     </div> 
    );
  }
}

export default App;
