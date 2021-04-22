import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';
import ModalPublication from '../../Modal/ModalPublication/ModalPublication';
import "./PreviewPublication.scss";


export default function PreviewPublication(props) {

    const { publication } = props;

    const [showModal, setshowModal] = useState(false)
    return (<>
        <div className="preview-publication" onClick={() => setshowModal(true)}>
            <Image className="preview-publication__image" src={publication.secure_url} />
        </div>
        <ModalPublication show={showModal} setShow={setshowModal} publication={publication} />
    </>
    )
}
