import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

import PostItem from './PostItem';
import EditItem from './EditItem';
import EditUser from './EditUser';

const FormModal = (props) => {
    const { formType, confirm, req, onReq, ...rest } = props;

    let title, component, button;

    if (formType === 'addItem' || formType === 'addItemProfile') {
        title = 'Fill out the form to post a new item';
        component = <PostItem req={req} onReq={onReq} />;
        button = 'Post Item';
    } else if (formType === 'editItem') {
        title = 'Fill out the form to edit item information';
        component = <EditItem req={req} onReq={onReq} />;
        button = 'Confirm Edit';
    } else {
        title = 'Fill out the form to edit user information';
        component = <EditUser req={req} onReq={onReq} />;
        button = 'Confirm Edit';
    }

    return (
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
                <Button variant="info" onClick={props.onHide}>
                    {' '}
                    Cancel
                </Button>

                <Button variant="info" onClick={confirm}>
                    {' '}
                    {button}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FormModal;

FormModal.propTypes = {
    formType: PropTypes.string.isRequired,
    confirm: PropTypes.func.isRequired,
    req: PropTypes.object.isRequired,
    onReq: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
};
