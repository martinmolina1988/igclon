import React, { useCallback, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { UPDATE_IMAGE, GET_USER, DELETE_AVATAR } from "../../../gql/user";
import { subirImagen } from '../../../api/ImagesApi';
import { toast } from "react-toastify";
import "./AvatarForm.scss";

export default function AvatarForm(props) {

    const { setShowModal, auth } = props;

    const [loading, setLoading] = useState(false)
    const [urlImage, setUrlImage] = useState(null);

    const [updateImage] = useMutation(UPDATE_IMAGE, {
        update(cache, { data: { updateImage } }) {
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: { username: auth.username },
            });
            cache.writeQuery({
                query: GET_USER,
                variables: { username: auth.username },
                data: {
                    getUser: { ...getUser, avatar: urlImage }
                }
            })
        }
    });


    const [deleteAvatar] = useMutation(DELETE_AVATAR, {
        update(cache) {
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: { username: auth.username }
            });
            cache.writeQuery({
                query: GET_USER,
                variables: { username: auth.username },
                data: {
                    getUser: { ...getUser, avatar: "" }
                }
            })
        }
    });

    const onDrop = useCallback(
        async (acceptedFile) => {
            const file = acceptedFile[0];
            try {
                setLoading(true);
                subirImagen(file).then(async res => {
                    if (res) {
                        setUrlImage(res.data.secure_url)
                        if (res.statusText !== "OK") {
                            toast.warning("Error al subir la imagen");
                            setLoading(false);
                        } else {
                            toast.success("Imagen subida correctamente");
                            setLoading(false);
                            setShowModal(false);
                        }
                        await updateImage({
                            variables: {
                                input: {
                                    secure_url: res.data.secure_url,
                                    public_id: res.data.public_id
                                }
                            }
                        });
                    }
                })

            } catch (error) {
                console.log(error);
            }

        },
        [],
    )


    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop
    });

    const onDeleteAvatar = async () => {

        try {
            const result = await deleteAvatar()
            const { data } = result;
            if (!data.deleteAvatar) { toast.warning("Error al eliminar la imagen") }
            else setShowModal(false);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="avatar-form">
            <Button {...getRootProps()} loading={loading}>Cargar una foto</Button>
            <Button onClick={onDeleteAvatar}>Eliminar foto actual foto</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
            <input {...getInputProps()} />
        </div>
    )
}
