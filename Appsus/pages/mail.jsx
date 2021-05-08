import {EmailApp} from '../apps/Mail/cmps/EmailApp.jsx';


export class Mail extends React.Component {

    render() {
        return (
            <section className="mail">
                <EmailApp/>
            </section>
        )
    }
}