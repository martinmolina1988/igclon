import { useQuery } from '@apollo/client';
import React from 'react'
import { useParams } from 'react-router-dom'
import { GET_PUBLICATION } from '../gql/publication';
import Profile from './../components/User/Profile';
import { size } from 'lodash';
import Publications from './../components/Publications/Publications';
import { useEffect } from 'react';

export default function User(props) {
    const { updateReload } = props;
    const { username } = useParams();


    const { data, loading, refetch } = useQuery(GET_PUBLICATION, {
        variables: { username },
    });

    useEffect(() => {
        refetch();
    }, [updateReload])

    if (loading) return null;
    const { getPublication } = data;
    return (
        <>
            <Profile username={username} totalPublications={size(getPublication)} />
            <Publications getPublication={getPublication} />
        </>
    )
}
