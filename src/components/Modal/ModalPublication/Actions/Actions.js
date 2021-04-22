import React, { useState } from 'react';
import "./Actions.scss";
import { Icon } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_LIKE, IS_LIKE, DELETE_LIKE, COUNT_LIKE } from './../../../../gql/like';

export default function Actions(props) {

    const { publication } = props;
    const [addLike] = useMutation(ADD_LIKE);
    const [deleteLike] = useMutation(DELETE_LIKE);
    const [loadingAction, setLoadingAction] = useState(false)
    const { data, loading, refetch } = useQuery(IS_LIKE, {
        variables: {
            idPublication: publication.id,
        },
    })

    const { data: dataCount, loading: loadingCount, refetch: refetchCount } = useQuery(COUNT_LIKE, {
        variables: {
            idPublication: publication.id,
        },
    })

    const onAddLike = async () => {
        setLoadingAction(true);
        try {
            await addLike({
                variables: {
                    idPublication: publication.id,
                },
            })
            refetch();
            refetchCount();
        } catch (error) {
            console.log(error)
        }
        setLoadingAction(false);
    }

    if (loading || loadingCount) return null;
    const { isLike } = data;
    const { countLike } = dataCount;
    const onDeleteLike = async () => {
        setLoadingAction(true);
        try {
            await deleteLike({
                variables: {
                    idPublication: publication.id,
                },
            })
            refetch();
            refetchCount();
        } catch (error) {
            console.log(error)
        }
        setLoadingAction(false);
    }

    const onAction = () => {
        if (!loadingAction) {
            if (isLike) {
                onDeleteLike();
            } else {

                onAddLike();
            }
        }
    }

    return (
        <div className={"actions"}>
            <Icon className={isLike ? "like active" : "like"}
                name={isLike ? "heart" : "heart outline"}
                onClick={onAction} />
            {countLike > 0 ? <p>{countLike} Me gusta</p> : ""}
        </div>
    )
}
