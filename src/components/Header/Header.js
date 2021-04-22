import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Image } from 'semantic-ui-react';

import Logo from "../../assets/png/instaclone.png"
import RightHeader from './../RightHeader';
import Search from './Search/Search';
import "./Header.scss";

export default function Header(props) {
    const { setUpdateReload } = props;
    return (
        <div className="header">
            <Container>
                <Grid>
                    <Grid.Column width={4} className="header__logo">

                        <Link to="/">
                            <Image src={Logo} alt="instaclone" />
                        </Link>
                    </Grid.Column>
                    <Grid.Column width={5} className="computer only" >

                        <Search />
                    </Grid.Column>
                    <Grid.Column width={3} className="right floated" >
                        <RightHeader setUpdateReload={setUpdateReload} />
                    </Grid.Column>
                </Grid>
            </Container>

        </div>
    )
}
