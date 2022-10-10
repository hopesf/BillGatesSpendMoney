import { useSelector } from 'react-redux';
import CountUp from 'react-countup';

const Quantity = () => {
  const moneyvalue = useSelector((state) => state.cards.billsMoney);
  const oldvalue = useSelector((state) => state.cards.moneyValueArr[0]);

  return (
    <div className="w-full sticky top-0 flex justify-center rounded my-2 items-center bg-green-600 text-white">
      <CountUp
        className="py-5 font-bold text-3xl"
        start={oldvalue}
        end={moneyvalue}
        duration={1}
        prefix="$ "
        separator=","
      />
    </div>
  );
};
export default Quantity;
