import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UPDATE_USER } from './../../../gql/user';
import { useMutation } from '@apollo/client';
import "./PasswordForm.scss";
import { toast } from 'react-toastify';
export default function PasswordForm(props) {

    const { logout } = props;

    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            currentPassword: Yup.string().required(),
            newPassword: Yup.string().required().oneOf([Yup.ref("RepeatNewPassword")]),
            RepeatNewPassword: Yup.string().required().oneOf([Yup.ref("newPassword")])
        }),
        onSubmit: async (FormData) => {
            try {
                const result = await updateUser({
                    variables: {
                        input: {
                            currentPassword: FormData.currentPassword,
                            newPassword: FormData.newPassword,
                        },
                    }
                });

                if (!result.data.updateUser) {
                    toast.error("Error al cambiar la contraseña");
                }
                else {
                    logout();
                    toast.success("Contraseña cambiada exitosamente");
                }


            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <Form className="password-form" onSubmit={formik.handleSubmit}>
            <Form.Input placeholder="Contraseña actual"
                type="password"
                name="currentPassword"
                onChange={formik.handleChange}
                value={formik.values.currentPassword}
                error={formik.errors.currentPassword && true}
            />
            <Form.Input placeholder="Nueva contraseña"
                type="password"
                name="newPassword"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                error={formik.errors.newPassword && true}
            />

            <Form.Input placeholder="Repetir nueva contraseña"
                type="password"
                name="RepeatNewPassword"
                onChange={formik.handleChange}
                error={formik.errors.RepeatNewPassword && true}
                value={formik.values.RepeatNewPassword} />
            <Button type="submit" className="btn-submit" >Actualizar</Button>
        </Form>

    )
}

function initialValues() {
    return {
        currentPassword: "",
        newPassword: "",
        RepeatNewPassword: ""
    }
}