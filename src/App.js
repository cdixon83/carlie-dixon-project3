import './App.scss';
import { useState } from 'react';

import Header from './js/Header';
import ShowMessages from './js/ShowMessages';
import PostMessage from './js/MessagePost';
import NameInput from './js/NameInput';

function App() {
  const [viewMessages, setViewMessages] = useState(false);
  const [viewPostMessage, setViewPostMessage] = useState(false);
  const [showMyMessages, setShowMyMessages] = useState(false);
  const [nameInput, setNameInput] = useState('');

  // fires every time the nameInput changes
  // can this go in a component somewhere???????????????
  const handleNameChange = (event) => {
    const updatedName = event.target.value;
    setNameInput(updatedName);
    // reset showMyMessages when user types new name while viewing messages
    setShowMyMessages(false)
  }

  // mounts message component
  // message component was unmounted on load
  // message component is unmounted by change in nameInput
  const handleShowMessages = (event) => {
    event.preventDefault();
    if (nameInput === '') {
            return (
                alert("But wait, we don't know how you are, how can we find all of your wonderful messages if you don't enter your name?")
            )
        }  
    setShowMyMessages(true);
  }

  return(
    <>
      <Header 
        setViewMessages={setViewMessages} 
        setViewPostMessage={setViewPostMessage} 
        setNameInput={setNameInput}
      />

      {viewMessages === true
        ? 
          <main className="wrapper">
            <h2>See my Messages</h2>
            <form action="submit" className="viewMessages" onSubmit={handleShowMessages}>
              <NameInput 
                handleNameChange={handleNameChange} 
                nameInput={nameInput}
                name='What is your name?'
              />
              <button type="submit" className="submit">See messages</button>
            </form>
            {
              showMyMessages === true
              ?
              <ShowMessages nameSearched={nameInput} />
              : null
            }
          </main>
        : null}

      {viewPostMessage === true
        ? 
          <main className="wrapper">
            <h2>Give a compliment</h2>
            <PostMessage 
              handleNameChange={handleNameChange}
              nameInput={nameInput}
              setNameInput={setNameInput}
            />
          </main>
        : null}
    </>
  )

}

export default App;
