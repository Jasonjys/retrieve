import React from 'react';
import { StyleSheet, View } from 'react-native'
import { styles } from './styles'
import { Container, Content, Button, Icon, Item, Input, Text} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'

export default class IndexPage extends React.Component {
  render() {
    return (
      // // <Container style={styles.container}>
      // <Container>
      //   <Content>
      //       {/* <View style={styles.textContainer}>
      //         <Text>Lost</Text>
      //       </View>
      //       <View style={styles.textContainer}>
      //       </View> */}
      //       <Grid>
      //         <Row style={{ backgroundColor: '#635DB7'}}/>
      //         <Row style={{ backgroundColor: '#635DB7'}}/>
      //       </Grid>
      //   </Content>
      // </Container>

      <Container>
        <Content style={styles.contentStyle} contentContainerStyle={{flexGrow: 1}}>
          <Grid>
            <Row style={styles.textContainer}>

              <Content>
                <Grid>
                  <Col size={75}>
                    <Item rounded style={{borderColor: '#af6349'}}>
                      <Icon active name='search'/>
                      <Input placeholder='Rounded Textbox'/>
                    </Item>
                  </Col>
                  
                  <Col size={25}>
                    <Button small transparent>
                      <Text>Search</Text>
                    </Button>
                  </Col>
                </Grid>
              </Content>

              <Content>
                <Grid>
                  <Col size={75}>
                    <Item rounded style={{borderColor: '#af6349'}}>
                      <Icon active name='search'/>
                      <Input placeholder='Rounded Textbox'/>
                    </Item>
                  </Col>
                  
                  <Col size={25}>
                    <Button small transparent>
                      <Text>Search</Text>
                    </Button>
                  </Col>
                </Grid>
              </Content>

            </Row>
            <Row style={styles.textContainer}>
                <Button rounded light large>
                  <Icon name='add' />
                </Button>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}
