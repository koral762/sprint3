import { EmailPreview } from './EmailPreview.jsx'
import { EmailFilter } from './EmailFilter.jsx'

export function EmailList({ emails, open, remove }) {
    console.log('mails',emails);
    return (
    <div className="emails-list">
        {/* <EmailFilter filter={filter} onSetFilter={this.onSetFilter}/> */}
      { emails.map(mail => < EmailPreview mail={mail} key={mail.id} open={open} remove={remove} />)}
    </div>
  )
}