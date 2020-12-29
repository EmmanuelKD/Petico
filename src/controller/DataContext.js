import React from "react"
import { Datacontext } from "./contexts"


class DataContextProvider extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            expandAll: false,
        
        }
    }

    toggleExpandAll = () => this.setState({ expandAll: !this.state.expandAll })
      
    render() {
        return (
        
        <Datacontext.Provider
            value={{

                state: this.state,
                toggleExpandAll:this.toggleExpandAll
            }}>

            {this.props.children}
        </Datacontext.Provider>)
    }
}


const DataContextConsumer = Datacontext.Consumer;
export { DataContextConsumer, DataContextProvider }