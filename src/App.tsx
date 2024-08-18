import { Router } from './routes/Router'
import './App.css'
import { Helmet } from 'react-helmet-async'

function App() {
  return (
    <>
    <Helmet>
      <meta name="description" content="書籍の詳細やレビューを投稿しあうアプリです。" />
      <link rel="preconnect" href="https://railway.bookreview.techtrain.dev" />
    </Helmet>
    <div className="App">
      <Router />
    </div>
    </>
  )
}

export default App
