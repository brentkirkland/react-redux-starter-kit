import React from 'react'
import './HomeView.scss'

import { IndexLink, Link } from 'react-router'

import javascript_time_ago from 'javascript-time-ago'
javascript_time_ago.locale(require('javascript-time-ago/locales/en'))
require('javascript-time-ago/intl-messageformat-global')
require('intl-messageformat/dist/locale-data/en')

const time_ago = new javascript_time_ago('en-US')
const twitter = time_ago.style.twitter()


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
          <tbody>
            <tr>
              <th>Name</th>
              <th>Temp (°F)</th>
              <th>Humidity</th>
              <th>Watered</th>
              <th>Updated</th>
            </tr>
            <tr>

              <td>
                <Link to={'/' + this.props.homeview.data[0].device_id} activeClassName='route--active'>
                  {this.props.homeview.data[0].device_id || '-'}
                </Link>
              </td>
              <td>{this.props.homeview.data[0].last_temp || '-'}</td>
              <td>{this.props.homeview.data[0].last_humidity || '-'}</td>
              <td>{time_ago.format(new Date(Date.now()), twitter) || '-'}</td>
              <td>{time_ago.format(new Date(this.props.homeview.data[0].last_updated)) || '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default HomeView
