import React from 'react'

type Props = {}

const message = (props: Props) => {
  return (
    <div>
        <div>message</div>
        <div className="p-4 border border-gray-300 rounded-lg">
            <p>chat 1</p>
            <p>chat 2</p>
        </div>
    </div>
  )
}

export default message;