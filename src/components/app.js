import React from 'react';
import axios from 'axios';


const testData = [
        {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
    {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
    {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
];


class CardList extends React.Component {
    render(){
        return (
        <div>
            {this.props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
        </div>
        );
    }
}

class Card extends React.Component{
    render(){
        const profile = this.props;
        return (
            <div className='github-profile' style={{margin: '1rem'}}>
                <img src = {profile.avatar_url}/>
                <div className='info' style={{display: 'inline-block', marginLeft: 10}}>
                    <div className='name' style={{fontsize: '125%'}}>{profile.name}</div>
                    <div className='company'>{profile.company}</div>
                </div>
            </div>
        );
    }
}

class Form extends React.Component{
    state = {userName: ''};

    handleSubmit = async (event) => {
        event.preventDefault();
        const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
        this.props.onSubmit(resp.data);
        this.setState({userName: ''});
    };

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input 
                    type="text" 
                    placeholder="GitHub username" 
                    value={this.state.userName}
                    onChange={event => this.setState({userName: event.target.value})}
                    required
                />
                <button>Add card</button>
            </form>
        );
    }
}

export default class App extends React.Component {
    state = {
        profiles: [],
    };
    addNewProfile = (profileData) => {
        if(!this.state.profiles.some(profile => profile.id == profileData.id)){
            this.setState(prevState => ({
                profiles: [...prevState.profiles, profileData],
            }));
        }
    };
    render(){
        return (
        <div className="header">{this.props.title}
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles = {this.state.profiles}/>
        </div>);
    }
}