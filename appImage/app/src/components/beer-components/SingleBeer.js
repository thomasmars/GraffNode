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
      '<div class="fat-text">',
      '</div>'
    ]
    let idx = 1
    const parsedBold = text.replace(/#/g, () => {
      idx ++
      return replacements[idx % 2]
    })

    // Parse newlines
    const parsedBreaks = parsedBold.replace(/\\n/g, '<br />');

    return parsedBreaks;
  }

  render() {
    const imageClasses = `image${this.state.showingImage ? '' : ' hidden'}`
    const beerInfoClasses = `beer-info${this.state.showingImage ? ' hidden' : ''}`

    return (
      (
        <div onClick={this.flipCard.bind(this)} className="image-container">
          <img className={imageClasses} src={this.props.imagePath} />
          <div className={beerInfoClasses}>
            <div className="beer-name">{this.props.name}</div>
            <div
              className="beer-text"
              dangerouslySetInnerHTML={{__html: (this.parseMarkup(this.props.text))}}
            ></div>
            <div>{this.props.alcoholPercentage}</div>
          </div>
        </div>
      )
    )
  }
}

export default SingleBeer;
