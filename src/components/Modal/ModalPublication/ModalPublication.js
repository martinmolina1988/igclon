import React, { useState } from 'react';
import { Grid, Modal } from 'semantic-ui-react';
import CommentForm from '../CommentForm';
import Actions from './Actions';
import Comments from './Comments/Comments';
import "./ModalPublication.scss";

export default function ModalPublication(props) {

    const { publication, show, setShow } = props;
    const [commentSend, setCommentSend] = useState(false)
    const onClose = () => setShow(false)

    return (
        <Modal open={show} onClose={onClose} className="modal-publication">
            <Grid className="computer only">
                <Grid.Column className="modal-publication__left" width={10}
                    style={{ backgroundImage: `url("${publication.secure_url}")` }}
                />
                <Grid.Column className="modal-publication__right" width={6} >
                    <Comments
                        publication={publication}
                        commentSend={commentSend}
                        setCommentSend={setCommentSend}
                    />
                    <Actions publication={publication} />
                    <CommentForm
                        setCommentSend={setCommentSend}
                        publication={publication}
                    />
                </Grid.Column>

            </Grid>
            <Grid className="mobile tablet only">
                <Grid.Row className="modal-publication__left"
                    style={{ backgroundImage: `url("${publication.secure_url}")` }}
                />

                <Grid.Row className="modal-publication__right"  >
                    <Actions publication={publication} />
                    <Comments
                        publication={publication}
                        commentSend={commentSend}
                        setCommentSend={setCommentSend}
                    />
                    <CommentForm
                        setCommentSend={setCommentSend}
                        publication={publication}
                    />
                </Grid.Row>
            </Grid>
        </Modal >
    )
}
