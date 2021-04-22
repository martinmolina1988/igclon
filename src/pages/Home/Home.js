import React from 'react'
import { Grid } from 'semantic-ui-react';
import Feed from '../../components/Home/Feed';

import "./Home.scss";
import UsersNotFolloweds from './../../components/Home/UsersNotFolloweds/UsersNotFolloweds';
export default function Home() {
    return (
        <Grid className="home">
            <Grid.Column className="home__left computer only " width={11}>
                <Feed />
            </Grid.Column>
            <Grid.Column className="home__right computer only" width={5}>
                <UsersNotFolloweds />

            </Grid.Column>
            <Grid.Column className="home__left tablet movil only " width={16}>
                <Feed />
            </Grid.Column>
        </Grid>
    )
}

