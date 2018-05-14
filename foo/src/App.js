import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.data = [
      {
        id: '401693617',
        value: 'Aurora Black Pearl',
        color: 'rgb(25,26,26)',
        src: "https://media.ed.edmunds-media.com/kia/cadenza/2017/evox/2017_kia_cadenza_sedan_premium_tds2_evox_1_500.jpg",
        yearMakeModel: "2017 Kia Cadenza"
      },
      {
        id: '401693621',
        value: 'Gravity Blue',
        color: 'rgb(70,86,114)',
        src: "https://media.ed.edmunds-media.com/kia/cadenza/2017/evox/2017_kia_cadenza_sedan_premium_tds2_evox_2_500.jpg",
        yearMakeModel: "2017 Kia Cadenza"
      },
      {
        id: '401693620',
        value: 'Platinum Graphite',
        color: 'rgb(93,94,92)',
        src: "https://media.ed.edmunds-media.com/kia/cadenza/2017/evox/2017_kia_cadenza_sedan_premium_tds2_evox_3_500.jpg",
        yearMakeModel: "2017 Kia Cadenza"
      },
      {
        id: '401693619',
        value: 'Silky Silver Metallic',
        color: 'rgb(191,193,196)',
        src: "https://media.ed.edmunds-media.com/kia/cadenza/2017/evox/2017_kia_cadenza_sedan_premium_tds2_evox_4_500.jpg",
        yearMakeModel: "2017 Kia Cadenza"
      },
      {
        id: '401693618',
        value: 'Snow White Pearl',
        color: 'rgb(255,255,255)',
        src: "https://media.ed.edmunds-media.com/kia/cadenza/2017/evox/2017_kia_cadenza_sedan_premium_tds2_evox_5_500.jpg",
        yearMakeModel: "2017 Kia Cadenza"
      }
    ];
    this.state = {
      selectedColor: this.data[0].value,
      currentColor: this.data[0].value,
      prevColor: null
    }
  }

  setColor(data) {
    console.log(document.getElementById('vehicle-id-' + data.id));
    console.log(this.data.filter(d => d.id === data.id));
    if (this.state.prevColor || this.state.prevColor === this.state.currentColor) return;
    this.setState({
      selectedColor: data.value,
      prevColor: this.state.currentColor
    });

    setTimeout(() => {
      this.setState({
        currentColor: this.state.selectedColor,
        prevColor: null
      });
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        <div className="year-make-model">{this.data[0].yearMakeModel}</div>
        <VehicleImage dataSet={this.data} selectedColor={this.state.selectedColor} prevColor={this.state.prevColor}/>
        <Swatches onClick={this.setColor.bind(this)} dataSet={this.data} selectedColor={this.state.selectedColor}/>
      </div>
    );
  }
}

const VehicleImage = (props) => {
  const images = props.dataSet.map((data, index) => {
    const activeClass = props.selectedColor === data.value ? ' active' : '';
    const prevClass = props.prevColor === data.value ? ' out' : ''
    return (
      <img key={index} src={data.src} className={`vehicle-img${activeClass}${prevClass}`} id={`vehicle-id-${data.id}`} alt={data.value} width="300" height="200"/>
    );
  });
  return (
    <figure id="image-cont"> {images} </figure>
  );
}

const Swatches = (props) => {
  const list = props.dataSet.map((data, index) => {
    return (
      <ColorSwatch key={index} id={data.id} value={data.value} color={data.color} onClick={props.onClick.bind(this)}/>
    );
  });
  return (
    <nav>
      <h6 className="colors-list__name"><strong>Selected Color: </strong>{props.selectedColor}</h6>
      <ul className="colors-list mt-2 my-0_75 p-0"> {list} </ul>
    </nav>
  );
}

const ColorSwatch = (props) => {
  return (
    <li>
      <input type="radio" id={props.id} name="contact" value={props.value} onClick={() => props.onClick({value: props.value, id: props.id})}/>
      <label className="d-block text-center border-radius border-2" htmlFor={props.id}>
      <span className="color-swatch d-block border-radius border-1 border-gray" style={{backgroundColor: props.color}}></span>
      </label>
    </li>
  );
}

export default App;
