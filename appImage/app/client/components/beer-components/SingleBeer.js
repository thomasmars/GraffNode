import React from 'react';
import './styles/SingleBeer.css'

class SingleBeer extends React.Component {

  constructor(props) {
    super(props)

    this.eventEmitter = props.eventEmitter;
    this.state = {
      showingImage: true
    }

    this.flipCard.bind(this)
  }

  componentWillMount() {
    this.eventEmitter.addListener('flippingCard', () => {
      this.setState({
        showingImage: true
      })
    })
  }


  flipCard() {
    this.eventEmitter.emitEvent('flippingCard');

    this.setState({
      showingImage: !this.state.showingImage
    })
  }

  parseMarkup(text) {
    // First parse #string#
    const replacements = [
      '</div><div class="fat-text">',
      '</div><div>'
    ]
    let idx = 1
    const parsedBold = '<div>' + text.replace(/#/g, () => {
      idx ++
      return replacements[idx % 2]
    }) + '</div>'

    // Parse newlines
    return parsedBold.replace(/\\n/g, '<br />');
  }

  render() {
    return (
      (
        <div onClick={this.flipCard.bind(this)} className="beer-container">
          <div className={`beer-card${this.state.showingImage ? '' : ' flipped'}`}>
            <div className="beer-image">
              <img
                className='image'
                src={this.props.imagePath}
              />
            </div>
            <div className='beer-info'>
              <div className="beer-name">{this.props.name}</div>
              <div className="beer-text-wrapper">
                <div
                  className="beer-text"
                  dangerouslySetInnerHTML={{__html: (this.parseMarkup(this.props.text))}}
                ></div>
              </div>
              <div className="beer-div">
                <div className="beer-div-entity">
                  <div className="beer-div-entity-header">Alc.</div>
                  <div>{this.props.alcoholPercentage}</div>
                </div>
                <div className="beer-div-entity">
                  <div className="beer-div-entity-header">IBU / OG</div>
                  <div>{this.props.IBU} / {this.props.OG}°P</div>
                </div>
                <div className="beer-div-entity">
                  <div className="beer-div-entity-header">Serve at</div>
                  <div>{this.props.servingTemperature} °C</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )
    )
  }
}

export default SingleBeer;
