import React, { Component } from 'react';
import './App.css';

const IMAGE_SOURCE = {local: "images/", remote: "https://media.ed.edmunds-media.com/kia/cadenza/2017/evox/"}

const _SRC = IMAGE_SOURCE.local;

const _DELAY = 500; // ms

const _DATA = [
  {
    id: '401693617',
    value: 'Aurora Black Pearl',
    color: 'rgb(25,26,26)',
    src: _SRC + "2017_kia_cadenza_sedan_premium_tds2_evox_1_500.jpg",
    yearMakeModel: "2017 Kia Cadenza"
  },
  {
    id: '401693621',
    value: 'Gravity Blue',
    color: 'rgb(70,86,114)',
    src: _SRC + "2017_kia_cadenza_sedan_premium_tds2_evox_2_500.jpg",
    yearMakeModel: "2017 Kia Cadenza"
  },
  {
    id: '401693620',
    value: 'Platinum Graphite',
    color: 'rgb(93,94,92)',
    src: _SRC + "2017_kia_cadenza_sedan_premium_tds2_evox_3_500.jpg",
    yearMakeModel: "2017 Kia Cadenza"
  },
  {
    id: '401693619',
    value: 'Silky Silver Metallic',
    color: 'rgb(191,193,196)',
    src: _SRC + "2017_kia_cadenza_sedan_premium_tds2_evox_4_500.jpg",
    yearMakeModel: "2017 Kia Cadenza"
  },
  {
    id: '401693618',
    value: 'Snow White Pearl',
    color: 'rgb(255,255,255)',
    src: _SRC + "2017_kia_cadenza_sedan_premium_tds2_evox_5_500.jpg",
    yearMakeModel: "2017 Kia Cadenza"
  }
];

class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedColor: _DATA[0].value,
      currentColor:  _DATA[0].value,
      prevColor: null,
      imgTags: [],
      loadedIndice: []
    }
  }

  componentDidMount() {
    this.setState({
      loadedIndice: this.state.loadedIndice.concat(0)
    });
  }

  addImageTag(data) {
    const isInDom = (document.getElementById('vehicle-id-' + data.id)) || false;
    const curData = _DATA.filter(d => d.id === data.id)[0];
    const dataIndex = (_DATA.indexOf(curData));// index of the data, not the img DOM
    if (!isInDom) {
      this.setState({
        loadedIndice: this.state.loadedIndice.concat(dataIndex)
      });
    }
  }

  setColor(data) {
    this.setState({
      selectedColor: data.value,
      prevColor: this.state.currentColor
    });

    setTimeout(() => {
      this.addImageTag(data);
    });

    setTimeout(() => {
      this.setState({
        currentColor: this.state.selectedColor,
        prevColor: null
      });
    }, _DELAY);
  }

  onImageClicked(index) {
    const nextIndex = index === _DATA.length - 1 ? 0 : index + 1;
    const nextColor = _DATA[nextIndex].value;
    const nextId = _DATA[nextIndex].id;
    this.setColor({value: nextColor, id: nextId});
  }

  render() {
    const images = this.state.loadedIndice.map(index => {
      const activeClass = this.state.selectedColor === _DATA[index].value ? ' active' : '';
      const prevClass = this.state.prevColor === _DATA[index].value ? ' out' : '';
      return (
         <img key={index} src={_DATA[index].src} className={`vehicle-img${activeClass}${prevClass}`} id={`vehicle-id-${_DATA[index].id}`} alt={_DATA[index].value} width="300" height="200" onClick={() => this.onImageClicked(index)} />
      );
    });
    return (
      <div className="App">
        <div className="year-make-model">{_DATA[0].yearMakeModel}</div>
        <figure id="image-cont">
          {images}
        </figure>
        <Swatches onClick={this.setColor.bind(this)} selectedColor={this.state.selectedColor}/>
      </div>
    );
  }
}

const Swatches = (props) => {
  const list = _DATA.map((data, index) => {
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
