import React from 'react';
import { Image } from 'semantic-ui-react';
import { size } from 'lodash';
import { map } from 'lodash';
import ImageNotFound from "../../../assets/png/avatar.png";
import { useHistory } from 'react-router';
import "./ListUsers.scss";


export default function ListUsers(props) {

    const { getFollowers, setShowModal } = props;

    const history = useHistory();

    const goToUser = (username) => {
        setShowModal(false);
        history.push(`/${username}`)
    }

    return (
        <div className="list-users">
            {size(getFollowers) === 0 ? (
                <p className="list-users__not-users">No se han encontrado usuarios</p>
            ) : (
                map(getFollowers, (user, index) => (
                    <div onClick={() => goToUser(user.username)} key={index} className="list-users__user">
                        <Image src={user.avatar || ImageNotFound} avatar />
                        <div >
                            <p>{user.name}</p>
                            <p>{user.username}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}
