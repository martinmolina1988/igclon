import React, { useState, useEffect } from 'react';

import "./Followers.scss";
import { useQuery } from '@apollo/client';
import { GET_FOLLOWERS, GET_FOLLOWEDS } from '../../../../gql/follow';
import { size } from 'lodash';
import ModalBasic from './../../../Modal/ModalBasic/ModalBasic';
import ListUsers from '../../ListUsers/ListUsers';

export default function Followers(props) {
    const { username, totalPublications } = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [childrenModal, setChildrenModal] = useState(null);



    const {
        data: dataFollowers,
        loading: loadingFollowers,
        startPolling: startPollingFollowers,
        stopPolling: stopPollingFollowers
    } = useQuery(GET_FOLLOWERS, {
        variables: {
            username
        }
    });
    const {
        data: dataFolloweds,
        loading: loadingFolloweds,
        startPolling: startPollingFolloweds,
        stopPolling: stopPollingFolloweds
    } = useQuery(GET_FOLLOWEDS, {
        variables: {
            username
        }
    });

    useEffect(() => {
        startPollingFollowers(1000);
        return () => {
            stopPollingFollowers();
        }
    }, [startPollingFollowers, stopPollingFollowers])


    useEffect(() => {
        startPollingFolloweds(1000);
        return () => {
            stopPollingFolloweds();
        }
    }, [startPollingFolloweds, stopPollingFolloweds])




    if (loadingFollowers || loadingFolloweds) return null;

    const { getFollowers } = dataFollowers;
    const { getFolloweds } = dataFolloweds;

    const openFolloweds = () => {
        setTitleModal("Seguidos");
        setChildrenModal(
            <ListUsers getFollowers={getFolloweds} setShowModal={setShowModal} />
        )
        setShowModal(true);
    }

    const openFollowers = () => {
        setTitleModal("Seguidores");
        setChildrenModal(
            <ListUsers getFollowers={getFollowers} setShowModal={setShowModal} />
        )
        setShowModal(true);
    }

    return (<>
        <div className="followers">
            <p><span>{totalPublications}</span> Publicaciones</p>
            <p className="link" onClick={openFollowers}><span>{size(getFollowers)}</span> Seguidores</p>
            <p className="link" onClick={openFolloweds}><span>{size(getFolloweds)}</span> Seguidos</p>
        </div>
        <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
            {childrenModal}
        </ModalBasic>
    </>)
}
