// import { storageService } from './storage-service.js'
import { storageService } from './storage.service.js'

export const mailService = {
    query,
    makeId,
    _creatEmails,
    creatEmail,
    getDate,
    saveEmailsToStorage,
    removeMail,
    getEmailById,
    markUnread,
    countUnreadMails
}

const KEY = 'emails';
var gemails = [];

var gEmails = [

    {
        id: makeId(),
        name: 'Kayla ziv',
        subject: 'important!!!',
        body: 'Hey listen I had a crazy day my cell phone fell into the toilet so I\'m writing you here to know if you need anything write me an email !!!',
        isRead: false,
        sentAt: 1620135206184,
        emiladdress:'<kaykay@gmail.com>'
    },
 
    {
        id: makeId(),
        name: 'Shira',
        subject: 'Pleace read it',
        body: `Hi Shlomka, how are you? I'm waiting for photos from Tzipi Shavit's event.
        Please let me know when the album is ready.

        Thank you very much`,
        isRead: false,
        sentAt: 1610122104154,
        emiladdress:'<shiraWtf11@gmail.com>'
    },
    {
        id: makeId(),
        name: 'BUYBUY',
        subject: 'Omg!!Special offer just for you...',
        body: `omggg You are selected from thousands of people !!!!!
        Only today and only for you all our TV screens at half price !!! Yes yes you heard right ...... half price !! only today!!!!
        Worth a hurry - stock is limited ***`,
        isRead: true,
        sentAt: 1610111101154,
        emiladdress:'<buybuy034555@yaoow.co.il>'
    },
    {
        id: makeId(),
        name: 'Noya bar',
        subject: 'Omg!!Special offer just for you...',
        body: `omggg You are selected from thousands of people !!!!!
        Only today and only for you all our TV screens at half price !!! Yes yes you heard right ...... half price !! only today!!!!
        Worth a hurry - stock is limited ***`,
        isRead: true,
        sentAt: 1510999101100,
        emiladdress:'<buybuy034555@yaoow.co.il>'
    },
    {
        id: makeId(),
        name: 'shiran sweets',
        subject: 'Are you ready?!',
        body: `SWEET BAKING SCIENCE!
        In honor of the May Baking Challenge (details below!), I published an article for How to Make Brownies with Shiny Crust.
        
        Check it out to see my secret methods for perfectly crinkly brownie tops⁠... and some surprising mistakes you may be making which prevent the brownie "skin!"⁠`,
        isRead: false,
        sentAt: 1510989101100,
        emiladdress:'<sweets5@yaoow.co.il>'
    },
    {
        id: makeId(),
        name: 'Raynair',
        subject: 'book now!!!',
        body: `Your next adventure is waiting
        Whether you're looking to explore a new destination from top to bottom, or return to an old favourite, we've got you covered.`,
        isRead: true,
        sentAt: 1510889101100,
        emiladdress:'<Raynair_comp@yaoow.co.il>'
    },
    {
        id: makeId(),
        name: 'Yoni regev',
        subject: 'WHATCE NAW',
        body: `This discussion is very important as it talks about the DANGERS OF A SINGLE STORY.This means the lack of diversity in thoughts .Some times as human ,we only aware of what knowledge we possess .Knowledge only comes from learning and the learning does not only means going to school.I can simply define learning as a process of knowledge acquisition which can be verbal , visual ,mental or spiritu`,
        isRead: true,
        sentAt: 1410999101100,
        emiladdress:'<regev143@yaoow.co.il>'
    }

]
_creatEmails();

function creatEmail(emailstate) {
    var newEmail = {
        id: makeId(),
        name: 'new e-mail',
        subject: emailstate.subject,
        body: emailstate.body,
        isRead: false,
        sentAt: Date.now(),
        emiladdress:`<${makeId()}@gmail.com>`
    }
    gemails.unshift(newEmail);
    saveEmailsToStorage();
}

function markUnread(id) {
    console.log('unread');
    getEmailById(id)
        .then((email)=>{email.isRead=false})
}

function getDate(sentdate) {
    let dateNow = Date.now();
    dateNow = new Date(dateNow + (180 * 60 * 1000))
    sentdate = (sentdate+ (180 * 60 * 1000))
    var ampm='';

    let day = new Date(sentdate).getDate()
    let year = new Date(sentdate).getFullYear()
    let month = new Date(sentdate).getMonth()
    
    let monthNow= dateNow.getMonth()+1;
    month = month + 1;
    if (month === 12) { month = 1 }

    let hour = new Date(sentdate).getUTCHours()
    let minutes = new Date(sentdate).getUTCMinutes()

    if (minutes < 10) { minutes = `0${minutes}` }
    ampm=(hour<23 && hour >12)? 'PM' : 'AM';

    if (day == dateNow.getDate() && month == monthNow && year == dateNow.getFullYear()) {
        return (`${hour}:${minutes} ${ampm}`)
    } else  {
        console.log(dateNow);
        return (`${day}/${month}/${year}`)
    }

}

function _creatEmails() {
    var emails = storageService.loadFromStorage(KEY)
    if (!emails || !emails.length) {
        emails = gEmails;
    }
    gemails = emails;
    saveEmailsToStorage();

}

function removeMail(mail) {

    var mailIdx = gemails.findIndex(function (email) {
        return mail.id === email.id
    })
    gemails.splice(mailIdx, 1)
    saveEmailsToStorage();

    return Promise.resolve()

}

function getEmailById(emailId) {
    var email = gemails.find(function (email) {
        return emailId === email.id
    })
    return Promise.resolve(email)
}

function saveEmailsToStorage() {
    storageService.saveToStorage(KEY, gemails)
}



function makeId(length = 5) {

    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function countUnreadMails(){

    const unreademails = gemails.filter(email => {
        return email.isRead === false;
    })
    return Promise.resolve(unreademails.length)

}


function query(filterBy) {

    if (filterBy) {
        var { search, isUnRead } = filterBy

        if (search && isUnRead) {
            console.log('search', search, 'isUnRead', isUnRead);
            const filteredMails = gemails.filter(email => {
                return email.name.toLowerCase().includes(search) && email.isRead === false;
            })
            return Promise.resolve(filteredMails)
        } else if (search) {
            const filteredMails = gemails.filter(email => {
                return email.name.toLowerCase().includes(search) || email.body.toLowerCase().includes(search);
            })
            return Promise.resolve(filteredMails)
        } else if (isUnRead) {
            const filteredMails = gemails.filter(email => {
                return email.isRead === false;
            })
            return Promise.resolve(filteredMails)
        }
    }
    return Promise.resolve(gemails)
}







