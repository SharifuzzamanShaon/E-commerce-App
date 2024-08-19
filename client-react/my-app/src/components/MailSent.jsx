import React from 'react'

const MailSent = ({ email }) => {
    return (
        <div>
            <h4>A mail has sent to <span className='font-bold'>{email}</span>
                <br></br>Please check and reset a new password</h4>
        </div>
    )
}

export default MailSent