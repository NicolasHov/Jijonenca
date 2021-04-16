import React from 'react';
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

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.md = new Remarkable();
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: '' };
  }

  componentDidMount() {
    let fileContent = firebase.database().ref('files/' + 1234567890 + '/content');
    fileContent.on('value', (snapshot) => {
      const data = snapshot.val();
      this.setState({ value: data });
    })
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    firebase.database().ref('files/' + 1234567890).set({
      content: e.target.value,
    });
  }

  getRawMarkup() {
    return { __html: this.md.render(this.state.value) };
  }

  render() {
    return (
      <div className="MarkdownEditor">
        <h3>Entrée</h3>
        <label htmlFor="markdown-content">
          Saisissez du markdown
        </label>
        <textarea
          id="markdown-content"
          onChange={this.handleChange}
          value={this.state.value}
        />
        <h3>Sortie</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={this.getRawMarkup()}
        />
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <MarkdownEditor />
    </div>
  );
}

export default App;