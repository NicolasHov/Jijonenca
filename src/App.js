import React, { useEffect, useState } from 'react'
import { 
  BrowserRouter,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom'
import { Remarkable } from 'remarkable'
import panettone from 'panettone'
import './App.css'

const database = panettone.database('https://localhost:3000')

const MarkdownEditor = props => {
  const md = new Remarkable()
  const [value, setValue] = useState('')
  const { path } = useParams()
  useEffect(() => {
    database.ref(path).on('value', snapshot => {
      setValue(snapshot.val())
    })
  }, [path])

  return (
    <div className="MarkdownEditor">
      <textarea
        id="markdown-content"
        value={value}
        onChange={e => {
          database.ref(path).set(e.target.value)
        }}
      />
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: md.render(value) }}
      />
    </div>
  )
}

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ul>
          <li><Link to="/foo">foo</Link></li>
          <li><Link to="/bar">bar</Link></li>
        </ul>
        <Switch>
          <Route path="/:path" children={<MarkdownEditor />} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;