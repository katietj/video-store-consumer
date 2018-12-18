import React from "react";

class Library extends React.Component {

    render() {
        console.log(this.props.path);

        return (
            <div>
                <h2>Library</h2>
            </div>
        )
    }
}


export default Library;
