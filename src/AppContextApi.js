import React from "react"
// import { onAutStateChange } from './controller/firebaseAuthentication'

const ContextCreator = React.createContext();

class ContextProvider extends React.PureComponent {

    constructor() {
        super();

        this.state = {
            showDialog: true,
        }
    }


    logout = () => {
        this.setState({ showDialog: true })
    }

    login = () => {
        this.setState({ showDialog: false })
    }

    // loginAsAdmin = (isadmin) => {
    //     this.setState({showDialog: false })
    // }

    render() {


        return (
            <ContextCreator.Provider
                value={
                    {   login:this.login,
                        showDialog:this.state.showDialog,
                    }
                }
            >
                {this.props.children}
            </ContextCreator.Provider>
        )
    }
}

const ContextConsumer = ContextCreator.Consumer;

export { ContextConsumer, ContextProvider }