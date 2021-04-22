import React, { useState } from 'react';
import ImageNotFound from "../../../assets/png/avatar.png";
import { useQuery } from '@apollo/client';
import { GET_PUBLICATION_FOLLOWEDS } from './../../../gql/publication';
import "./Feed.scss";
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { Image } from 'semantic-ui-react';
import Actions from './../../Modal/ModalPublication/Actions/Actions';
import CommentForm from './../../Modal/CommentForm/CommentForm';
import ModalPublication from './../../Modal/ModalPublication/ModalPublication';

export default function Feed() {

    const [showModal, setShowModal] = useState(false);
    const [publicationSelect, setPublicationSelect] = useState(false);
    const { data, loading } = useQuery(GET_PUBLICATION_FOLLOWEDS);
    if (loading) return null;
    const { getPublicationsFolloweds } = data;

    const openPublication = (publication) => {
        setPublicationSelect(publication);
        setShowModal(true)
    }

    return (
        <>
            <div className="feed">
                {map(getPublicationsFolloweds, (publication, index) => (
                    <div key={index} className="feed__box">
                        <Link to={`/${publication.idUser.username}`}>
                            <div className="feed__box-user">
                                <Image
                                    src={publication.idUser.avatar}
                                    avatar

                                />
                                <span>{publication.idUser.name}</span>
                            </div>
                        </Link>
                        <div className="feed__box-photo"
                            style={{ backgroundImage: `url("${publication.secure_url}")` }}
                            onClick={() => openPublication(publication)}
                        />
                        <div className="feed__box-action">
                            <Actions publication={publication} />
                        </div>
                        <div className="feed__box-form">
                            <CommentForm publication={publication} />
                        </div>
                    </div>
                ))}
            </div>
            {
                showModal && (
                    <ModalPublication
                        show={showModal}
                        setShow={setShowModal}
                        publication={publicationSelect}
                    />
                )
            }
        </>
    )
}
