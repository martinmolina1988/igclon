import React from 'react';
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { REGISTER } from '../../../gql/user';
import "./RegisterForm.scss";


export default function RegisterForm(props) {
    const { setShowLogin } = props;
    const [register] = useMutation(REGISTER)
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            name: Yup.string().required("Tu nombre es obligatorio"),
            username: Yup.string().matches(/^[a-zA-Z0-9-]*$/, "El nombre de usuario no puede tener espacios").required("Tu nombre de usuario es obligatorio"),
            email: Yup.string().email("El email no es valido").required("El email es obligatorio"),
            password: Yup.string()
                .required("La contraseña es obligatoria")
                .oneOf([Yup.ref("repeatPassword")], "Las contraseñas no son iguales"),
            repeatPassword: Yup.string()
                .required("La contraseña es obligatoria")
                .oneOf([Yup.ref("password")], "Las contraseñas no son iguales"),

        }),
        onSubmit: async (FormData) => {
            try {
                const newUser = FormData;
                delete newUser.repeatPassword;
                await register({
                    variables: {
                        input: newUser,
                    },
                });
                toast.success("Usuario registrado correctamente");
                setShowLogin(true)
            } catch (error) {
                toast.error(error.message)
            }
        }
    });


    return (
        <>
            <h2 className="register-from-title">Registrate para ver fotos y videos de tus amigos</h2>
            <Form className="register-form" onSubmit={formik.handleSubmit}>
                <Form.Input
                    type="text"
                    placeholder="Nombre y apellido"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.errors.name}
                />
                <Form.Input
                    type="text"
                    placeholder="Nombre de usuario"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.errors.username}
                />
                <Form.Input
                    type="text"
                    placeholder="Correo electronico"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                />
                <Form.Input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                />
                <Form.Input
                    type="password"
                    placeholder="Repetir contraseña"
                    name="repeatPassword"
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                    error={formik.errors.repeatPassword}
                />
                <Button type="submit" className="btn-submit">
                    Registrarse
                </Button>

            </Form>
        </>
    )
}

function initialValues() {
    return {
        name: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
    };
}
