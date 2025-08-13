<div class="top" style="font-size:13px">
    <div class="person-string-data-container">{{{personStringData}}}</div>
    <div class="date-container">{{{dateSent}}}</div>
</div>
<div class="subject-container">{{{subject}}}</div>
<div class="assigned-user-container">
    <div class="assigned-user">
        {{{userImage}}}
        <span>{{#if assignedUserName}}{{assignedUserName}}{{else}}{{translate 'unassigned' scope='Global'}}{{/if}}</span>
    </div>
</div>
