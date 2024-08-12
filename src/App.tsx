import './App.css'

function App() {
  return (
    <>
      <form>
        <label>E-mail: <input type="email" aria-label="email"></input></label>
        <br />
        <label>password: <input type="password" placeholder="Password"></input></label>
        <br />
        <button id="submit">登録</button>
      </form>
    </>
  )
}

export default App
