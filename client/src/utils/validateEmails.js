const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
     const invalidEmails = emails
        .split(',')
        .map(recipient=> recipient.trim())
        .filter (recipient=>re.test(recipient) === false)

        if (invalidEmails.length) {
            return `Estos emails son inválidos!!: ${invalidEmails}`;
        }

        return;
};