import logo from './logo.svg';
import './App.css';
import QuotesList from './redux/slices/QuotesList';
import AddQuotesForm from './redux/slices/AddQuotesForm';

function App() {
  return (
    <div className="App">
      <QuotesList/>
      <AddQuotesForm/>
    </div>
  );
}

export default App;
