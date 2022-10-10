import Navbar from './components/Navbar';
import ProfileCard from './components/ProfileCard';
import Quantity from './components/Quantity';
import ShopList from './components/ShopList';

const App = () => {
  return (
    <div className="bg-gray-200 w-full h-full">
      <Navbar />
      <div className="w-1/2 mx-auto my-5 p-2 rounded ">
        <ProfileCard />
        <Quantity />
        <ShopList />
      </div>
    </div>
  );
};
export default App;
