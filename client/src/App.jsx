import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Header />

      <main className='container mx-auto min-h-[77vh]'>
        <Outlet />
      </main>
      
      <Footer />
    </>
  );
}

export default App
