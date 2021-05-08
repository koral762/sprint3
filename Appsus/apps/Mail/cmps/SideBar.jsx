import { mailService } from '../services/mail.service.js'


export class SideBar extends React.Component {

    state = {
        count: 0
    }

    componentDidMount() {
        mailService.countUnreadMails()
            .then((count) => {
                this.setState({ count })
                console.log(count);
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.componentDidMount()
        }
    }




    render() {

        const { count } = this.state

        return (
            <section className="sidebar-containr ">
                <div className="sidebar">
                    <button className="compose" onClick={() => this.props.compose()}>+ Compose</button>
                    <a href="#home"><i className="fa fa-inbox"></i> Index</a>
                    <a href="#services"><i className="fa fa-star"></i> Starred</a>
                    <a href="#clients"><i className="fa fa-paper-plane"></i> Sent mails</a>
                    <a href="#contact"><i className="fa fa-file"></i> Drapts</a>

                    <div className="unread-emails">You have <span className="count">{count}</span> unread emails</div>

                </div>

            </section>
        )
    }
}