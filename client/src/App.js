import SignIn from '../src/components/auth/SignIn.js'
import SideNavBar from '../src/components/common/SideNavbar.js'
import SignUp from '../src/components/auth/SignUp.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SideNavBar />
        <Routes>
          <Route path="/signin" Component={SignIn} />
          <Route path="/signup" Component={SignUp} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
