import React, { Component } from 'react';
import {
   Header, Image, 
   Card, Button, 
   Grid, Container,
   Divider, Segment,
   Icon,
  } 
  from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setHeaders } from '../actions/headers';

class Home extends Component {
  state = { profiles: [] }

  componentDidMount() {
    axios.get('/api/profiles')
      .then( res => {
        this.props.dispatch(setHeaders(res.headers))
        this.setState({ profiles: res.data })
      })
  }

  handleClick = (id) => {
    const { profiles } = this.state;
    axios.put(`/api/friends/${id}`)
      .then( res => {
        this.props.dispatch(setHeaders(res.headers))
        this.setState({ profiles: profiles.filter( p => p.id !== id ) })
      })
  }

  render() {
    return (
      <Container textAlign="center">
        <Segment basic>
          <Header as="h1">Robots You May Know</Header>
        </Segment>
        <Divider />
        <Card.Group stackable>
          { this.state.profiles.map( profile =>
            <Card
              key={profile.id}
              centered
            >
              <Card.Header>
                <h2>{profile.name}</h2>
              </Card.Header>
              <Card.Content>
                <Image src={profile.avatar} />
              </Card.Content>
              <Card.Meta>
                <Segment basic>
                  <h4>Age: {profile.age}</h4>
                  <h4>Gender: {profile.gender}</h4>
                </Segment>
              </Card.Meta>
              <Card.Description>
                <p>{profile.bio}</p>
              </Card.Description>
              <Card.Content extra>
                <Button 
                  basic color='green' 
                  onClick={() => this.handleClick(profile.id)}>
                  <Icon name="add user"></Icon>
                  Friend
                </Button>
              </Card.Content>
            </Card>
            )
          }
        </Card.Group>
        <Button>
          <Link to="/friends">View Friends</Link>
        </Button>
      </Container>
    );
  }
}

export default connect()(Home);
