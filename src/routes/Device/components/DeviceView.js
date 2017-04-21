import React from 'react'
import './DeviceView.scss'

import { IndexLink, Link } from 'react-router'

import javascript_time_ago from 'javascript-time-ago'
javascript_time_ago.locale(require('javascript-time-ago/locales/en'))
require('javascript-time-ago/intl-messageformat-global')
require('intl-messageformat/dist/locale-data/en')

const time_ago = new javascript_time_ago('en-US')
const twitter = time_ago.style.twitter()


class DeviceView extends React.Component {

  static propTypes = {
    device         : React.PropTypes.object.isRequired,
    soilMeasures   : React.PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.soilMeasures(this.props.params.splat)
  }

  renderRow() {
    return this.props.device.data.map(function(item, i){
      return (
        <tr key={i}>
          <td>{item.temp}</td>
          <td>{item.humidity}</td>
          <td>{time_ago.format(new Date(item.published_at)) || '-'}</td>
        </tr>
      )
    })
  }

  render () {
    return (
      <div>
        <h4>{'Device: ' + this.props.params.splat}</h4>
        <table>
          <tbody>
            <tr>
              <th>Temp (°F)</th>
              <th>Humidity</th>
              <th>Time</th>
            </tr>
            {this.renderRow()}
          </tbody>
        </table>
      </div>
    )
  }
}

export default DeviceView
