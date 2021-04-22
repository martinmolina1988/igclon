import React from 'react';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COMMETS } from '../../../../gql/comment';
import ImageNotFound from "../../../../assets/png/avatar.png"
import { map } from 'lodash';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import "./Comments.scss";
export default function Comments(props) {
    const { publication, commentSend, setCommentSend } = props;

    useEffect(() => {
        refetch()
        setCommentSend(false)
    }, [commentSend])

    const { data, loading, refetch } = useQuery(GET_COMMETS, {
        variables: {
            idPublication: publication.id,
        },
    })
    if (loading) return null;

    const { getComments } = data;
    return (
        <div className="comments">
            {map(getComments, (comment, index) => (
                <Link to={`/${comment.idUser.username}`} key={index} className="comment">
                    <Image src={comment.idUser.avatar || ImageNotFound} avatar />
                    <div>
                        <p>{comment.idUser.username}</p>
                        <p>{comment.comment}</p>
                    </div>
                </Link>

            ))}
        </div>
    )
}
