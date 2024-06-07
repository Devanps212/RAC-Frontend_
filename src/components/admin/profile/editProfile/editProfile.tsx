import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { userAdminInterface } from '../../../../types/userInterface';
import userDetailForm, { onSubmitType } from '../../../../Validators/adminValidator';

interface EditProfileProps {
    adminDetails: userAdminInterface;
    handleSubmit: onSubmitType;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditProfileAdmin: React.FC<EditProfileProps> = ({ adminDetails, handleSubmit, handleFileChange }) => {
    const formik = userDetailForm(handleSubmit, adminDetails);

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Row className='mt-2'>
                <Col>
                    <Form.Group controlId="formName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.name && !!formik.errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.email && !!formik.errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col>
                    <Form.Group controlId="formMobile">
                        <Form.Label>Mobile:</Form.Label>
                        <Form.Control
                            type="text"
                            name="mobile"
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.mobile && !!formik.errors.mobile}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.mobile}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Button className='admin-profile-button' type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default EditProfileAdmin;
