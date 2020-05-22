import React, {useEffect, useState} from 'react';

import logo from './logo.svg';
import './App.css';

import Loader from './components/Loader'

function App() {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    fetch('/-/instant/6-d4b38683ae-mw61d0.json')
      .then(res => res.json())
      .then(json => {
        setPosts(json.data)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        setError(`Failed loading API`)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://brand.zesty.io/zesty-io-logo-horizontal-light.svg" alt="Zesty.io logo" width="350px" />

        <h1>CRA Example</h1>

        {error && <p>{error}</p>}
        {loading && <Loader />}

        {!loading && posts.map(post => {
          return (
            <article>
              <h1>{post.content.title}</h1>
              <img src={post.content.image && post.content.image.data[0].url} />
              <div dangerouslySetInnerHTML={{
                __html: post.content.content
              }}></div>
            </article>
          )
        })}

      </header>
    </div>
  );
}

export default App;
