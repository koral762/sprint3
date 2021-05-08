import { mailService } from '../services/mail.service.js'
import { SideBar } from './SideBar.jsx'
import { EmailList } from './EmailList.jsx'
import { EmailFilter } from './EmailFilter.jsx'
import { EmailCompose } from './EmailCompose.jsx'


export class EmailApp extends React.Component {

    state = {
        mails: [],
        filter: null,
        selectedEmail: null,
        deleated: 0,
        compose: false,
        email:[]
    }

    onCompose = () => {
        this.setState({ ...this.state, compose: true })
    }

    onSubmit = (newmail) => {
        console.log(newmail);
        mailService.creatEmail(newmail, this.onExit());
    }

    componentDidMount() {
        this.loadMails();
    }

    loadMails() {

        mailService.query(this.state.filter)
            .then((mails) => {
                this.setState({ mails })
            })
    }


    onSetFilter = (filter) => {
        this.setState({ filter }, this.loadMails)
    }

    openEmailDetails = (mail) => {
        if (!mail.isRead) { mail.isRead = true }
        mailService.saveEmailsToStorage();
    }

    onExit = () => {
        this.setState({ ...this.state, compose: false })
    }

    onRemove = (mail) => {
        mailService.removeMail(mail);
        this.setState({ ...this.state, deleated: 1 })
    }

    render() {
        const { mails, filter, selectedEmail } = this.state
        if (!mails) return <div className="loading">Loading...</div>

        return (
            <section className="main-mail-page">
                <SideBar compose={this.onCompose} />
                <div className="emails-containr">
                    <EmailFilter filter={filter} onSetFilter={this.onSetFilter} />
                    <EmailList emails={mails} open={this.openEmailDetails} remove={this.onRemove} />
                </div>
                {this.state.compose && <EmailCompose onCompose={this.onCompose} onSubmit={this.onSubmit} onExit={this.onExit} />}
            </section>
        )
    }
}