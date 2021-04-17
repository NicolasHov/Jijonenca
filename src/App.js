import React, { useEffect, useState } from 'react';
import './App.css'
import firebase from "firebase/app"
import "firebase/database"
import { Remarkable } from 'remarkable'

firebase.initializeApp({
  apiKey: "AIzaSyCzxMMP4rTH-qmKJs-4IyvQTTVm6yip4XY",
  authDomain: "jijonenca-38086.firebaseapp.com",
  databaseURL: "https://jijonenca-38086-default-rtdb.firebaseio.com",
  projectId: "jijonenca-38086",
  storageBucket: "jijonenca-38086.appspot.com",
  messagingSenderId: "642565613268",
  appId: "1:642565613268:web:9a34d9a0d0cdc129d2bd41"
});

const MarkdownEditor = props => {
  const [value, setValue] = useState('')
  const md = new Remarkable()
  const content = firebase.database().ref('files/' + props.id + '/content')

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
          firebase.database().ref('files/' + props.id).set({
            content: e.target.value,
          })
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
      <MarkdownEditor id={1234567890} />
    </div>
  )
}

export default App;