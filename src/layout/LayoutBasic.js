import React from 'react'
import { Container } from 'semantic-ui-react'
import Header from './../components/Header';
export default function LayoutBasic(props) {

    const { children, setUpdateReload } = props;
    return (
        <Container>
            <Header setUpdateReload={setUpdateReload} />
            {children}
        </Container>
    )
}
