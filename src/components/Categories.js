import React from 'react';
import { useSelector } from 'react-redux';

import ItemGrid from './ItemGrid';
const Categories = () => {
    const userState = useSelector((state) => state.userState);
    const itemState = useSelector((state) => state.itemState);

    let cats = [...new Set(itemState.map((item) => item.category))];
    console.log(cats);

    // ? Could be used to place categories with more items over those with lower
    // let countedCats = itemState.reduce((categories, item) => {
    //     if (item.category in categories) {
    //         categories[item.category]++;
    //     } else {
    //         categories[item.category] = 1;
    //     }
    //     return categories;
    // }, {});

    // console.log(countedCats);

    return (
        <>
            {!Array.isArray(itemState) || !itemState.length ? (
                <div>Loading...</div>
            ) : (
                <>
                    {!userState.favCat ? (
                        <>
                            {cats.map((cat, catID) => {
                                return (
                                    <ItemGrid
                                        key={catID}
                                        itemsFromState={itemState.filter(
                                            (item) => item.category === cat
                                        )}
                                        title={cat}
                                        rowLength={4}
                                    />
                                );
                            })}
                        </>
                    ) : (
                        <>
                            <ItemGrid
                                itemsFromState={itemState.filter(
                                    (item) => item.category === userState.favCat
                                )}
                                title={userState.favCat}
                                rowLength={4}
                            />
                            {cats
                                .filter((cat) => cat !== userState.favCat)
                                .map((cat, catID) => {
                                    return (
                                        <ItemGrid
                                            key={catID}
                                            itemsFromState={itemState.filter(
                                                (item) => item.category === cat
                                            )}
                                            title={cat}
                                            rowLength={4}
                                        />
                                    );
                                })}
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default Categories;
