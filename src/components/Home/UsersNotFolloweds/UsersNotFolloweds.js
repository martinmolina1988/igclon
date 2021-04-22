import React from 'react';
import ImageNotFound from "../../../assets/png/avatar.png";
import { useQuery } from '@apollo/client';
import { GET_NOT_FOLLOWEDS } from '../../../gql/follow';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { map } from 'lodash';
import "./UsersNotFolloweds.scss";

export default function UsersNotFolloweds() {

    const { data, loading } = useQuery(GET_NOT_FOLLOWEDS);

    if (loading) return null;

    const { getNotFolloweds } = data;
    return (
        <div className="users-not-followeds">
            <h3>Usuarios que no seguis</h3>
            {map(getNotFolloweds, (user, index) => (
                <Link key={index} to={`/${user.username}`} className="users-not-followeds__user">
                    <Image src={user.avatar || ImageNotFound} avatar />
                    <span>{user.name}</span>
                </Link>
            ))}

        </div>
    )
}
