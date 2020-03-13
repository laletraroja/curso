const mongoose = require ('mongoose');
const requireLogin = require ('../middlewares/requireLogin');
const Survey = mongoose.model ('surveys');
const Mailer = require ('../services/Mailer.js');
const surveyTemplate = require ('../services/emailTemplates/surveyTemplate');

module.exports = app => {

    app.post ('/api/surveys', requireLogin, async (req,res) => {

        console.log ("WWWWWWW");

        const { title,subject,body,recipients } = req.body;

        const survey = new Survey ({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email=> ({email: email.trim()})),
            _user: req.user.id,
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));
        await mailer.send();
    });
};