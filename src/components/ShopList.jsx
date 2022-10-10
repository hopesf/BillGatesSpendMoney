import { useDispatch, useSelector } from 'react-redux';
import { changeOrder } from '../redux/walleSlice/walletSlicer';
import CountUp from 'react-countup';

const ShopList = () => {
  const dispatch = useDispatch();
  const myitems = useSelector((state) => state.cards.items);
  console.log(myitems);

  const handleChange = (item, targetvalue) => {
    const id = item.id;
    const price = item.price;
    const innerHTML = targetvalue.innerHTML;

    if (targetvalue > 9999) {
      return;
    }

    if (innerHTML === 'Buy') {
      targetvalue = Number(item.quantity) + 1;
    } else if (innerHTML === 'Sell') {
      targetvalue = Number(item.quantity) - 1;
    } else {
      targetvalue = Number(targetvalue);
    }
    dispatch(changeOrder({ id, price, targetvalue }));
  };

  return (
    <div className="w-full grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5">
      {myitems?.map((el) => (
        <div key={el.title} className="flex items-center justify-evenly h-[400px] flex-col rounded bg-white">
          <img src={el.img} className="w-full h-48" />
          <h2 className="font-bold tracking-wider text-xl">{el.title}</h2>
          <CountUp
            className="text-green-600 font-bold text-lg"
            start={el.price}
            end={el.price}
            duration={1}
            prefix="$ "
            separator=","
          />

          <div className="w-full px-5 flex flex-row justify-between">
            <button
              disabled={!el.anyBuyed}
              onClick={(e) => handleChange(el, e.target)}
              className={`px-6 py-1 rounded ${el.adet == 0 ? 'bg-gray-200 ' : 'bg-red-500'}`}
            >
              Sell
            </button>
            <input
              type="number"
              min="0"
              value={el.quantity}
              onChange={(e) => handleChange(el, e.target.value)}
              className="border rounded border-black text-center"
            />
            <button
              disabled={!el.canBuyMore}
              onClick={(e) => handleChange(el, e.target)}
              className={`bg-green-600 text-white px-6 py-1 rounded `}
            >
              Buy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ShopList;
