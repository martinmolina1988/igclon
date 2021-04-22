import React, { useState } from 'react';
import { Form, Button } from "semantic-ui-react";
import { useFormik } from 'formik';
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../gql/user"
import * as Yup from "yup";
import { setToken, decodeToken } from "../../../utils/token"
import useAuth from '../../../hooks/useAuth';
import "./LoginForm.scss";

export default function LoginForm() {
    const { setUser } = useAuth()

    const [login] = useMutation(LOGIN)
    const [error, setError] = useState("")
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            email: Yup.string().email("El email no es valido").required("El email es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria"),

        }),
        onSubmit: async (FormData) => {
            try {
                setError("");
                const { data } = await login({
                    variables: {
                        input: FormData
                    }
                });
                const { token } = data.login;
                setToken(token)
                setUser(decodeToken(token))
            } catch (error) {

                setError(error.message)
            }

        }
    })

    return (
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <h2>Entrá a ver fotos y videos de tus amigos</h2>
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
            <Button type="submit" className="btn-submit"> Iniciar sesion</Button>
            {error &&
                <p className="submit-error">{error}</p>}
        </Form>
    )
}

function initialValues() {
    return {
        email: "",
        password: ""
    }
}