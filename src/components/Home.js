import React from 'react';
import { useSelector } from 'react-redux';

// Import components
import ItemGrid from './ItemGrid';

const Home = () => {
    const itemState = useSelector(state => state.itemState.items);
    //? const [pressed, setPressed] = useState({ id: null, bool: false });

    return (
        <div>
            {!Array.isArray(itemState) || !itemState.length ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {/*  <div>
                        <h2> All items </h2>
                    </div> */}
                    <div></div>
                    <ItemGrid
                        items={itemState}
                        // ?pressed={pressed}
                        // ?pressBtn={(rowID, press) => {
                        // ?    setPressed({ id: rowID, bool: press });
                        // ?}}
                    />
                    {/* <div>
                        <h2> Toys </h2>
                    </div> */}
                    <div></div>
                    <ItemGrid
                        items={itemState.filter(
                            item => item.category === 'Toys'
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;
