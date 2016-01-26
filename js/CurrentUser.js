
import React from 'react';


import PersonIcon from './PersonIcon';

const CurrentUser = React.createClass({
    getInitialState: function() {
        return {
            user: null
        };
    },

	componentDidMount: function() {
        this.props.model.get('user.["name","thumbnail","role"]')
        .then(function(response) {
            this.setState({'user': response.json.user});
        }.bind(this));
    },

	render: function() {
		var divStyle = {
			position: 'absolute',
			right: '8px'
		};
		var label = this.state.user ? <span> {this.state.user.name} </span> : undefined; 
		var icon = this.state.user ? <PersonIcon {...this.state.user} /> : undefined;
		return (<div style={divStyle}>
			{label}
			{icon}	
		</div>);
    }
});

export default CurrentUser;
