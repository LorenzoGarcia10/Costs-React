import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import NewProject from './components/NewProject';
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Projects from './components/Projects';
import Project from './components/Project';

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass='min-height'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/newproject' element={<NewProject />} />
          <Route path='/newproject/:id' element={<Project />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
