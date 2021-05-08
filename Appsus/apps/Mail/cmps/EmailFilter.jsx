export class EmailFilter extends React.Component {

    state = {

        filterBy: {
            search: '',
            isUnRead: false,
        }
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus()
    }

    handleChange = (ev) => {
        const field = ev.target.name
        var value = ev.target.type === 'number' ? +ev.target.value : ev.target.value;

        if (ev.target.type === 'checkbox') {
            value = this.state.filterBy.isUnRead === false ? true : false;
        }
        this.setState({ filterBy: { ...this.state.filterBy, [field]: value } }, () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    render() {
        const { search, isUnRead } = this.state.filterBy
        return (

            <form className="emails-filter">
                <input type="text" id="search" name="search" value={search} ref={this.inputRef} placeholder="search 🔍" onChange={this.handleChange} />
                <input type="checkbox" id="isUnRead" name="isUnRead" checked={isUnRead} ref={this.inputRef} name="isUnRead" onChange={this.handleChange} />
                <label htmlFor="isUnRead">UnReaded mails</label>
            </form>
        )
    }
}