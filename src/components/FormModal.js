import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

import PostItem from './PostItem';
import EditItem from './EditItem';
import EditUser from './EditUser';
import SVG from './icons/SVG';

const FormModal = (props) => {
    const {
        formType,
        confirm,
        deleteFunc,
        deleteItems,
        req,
        onReq,
        ...rest
    } = props;

    // Check which formType is used and set title,
    // button and render compoent accordingly
    let title, component, buttonCap;
    if (formType === 'addItem' || formType === 'addItemProfile') {
        title = 'Fill out the form to post a new item';
        component = <PostItem req={req} onReq={onReq} />;
        buttonCap = 'Post Item';
    } else if (formType === 'editItem') {
        title = 'Fill out the form to edit item information';
        component = <EditItem req={req} onReq={onReq} />;
        buttonCap = 'Confirm Changes';
    } else {
        title = 'Fill out the form to edit user information';
        component = <EditUser req={req} onReq={onReq} />;
        buttonCap = 'Confirm Changes';
    }

    return (
        <>
            <Modal
                {...rest}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {' '}
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{component}</Modal.Body>
                <Modal.Footer>
                    {formType === 'editItem' ? (
                        <Button
                            className="mr-auto"
                            variant="danger"
                            onClick={deleteFunc}
                        >
                            <SVG name="trash" width="1.5em" />
                            Delete Item
                        </Button>
                    ) : formType === 'editUser' ? (
                        <>
                            <Button variant="danger" onClick={deleteFunc}>
                                <SVG name="trash" width="1.5em" /> Delete User
                            </Button>
                            <Button
                                className="mr-auto"
                                variant="danger"
                                onClick={deleteItems}
                            >
                                <SVG name="trash" width="1.5em" /> Delete My
                                Items
                            </Button>
                        </>
                    ) : (
                        <></>
                    )}

                    <Button variant="info" onClick={props.onHide}>
                        {' '}
                        Cancel
                    </Button>
                    <Button variant="info" onClick={confirm}>
                        {' '}
                        {buttonCap}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default FormModal;

FormModal.propTypes = {
    formType: PropTypes.string.isRequired,
    confirm: PropTypes.func.isRequired,
    deleteFunc: PropTypes.func,
    deleteItems: PropTypes.func,
    req: PropTypes.object.isRequired,
    onReq: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
};
