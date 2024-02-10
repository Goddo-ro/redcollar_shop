import ErrorProvider from './components/ErrorProvider/ErrorProvider';
import Footer from './components/Footer/Footer';
import Browser from './router/Browser';

function App() {
  return (
    <>
      <Browser/>
      <Footer/>
      <ErrorProvider/>
    </>
  );
}

export default App;
