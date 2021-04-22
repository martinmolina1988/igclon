import Axios from "axios";
import * as FormData from 'form-data';


export async function subirImagen(file) {
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'martin')
    const res = await Axios(
        {
            url: 'https://api.cloudinary.com/v1_1/djxxttv9t/image/upload',
            method: 'POST',
            data: data
        }
    )
    if (res) {
        return res
    }
}