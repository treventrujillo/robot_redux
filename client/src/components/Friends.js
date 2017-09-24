import React, { Component } from 'react';
import {
   Card, Divider,
   Container, Segment,
   Header, Button,
   Icon, Image, 
  } 
  from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setHeaders } from '../actions/headers';

class Friends extends Component {
  state = { friends: [] }

  componentDidMount() {
    axios.get('/api/friends')
      .then( ({ data, headers }) => {
        this.setState({ friends: data })
        this.props.dispatch(setHeaders(headers))
      });
    }

  render() {
    let { friends } = this.state;
    return ( 
      <Container textAlign="center">
        <Segment basic>
          <Header as="h1">Robots You're Friends With</Header>
        </Segment>
        <Divider />
        <Card.Group stackable>
          {this.state.friends.map(friend =>
            <Card
              key={friend.id}
              centered
            >
              <Card.Header>
                <h2>{friend.name}</h2>
              </Card.Header>
              <Card.Content>
                <Image src={friend.avatar} />
              </Card.Content>
              <Card.Meta>
                <Segment basic>
                  <h4>Age: {friend.age}</h4>
                  <h4>Gender: {friend.gender}</h4>
                </Segment>
              </Card.Meta>
              <Card.Description>
                <p>{friend.bio}</p>
              </Card.Description>
              <Card.Content extra>
                <Button
                  basic color='green'
                  onClick={() => this.handleClick(friend.id)}>
                  <Icon name="add user"></Icon>
                  Friend
              </Button>
              </Card.Content>
            </Card>
          )
          }
        </Card.Group>
      </Container>
    );
  }
}

export default connect()(Friends);