import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection("Products").doc("users").collection("project");

        this.state = {
            name: '',
            descripstion: '',
            url: '',
            image: null,

        };
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    handleChange = (e) => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0]
            })
        }
        console.log(e.target.files[0]);
    }

    handleUpload = (e) => {
        const { image } = this.state;
        const uploadTask = firebase.storage().ref(`images/${image.name}`).put(this.state.image);
        uploadTask.on('state_changed', (snapshot) => { console.log('snapshot') },
            (error) => { console.log(error); },
            () => {
                firebase.storage().ref('images')
                    .child(image.name).getDownloadURL()
                    .then(url => this.setState({ url }))
            }
        )
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { name, descripstion } = this.state;
        this.ref.add({
            name,
            descripstion,
            url: this.state.url
        }).then((docRef) => {
            this.setState({
                name: '',
                descripstion: '',
                url: ''
            });
            this.props.history.push("/")
        })
            .catch((err) => {
                console.log("erro", err)
            });
    }

    render() {
        const { name, descripstion } = this.state;
        const cardStyle = {
            width: '40rem',
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

        }
        return (
            <div>
                <Card style={cardStyle}>
                    <div class="Buttons">
                        <Link to="/">
                            <button class="Edit-Button" >Show Products</button>
                        </Link>
                    </div>

                    <div>
                        <div>
                            <div class="form-group"></div>
                            <label for="name">Product Name:</label>
                            <input
                                type="text"
                                class="form-control"
                                name="name"
                                value={name}
                                onChange={this.onChange}
                                placeholder="Nhập tên"
                            >
                            </input>
                        </div>

                        <div>
                            <div class="form-group"></div>
                            <label for="descripstion">Product Descripstion:</label>
                            <textarea
                                class="form-control"
                                name="descripstion"
                                onChange={this.onChange}
                                placeholder="Descripstion"
                                cols="80"
                                rows="3">
                                {descripstion}
                            </textarea>
                        </div>
                    </div>

                    <div class="upload-btn-wrapper">
                        <button class="file-btn" >Choose a file</button>
                        <input type="file" onChange={this.handleChange}></input>
                    </div>

                    <div class="upload-data">
                        <img src={this.state.url} height="200" width="200" />
                    </div>

                    <div class="Buttons">
                        <button class="Submit-Button" onClick={this.handleUpload}>Upload Image First</button>
                        <button class="Submit-Button" onClick={this.onSubmit}>Save All</button>
                    </div>

                </Card>

            </div>
        )
    }

}

export default AddProduct