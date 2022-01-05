import React from 'react';
import { Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

class LoginComponent extends React.Component {
    constructor(props) {
        super()
        this.state = {
            email: '',
            password:''
        }
    }

    render() {
        const handleSubmit = async (e) => {
            e.preventDefault();
            try{
                var response = await axios.post('http://integra-node-ecommerce.herokuapp.com/register/signin', {
                    password: this.state.password,
                    email: this.state.email
                })
                if(response.data) {
                    await localStorage.setItem('token',response.data);
                    this.props.history.push('/product');
                }
            } catch(err) {
                console.warn(err)
            }
        }
        return (
            <div style={{ padding: '60px' }}>
                <Typography variant="h5" >Login Component</Typography>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <TextField label="Email" variant="standard"
                            name="email" 
                            value={this.state.email} 
                            onChange={(e)=> this.setState({email: e.target.value})} />
                    </div>
                    <div>
                        <TextField type="password" label="Password" variant="standard"
                            name="password" 
                            value={this.state.password} 
                            onChange={(e)=> this.setState({password: e.target.value})}/>
                    </div> <br />
                    <div>
                        <Button type="submit" variant="contained">Submit</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginComponent;