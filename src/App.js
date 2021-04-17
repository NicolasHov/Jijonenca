import React, { useEffect, useState } from 'react';
import { Remarkable } from 'remarkable'
import panettone from './panettone';
import './App.css'

const MarkdownEditor = props => {
  const [value, setValue] = useState('')
  const md = new Remarkable()
  const content = panettone.database().ref(props.path)

  useEffect(() => {
    content.on('value', (snapshot) => {
      const data = snapshot.val()
      setValue(data)
    })
  }, [])

  return (
    <div className="MarkdownEditor">
      <textarea
        id="markdown-content"
        value={value}
        onChange={e => {
          panettone.database().ref(props.path).set(e.target.value)
        }}
      />
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: md.render(value) }}
      />
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <MarkdownEditor path={"mySecretProject/README.md"} />
    </div>
  )
}

export default App;