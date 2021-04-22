import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UPDATE_USER } from './../../../gql/user';
import { useMutation } from '@apollo/client';


import "./EmailForm.scss";
import { toast } from 'react-toastify';


export default function EmailForm(props) {

    const { setShowModal, currentEmail, refetch } = props;

    const [updateUser] = useMutation(UPDATE_USER)

    const formik = useFormik({
        initialValues: {
            email: currentEmail || "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required()
        }),
        onSubmit: async (formData) => {
            try {
                await updateUser({
                    variables: {
                        input: formData
                    },
                });
                refetch();
                setShowModal(false);
            } catch (error) {
                toast.error("Error al actualizar el email")
            }
        }
    })

    return (
        <Form className="email-form" onSubmit={formik.handleSubmit}>
            <Form.Input
                placeholder="Escribe tu nuevo mail"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email && true}
            />
            <Button type="submit" className="btn-submit">Actualizar email</Button>

        </Form>
    )
}
