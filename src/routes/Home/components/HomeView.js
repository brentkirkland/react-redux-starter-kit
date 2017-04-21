import React from 'react'
import './HomeView.scss'

class HomeView extends React.Component {

  static propTypes = {
    homeview  : React.PropTypes.object.isRequired,
    devices   : React.PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.devices()
  }

  render () {
    return (
      <div>
        <h4>Devices</h4>
        <table>
          <tr>
            <th>Name</th>
            <th>Temp</th>
            <th>Humidity</th>
            <th>Watered</th>
            <th>Updated</th>
          </tr>
          <tr>
            <td>{this.props.homeview.data[0].device_id || '-'}</td>
            <td>{this.props.homeview.data[0].last_temp || '-'}</td>
            <td>{this.props.homeview.data[0].last_humidity || '-'}</td>
            <td>{this.props.homeview.data[0].last_watered || '-'}</td>
            <td>{Date(this.props.homeview.data[0].last_updated).toString() || '-'}</td>
          </tr>
        </table>
      </div>
    )
  }
}

export default HomeView
