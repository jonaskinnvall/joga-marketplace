import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'react-bootstrap';

const DeleteAlert = ({ showAlert, onShowAlert }) => {
    return (
        <Alert show={showAlert} variant="danger">
            <Alert.Heading>Deleting User</Alert.Heading>
            <p>
                This will remove this user and all of its data and items from
                the database! Are you sure you want to continue?
            </p>
            <hr />
            <Button
                variant="outline-danger"
                onClick={() =>
                    onShowAlert({
                        alert: false,
                        confirm: true,
                    })
                }
            >
                Confirm deletion
            </Button>
            <Button variant="outline-info" onClick={() => onShowAlert(false)}>
                Cancel
            </Button>
        </Alert>
    );
};

export default DeleteAlert;

DeleteAlert.propTypes = {
    showAlert: PropTypes.object,
    onShowAlert: PropTypes.func,
};
