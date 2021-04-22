import React, { useCallback } from 'react';
import { Modal, Icon, Button, Dimmer, Loader } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { PUBLISH } from './../../../gql/publication';
import "./ModalUpload.scss";
import { toast } from 'react-toastify';
import { subirImagen } from '../../../api/ImagesApi';




export default function ModalUpload(props) {

    const { show, setShow, setUpdateReload } = props;

    const [publish] = useMutation(PUBLISH);
    const [loading, setLoading] = useState(false)
    const [urlImage, setUrlImage] = useState(null);
    const [fileUpload, setFileUpload] = useState(null);
    const [file, setFile] = useState(null)


    const onDrop = useCallback(
        (acceptedFile) => {
            const File = acceptedFile[0];
            setFile(File);

            setFileUpload({
                type: "image",
                file: File,
                preview: URL.createObjectURL(File),
            })
        })


    const { getInputProps, getRootProps } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop,
    })

    const onClose = () => {
        setFileUpload(null)
        setUpdateReload(true)
        setShow(false);
    }

    const onPublish = () => {
        if (file) {
            try {
                setLoading(true);
                subirImagen(file).then(async res => {
                    if (res) {
                        console.log(res.data.secure_url, res.data.public_id)
                        if (res.statusText !== "OK") {
                            toast.warning("Error al subir la imagen");
                            setLoading(false);
                        } else {
                            toast.success("Imagen subida correctamente");
                            setLoading(false);
                            setShow(false);
                            setUpdateReload(true)
                        }
                        await publish({
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
        }
    }

    return (
        <Modal size="small" open={show} onClose={onClose} className="modal-upload">

            <div {...getRootProps()} className="dropzone"
                style={fileUpload && { border: 0 }}>
                {
                    !fileUpload && (

                        <>
                            <Icon name="cloud upload" />
                            <p>Arrasta la foto que quieras publicar</p>
                        </>)
                }
                <input {...getInputProps()} />
            </div>
            {fileUpload?.type === "image" && (
                <div className="image" style={{ backgroundImage: `url("${fileUpload.preview}")` }} />
            )

            }

            {fileUpload && (
                <Button className="btn-upload btn-action" onClick={onPublish}>
                    Publicar
                </Button>
            )}

            {loading &&
                (
                    <Dimmer active className="publishing">
                        <Loader />
                        <p>Publicando</p>

                    </Dimmer>
                )}
        </Modal>
    )
}
