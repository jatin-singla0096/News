import Navbar from './Component/Navbar';
import News from './Component/News';
import Login from "./Component/Login"
import {
  Routes,
  Route,
} from "react-router-dom";
import Signup from './Component/Signup';
import Profile from './Component/Profile';
import UpdateData from './Component/UpdateData';
import ConfirmP from './Component/ConfirmP';

function App() {  
  return (
    <div>
      <Navbar/>
      <Routes>
      <Route exact path="/" element={<News key="general" pageSize="6" country="in" category="general" />} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/signup" element={<Signup/>} />
      <Route exact path="/profile" element={<Profile/>} />
      <Route exact path="/updateUser" element={<UpdateData/>} />
      <Route exact path="/confirm" element={<ConfirmP/>} />
      <Route exact path="/Business" element={<News key="business" pageSize="6" country="in" category="business" />} />
      <Route exact path="Entertainment" element={<News key="entertainment" pageSize="6" country="in" category="entertainment" />} />
      <Route exact path="General" element={<News key="general" pageSize="6" country="in" category="general" />} />
      <Route exact path="/Health" element={<News key="health" pageSize="6" country="in" category="health" />} />
      <Route exact path="/Science" element={<News key="science" pageSize="6" country="in" category="science" />} />
      <Route exact path="/Sports" element={<News key="sports" pageSize="6" country="in" category="sports" />} />
      <Route exact path="/Technology" element={<News key="technology" pageSize="6" country="in" category="technology" />} />
      </Routes>
      </div>
  );
}

export default App;
