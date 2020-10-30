import React from 'react'
import {Ellipsis} from 'react-awesome-spinners'

const Loading = () => (
  <div style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }}>
    <Ellipsis/>
  </div>
)

export default Loading