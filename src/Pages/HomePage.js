import { Maincontainer } from '../Components/Maincontainer';
import { Navbar } from '../Components/Navbar';
import { ProductsSHow } from '../Components/ProductsSHow';

const HomePage = ({ Data }) => {
  console.log('hello');
  console.log(Data);
  return (
    <>
      <Navbar />
      <ProductsSHow />
      <Maincontainer />
    </>
  );
};

export default HomePage;
