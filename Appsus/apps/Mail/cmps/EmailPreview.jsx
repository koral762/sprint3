const { Link } = ReactRouterDOM
import { LongTxt } from './LongTxt.jsx'
import { mailService } from '../services/mail.service.js'

export function EmailPreview({ mail, open, remove }) {

    return (

        <div>
            <article onClick={() => open(mail)} className="mail-preview">
                {!mail.isRead && <p className="unread">{mail.name}</p>}
                {mail.isRead && <p>{mail.name}</p>}
                <Link to={`/mail/${mail.id}`}><LongTxt description={mail.body} subject={mail.subject} isRead={mail.isRead} /></Link>
                <p className="remove" onClick={() => remove(mail)}>🗑</p>
                <p className="sent-at">{mailService.getDate(mail.sentAt)}</p>
            </article>
        </div>

    )
}