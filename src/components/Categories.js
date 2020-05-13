import React from 'react';
import { useSelector } from 'react-redux';
import { Row } from 'react-bootstrap';

import ItemGrid from './ItemGrid';
import '../css/ItemGrid.css';

const Categories = () => {
    const userState = useSelector((state) => state.userState);
    const itemState = useSelector((state) => state.itemState);

    let cats = [...new Set(itemState.map((item) => item.category))];

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
                <Row className="empty-row">
                    <h2>There are currently no items in any category</h2>
                </Row>
            ) : (
                <>
                    {!userState.favCat ? (
                        <>
                            {cats.map((cat, catID) => {
                                return (
                                    <ItemGrid
                                        key={catID}
                                        items={[
                                            ...itemState.filter(
                                                (item) => item.category === cat
                                            ),
                                        ]}
                                        title={cat}
                                        rowLength={4}
                                    />
                                );
                            })}
                        </>
                    ) : (
                        <>
                            {!cats.includes(userState.favCat) ? (
                                <Row className="empty-row">
                                    <h2>
                                        There are currently no items in your
                                        favorite category
                                    </h2>
                                </Row>
                            ) : (
                                <ItemGrid
                                    items={[
                                        ...itemState.filter(
                                            (item) =>
                                                item.category ===
                                                userState.favCat
                                        ),
                                    ]}
                                    title={userState.favCat}
                                    rowLength={4}
                                />
                            )}

                            {cats
                                .filter((cat) => cat !== userState.favCat)
                                .map((cat, catID) => {
                                    return (
                                        <ItemGrid
                                            key={catID}
                                            items={[
                                                ...itemState.filter(
                                                    (item) =>
                                                        item.category === cat
                                                ),
                                            ]}
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
