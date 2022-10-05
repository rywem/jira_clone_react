import React from 'react';
import { Menu, Container, Button, Icon } from 'semantic-ui-react';

interface Props {
    openForm: () => void;
}

export default function NavBar(props: Props) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <Icon fitted name="tasks" />
                    &nbsp; JCR
                </Menu.Item>
                <Menu.Item name="Projects"/>
                <Menu.Item name="Login"/>
                <Menu.Item name="Register" />
                <Menu.Item >
                    <Button positive content="Create Project" onClick={props.openForm} />
                </Menu.Item>
            </Container>
        </Menu>
    )
}