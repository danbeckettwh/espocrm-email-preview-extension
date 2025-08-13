define(['views/email/record/folders'], function (Dep) {
    return Dep.extend({

        setup: function () {
            Dep.prototype.setup.call(this);
            this.initDroppableFeature();
        },

        initDroppableFeature: function () {
            this.listenTo(this, 'after:render', function () {
                this.initDroppable();
            });
        },

        initDroppable: function () {
            // Clean up any existing droppable instances
            this.cleanupDroppable();
            
            // Initialize droppable on folders
            this.makeDroppable();
        },

        cleanupDroppable: function () {
            const $folders = this.$el.find('ul.folders > li');
            if ($folders.hasClass('ui-droppable')) {
                $folders.droppable('destroy');
            }
        },

        makeDroppable: function () {
            this.$el.find('ul.folders > li').droppable({
                accept: '.list-row',
                hoverClass: 'folder-hover',
                tolerance: 'pointer',
                drop: (e, ui) => {
                    const $target = $(e.target);
                    const folderId = $target.data('id');
                    const emailId = ui.draggable.data('id');

                    if (!folderId || !emailId) {
                        return;
                    }

                    // Get the list view and trigger the move action
                    const listView = this.getParentView().getView('list');
                    if (listView) {
                        listView.actionMoveToFolder({
                            id: emailId,
                            folderId: folderId
                        });
                    }
                }
            });
        }
    });
});
