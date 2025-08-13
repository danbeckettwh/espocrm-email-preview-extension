define(['view'], Dep => {
    return Dep.extend({
        template: 'email-combined-view:email/record/combined-cell',

        data: function () {
            var assignedUserId = this.model.get('assignedUserId');
            var userImage = '';
            
            if (assignedUserId) {
                userImage = '<img src="?entryPoint=avatar&size=small&id=' + 
                    assignedUserId + '" class="avatar avatar-small" />';
            } else {
                userImage = '<div class="avatar avatar-small avatar-placeholder"></div>';
            }

            return {
                isRead: this.model.get('isRead'),
                assignedUserName: this.model.get('assignedUserName'),
                userImage: userImage
            };
        },

        setup: function () {
            Dep.prototype.setup.call(this);

            this.createView('dateSent', 'views/fields/datetime-short', {
                mode: 'list',
                name: 'dateSent',
                selector: '.date-container',
                model: this.model,
            });

            this.createView(
                'personStringData',
                'views/email/fields/person-string-data',
                {
                    mode: 'list',
                    name: 'personStringData',
                    selector: '.person-string-data-container',
                    model: this.model,
                }
            );

            this.createView('subject', 'views/email/fields/subject', {
                name: 'subject',
                selector: '.subject-container',
                model: this.model,
                mode: 'listLink',
            });
        }
    });
});
