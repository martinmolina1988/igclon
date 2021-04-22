import { useApolloClient } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router';
import { Button } from 'semantic-ui-react';
import useAuth from '../../../hooks/useAuth';
import PasswordForm from './../PasswordForm/PasswordForm';
import EmailForm from './../EmailForm/EmailForm';
import DescriptionForm from './../DescriptionForm';

import "./SettingsForm.scss"
import SiteWebForm from './../SiteWebForm/SiteWebForm';


export default function SettingsForm(props) {


    const { setShowModal, setChildrenModal, setTitleModal, getUser, refetch } = props;
    const history = useHistory();
    const client = useApolloClient();
    const { logout } = useAuth();

    const onLogout = () => {
        client.clearStore();
        logout();
        history.push("/");
    }

    const onChangePassword = () => {
        setTitleModal("Cambiar tu contraseña")
        setChildrenModal(
            <PasswordForm
                logout={onLogout}
            />)
    }

    const onChangeEmail = () => {
        setTitleModal("Cambiar tu email");
        setChildrenModal(
            <EmailForm
                setShowModal={setShowModal}
                currentEmail={getUser.email}
                refetch={refetch}
            />)
    }

    const onChangeDescription = () => {
        setTitleModal("Actializa tu biografia");
        setChildrenModal(
            <DescriptionForm
                setShowModal={setShowModal}
                currentDescription={getUser.description}
                refetch={refetch}
            />)
    }

    const onChangeSiteWeb = () => {
        setTitleModal("Actualizar sitio web");

        setChildrenModal(
            <SiteWebForm
                setShowModal={setShowModal}
                currentSiteWeb={getUser.siteWeb}
                refetch={refetch}
            />)

    }

    return (
        <div className="settings-form" >
            <Button onClick={onChangePassword}>Cambiar contraseña</Button>
            <Button onClick={onChangeEmail} >Cambiar Email</Button>
            <Button onClick={onChangeDescription}>Descripción</Button>
            <Button onClick={onChangeSiteWeb}>Sitio web</Button>
            <Button onClick={onLogout} >Cerrar sesión</Button>
            <Button onClick={() => setShowModal(false)} >Cancelar</Button>
        </div>
    )
}
