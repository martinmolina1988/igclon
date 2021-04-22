import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../gql/user';
import { Grid, Image } from 'semantic-ui-react';
import ImageNotFound from "../../../assets/png/avatar.png"
import UserNotFound from '../../UserNotFound';
import ModalBasic from '../../Modal/ModalBasic';
import AvatarForm from '../AvatarForm';
import userAuth from "../../../hooks/useAuth";
import HeaderProfile from './HeaderProfile';
import SettingsForm from './../SettingsForm/SettingsForm';
import Followers from './Followers/Followers';
import "./Profile.scss";


export default function Profile(props) {

    const { username, totalPublications } = props;
    const { auth } = userAuth();
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [childrenModal, setChildrenModal] = useState(null);
    const { data, loading, error, refetch } = useQuery(GET_USER, {
        variables: { username }
    })
    if (error) return <UserNotFound />
    if (loading) return null;
    const { getUser } = data;

    const handleModal = (type) => {
        switch (type) {
            case "avatar":
                setTitleModal("Cambiar foto de perfil")
                setChildrenModal(<AvatarForm setShowModal={setShowModal} auth={auth} />)
                setShowModal(true)
                break;
            case "settings":
                setTitleModal("");
                setChildrenModal(
                    <SettingsForm
                        setShowModal={setShowModal}
                        setTitleModal={setTitleModal}
                        setChildrenModal={setChildrenModal}
                        getUser={getUser}
                        refetch={refetch}
                    />);
                setShowModal(true);

                break;
            default:
                break;
        }
    }
    return (
        <>
            <Grid className="profile">
                <Grid.Column width={6} className="profile__left">
                    <Image className="image" src={getUser.avatar ? getUser.avatar : ImageNotFound} onClick={() => username === auth.username && handleModal("avatar")} />
                </Grid.Column>
                <Grid.Column width={10} className="profile__right computer only">


                    <HeaderProfile username={username} handleModal={handleModal} auth={auth} />


                    <Followers username={username} totalPublications={totalPublications} />
                    <div className="other">
                        <p className="name">
                            {getUser.name}
                        </p>
                        {getUser.siteWeb &&
                            (
                                <a href={getUser.siteWeb} className="siteWeb" target="_blank">
                                    {getUser.siteWeb}
                                </a>
                            )

                        }
                        {
                            getUser.description && (
                                <p className="description">
                                    {getUser.description}
                                </p>
                            )
                        }
                    </div>
                </Grid.Column>
                <Grid.Column className="mobile tablet only">

                    <HeaderProfile username={username} handleModal={handleModal} auth={auth} />
                </Grid.Column>
                <Grid.Row className="mobile tablet only row">

                    <div className="other">
                        <p className="name">{getUser.name}</p>
                        {getUser.siteWeb &&
                            (
                                <a href={getUser.siteWeb} className="siteWeb" target="_blank">
                                    {getUser.siteWeb}
                                </a>
                            )

                        }
                        {
                            getUser.description && (
                                <p className="description">
                                    {getUser.description}
                                </p>
                            )
                        }
                    </div>

                    <Followers className="followers" username={username} totalPublications={totalPublications} />

                </Grid.Row>
            </Grid>
            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}  >
                {childrenModal}
            </ModalBasic>
        </>
    )
}
