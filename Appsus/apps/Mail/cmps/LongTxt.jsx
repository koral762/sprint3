
const MAX_CHARS_COUNT = 15;

export class LongTxt extends React.Component {
    state = {
        description: '',
        isLongTxtShown: false
    }

    componentDidMount() {
        const { description, subject } = this.props
        if (description.length >= MAX_CHARS_COUNT) {
            this.setState({ isLongTxtShown: true })
        }
    }

    getReadORnot(isRead) {
        return (isRead) ? '' : 'unread'
    }


    render() {
        const { description, subject, isRead } = this.props
        const { isLongTxtShown } = this.state

        let text = description;
        return (
            <p>
                <span className="subject" className={this.getReadORnot(isRead)}>{subject + '- '}</span>
                {!isLongTxtShown ? text : text.substring(0, 40) + '...'}
                {/* <span onClick={this.toggleIsLongTxtShown}>{isLongTxtShown ? ' [Read Less]' : ' [Read More]'}</span> */}
            </p>
        )
    }
}