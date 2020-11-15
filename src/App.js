import React from 'react';
import './App.css';
import firebase from './Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("Products").doc("users").collection("project");
    this.unsubscribe = null;
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

  }
  onCollectionUpdate = (querySnapshot) => {
    const products = [];
    console.log("data", products)

    querySnapshot.forEach((doc) => {
      const { name, descripstion, url } = doc.data();
      products.push({
        key: doc.id,
        doc,
        name,
        descripstion,
        url
      });
    });

    this.setState({
      products

    });

  }

  render() {

    const cardStyle = {
      width: 'auto',
      height: 'auto',
      background_color: 'white',
      margin: 'auto',
      display: 'block',
      marginTop: '60dp',
      opacity: 0.5,
      paddingTop: '10dp',
      paddingLeft: '20dp',
      paddingRight: '20dp',
      boderStyle: 'aoutset',
      borderLeft: '50px soild black',
      borderRadius: '20px',

    }
    return (
      <div>
        <Card style={cardStyle}>

          <div class="Buttons">
            <Link to="/create">
              <button class="Add-Button" >addProduct</button>
            </Link>
          </div>

          <div class="container">
            <div class="panel panel-heading">
              <h3 class="Panel heading">Product Details</h3>
            </div>
          </div>

          <div class="panel-body">
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {this.state.products.map(product =>
                  <tr>
                    <td><Link to={`/show/${product.key}`}>{product.name}</Link></td>
                    <td>{product.descripstion}</td>
                    <td><img src={product.url} width="100px" height="100px" alt=""></img></td>
                  </tr>

                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    )
  }
}

export default App;