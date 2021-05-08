const { Link } = ReactRouterDOM


export class Header extends React.Component {

    state={
        className:''
    }

    myFunction() {

  
    }

    render() {
        return (
            <section className="header" id="myTopnav">
                <Link  className="activ link" to="/Home">Go to home</Link>
                <Link  className="link" to="/mail">Go to mail</Link>
                <Link  className="link" to="/NoteApp">Go to Keep</Link>
                <Link className="link" to="/book">Go to book</Link>
                <a  className="icon" onClick={this.myFunction()}>
                    <i className="fa fa-bars"></i>
                </a>
            </section>
        )
    }
}