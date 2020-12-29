import './App.css';
// import Home from './views/home'
import React from 'react';
import { SnackbarProvider} from 'notistack';
import Login from "./views/Login"

function App() {
  return (
    <div className="App">
      <SnackbarProvider>
     <Login/>
     </SnackbarProvider>
    </div>
  );
}

export default App;
