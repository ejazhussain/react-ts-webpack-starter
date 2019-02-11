import * as React from "react";


export class App extends React.Component<IProps, any>{
    render() {
        return (
            <div>
                <h1>Hello .. {this.props.name}</h1>
            </div>
        );
    }
}


interface IProps {
    name: string;
}
