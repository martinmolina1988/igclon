import { map } from 'lodash';
import React from 'react'
import { Grid } from 'semantic-ui-react';
import PreviewPublication from './PreviewPublication/PreviewPublication';


import "./Publications.scss"
import { useState } from 'react';

export default function Publications(props) {
    const { getPublication } = props;
    window.onload = function () {
        console.log("hola");
    }
    const initualValue = () => {
        if (document.body.scrollWidth > 620) return 4
        if (document.body.scrollWidth > 500 && document.body.scrollWidth < 620) return 3
        if (document.body.scrollWidth < 500) return 2
        return
    }
    const [width, setWidth] = useState(initualValue)
    window.addEventListener("resize", function () {
        if (document.body.scrollWidth > 620) setWidth(4)
        if (document.body.scrollWidth > 500 && document.body.scrollWidth < 620) setWidth(3)
        if (document.body.scrollWidth < 500) setWidth(2)

    });

    return (
        <div className="publications">
            <h1>Publicaciones</h1>
            <Grid columns={width}>
                {map(getPublication, (element, index) => (
                    <Grid.Column key={index}>
                        <PreviewPublication publication={element} />
                    </Grid.Column>
                ))}
            </Grid>

        </div>
    )
}
