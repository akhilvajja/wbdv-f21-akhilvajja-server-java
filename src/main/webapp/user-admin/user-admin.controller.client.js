(function () {
    var users = [
        {username: 'test1', firstname: 'first1', lastname: 'last1', role: 'Student'},
        {username: 'test2', firstname: 'first2', lastname: 'last2', role: 'Student'},
        {username: 'test3', firstname: 'first3', lastname: 'last3', role: 'Student'},
        {username: 'test4', firstname: 'first4', lastname: 'last4', role: 'Student'},
        {username: 'test5', firstname: 'first5', lastname: 'last5', role: 'Student'},
        {username: 'test6', firstname: 'first6', lastname: 'last6', role: 'Faculty'},
        {username: 'test7', firstname: 'first7', lastname: 'last7', role: 'Faculty'},
        {username: 'test8', firstname: 'first8', lastname: 'last8', role: 'Admin'}
    ];
    var $usernameFld, $passwordFld;
    var $firstNameFld, $lastNameFld, $roleFld;
    var $removeBtn = jQuery(#wbdv-remove), $editBtn = jQuery(#wbdv-edit), $createBtn = jQuery(#wbdv-create);
    var $userRowTemplate, $tbody = jQuery("tbody");
    var userService = new AdminUserServiceClient();
    $(main);

    function main() {
        $createBtn.click(createUser)
        $removeBtn.click(deleteUser)
        renderUsers(users)
    }
    function createUser(event) {
        var create = jQuery(event.target)
        $usernameFld = create.attr("usernameFld")
        $firstNameFld = create.attr("firstNameFld")
        $lastNameFld = create.attr("lastNameFld")
        $roleFld = create.attr("roleFld")
        $tbody.append(`
                <tr>
                    <td>$usernameFld</td>
                    <td>$firstNameFld</td>
                    <td>$lastNameFld</td>
                    <td>$roleFld</td>
                    <td class="wbdv-actions">
                        <span class="pull-right">
                            <i class="fa-2x fa fa-times wbdv-remove"></i>
                            <i class="fa-2x fa fa-pencil wbdv-edit"></i>
                        </span>
                    </td>
                </tr>
        `)
    }
    function deleteUser(event) {
        var deleteBtn = jQuery(event.target)
        var id = deleteBtn.attr("id")
        users.splice(id, 1)
        renderUsers(users)
    }
    function selectUser() { … }
    function updateUser() { … }
    function renderUsers(users) {
        $tbody.empty()
        for(var i=0; i<users.length; i++) {
            var user = users[i]
            $tbody.append(`
                <tr>
                    <td>${user.username}</td>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.role}</td>
                    <td class="wbdv-actions">
                        <span class="pull-right">
                            <i class="fa-2x fa fa-times wbdv-remove"></i>
                            <i class="fa-2x fa fa-pencil wbdv-edit"></i>
                        </span>
                    </td>
                </tr>
            `)
        }
    }
    function findAllUsers() { … } // optional - might not need this
    function findUserById() { … } // optional - might not need this
})();
