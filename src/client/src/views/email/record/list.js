define(['views/email/record/list'], function (Dep) {
    return Dep.extend({

        setup: function () {
            Dep.prototype.setup.call(this);
            this.initDraggableFeature();
        },

        initDraggableFeature: function () {
            this.listenTo(this, 'after:render', function () {
                this.initDraggable();
            });
        },

        initDraggable: function () {
            // Clean up any existing draggable instances
            this.cleanupDraggable();
            
            // Initialize draggable on rows
            this.makeDraggable();
        },

        cleanupDraggable: function () {
            const $rows = this.$el.find('.list-row');
            if ($rows.hasClass('ui-draggable')) {
                $rows.draggable('destroy');
            }
        },

        makeDraggable: function () {
            this.$el.find('.list-row').draggable({
                revert: 'invalid',
                helper: 'clone',
                appendTo: 'body',
                cursorAt: {left: 20, top: 20},
                start: (e, ui) => {
                    ui.helper.addClass('email-dragging');
                    const id = $(e.target).data('id');
                    this.getParentView().trigger('email-drag-start', id);
                },
                stop: () => {
                    this.getParentView().trigger('email-drag-stop');
                },
            });
        },

        actionMoveToFolder: function (data) {
            const id = data.id;
            const folderId = data.folderId;
            
            if (!id || !folderId) {
                return;
            }

            Espo.Ajax
                .postRequest('Email/action/moveToFolder', {
                    id: id,
                    folderId: folderId,
                })
                .then(() => {
                    this.collection.fetch();
                });
        }
    });
});
