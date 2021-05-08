const { Link } = ReactRouterDOM
import { mailService } from '../services/mail.service.js'

export class EmailDetails extends React.Component {


  state = {
    email: '',
    emaildetails: []
  }

  componentDidMount() {
    var url = window.location.href
    var urllenght = url.length;
    url = url.slice(urllenght - 5, urllenght)
    this.setState({ email: url })

    mailService.getEmailById(url)
      .then((email) => {
        this.setState({ emaildetails: email })
      })
  }

  componentWillUnmount() {
  }

  render() {
    console.log(this.state);

    const { name,body,sentAt,subject,isRead,id,emiladdress } = this.state.emaildetails
    
    var time='may 6, 2021, 10:02 AM '

    
    var mailbody = `bla bla bla.......
    ljndvlnlvdsv d,;gvlm;smg;s dkkkkd kkkkvvv
    vfdddddddddddddddddddggg
    ddddddddddddddddddddddg
    ggg!!!!!!1
    
    
    gfgdgdgdgd`

    return (
      <section className="email-details">
        <div>

          <div className="details-header">
            <div className="details-subject">{subject}</div>
            <button className="read-btn" onClick={()=>{mailService.markUnread(id)}}><a href="#mail" ><i className="fa fa-eye-slash"></i> Mark as UnRead</a></button>
          </div>

          <div className="details-name-date">
          <div className="details-from"><i className="fa fa-user"></i> {name} <span>{emiladdress}</span></div>
          <div className="details-sentat">{time} <a href="#home"><i className="fa fa-reply"></i> </a></div>
          
          </div>

          <div className="details-body"> {body} </div>
        </div>

        <div className="btns-r-f">
        <button className="replay-btn"><i className="fa fa-reply"></i> Replay</button>
        <button className="replay-btn"><i className="fa fa-arrow-right"></i> Forward</button>
        </div>
      </section>

    )
  }
}