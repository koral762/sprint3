export class EmailCompose extends React.Component {

    state = {
        id: '',
        name: '',
        subject: '',
        body: ``,
        isRead: false,
        sentAt: 0,
        to: ''
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus()
    }

    handleChange = (ev) => {
        const field = ev.target.name
        var value = ev.target.type === 'number' ? +ev.target.value : ev.target.value;

        this.setState({  ...this.state, [field]: value } )
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        this.props.onSubmit(this.state);
        console.log(this.state);

    }

    render() {
        const { to, subject, body } = this.state
        return (
            <section className="emails-compose">
                <form onSubmit={this.handleSubmit}>
                    <div className="nav-compose">
                        <p>New Message</p>
                        <button onClick={this.props.onExit}>X</button>
                    </div>
                    <input type="text" id="to" name="to" value={to} ref={this.inputRef} placeholder="To:" onChange={this.handleChange} />
                    <input type="text" id="subject" name="subject" value={subject} ref={this.inputRef} placeholder="Subject:" onChange={this.handleChange} />
                    <textarea id="body" name="body" value={body} ref={this.inputRef} placeholder="Your email:" onChange={this.handleChange} > </textarea>
                    <input type="submit" value="Send" />

                </form>
            </section>
        )
    }
}

