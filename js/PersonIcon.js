
import React from 'react';

const PersonIcon = React.createClass({
	render: function() {
        const info = this.props.name + '\n' + this.props.role;
        return <img height="44px" width="32px" title={info} alt={info} src={this.props.thumbnail}/>;
    }
});

export default PersonIcon;
