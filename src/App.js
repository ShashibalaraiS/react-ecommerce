import Products from './component/products';
import './App.css';


function App() {
  return (
    <div className="App">
        <header className="App-header">
            <h1>Product List</h1>
        </header>
        <main>
            <Products />
        </main>
    </div>
);
}

export default App;
