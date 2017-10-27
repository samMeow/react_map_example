import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: <div />,
  }

  render() {
    const { children } = this.props
    return (
      <div>
        <a
          href="https://github.com/samMeow/react_map_example"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              border: 'none',
              zIndex: 1,
            }}
            src={'https://camo.githubusercontent.com/' +
              '652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/' +
              '68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f' +
              '726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67'
            }
            alt="Fork me on GitHub"
            data-canonical-src={
              'https://s3.amazonaws.com/github/' +
              'ribbons/forkme_right_orange_ff7600.png'
            }
          />
        </a>
        {children}
        <footer style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          <div style={{ textAlign: 'right', opacity: '0.5' }}>
            This website is for demo purpose.
          </div>
        </footer>
      </div>
    )
  }
}
