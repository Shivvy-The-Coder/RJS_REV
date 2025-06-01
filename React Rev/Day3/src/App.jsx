import './App.css'
import Carts from './components/Carts'
import ClassBasedComponent2 from './components/class-based-compoenent2'
import ClassBasedComponent from './components/class-based-component'
import FunctionalComponents from './components/functional-component'
import ProductList from './components/Products'
// import Users from './components/Products/Users'

const DummyData = ['product 1','product 2','product 3',]

function App() {
  return (
    <>
      <h1>Helloo react from Shivam</h1>
      {/* <ClassBasedComponent/> */}
      {/* <FunctionalComponents/> */}
      {/* <ClassBasedComponent2/> */}
       {/* <ProductList name="Shivam" city="Ranchi" data={DummyData}/> */}
       {/* <Users/> */}
       <Carts/>
    </>
  )
}

export default App;
