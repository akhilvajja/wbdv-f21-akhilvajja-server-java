    var users = [];
    var $usernameFld, $passwordFld;
    var $firstNameFld, $lastNameFld, $roleFld;
    var $removeBtn, $editBtn, $createBtn;
    var $userRowTemplate, $tbody;
    var userService = new AdminUserServiceClient();
    var selectedUser = null

    function createUser(user) {
        userService.createUser(user)
            .then(function (actualUser) {
                users.push(actualUser)
                renderUsers(users)
            })
    }
    function deleteUser(event) {
        var deleteBtn = jQuery(event.target)
        var theIndex = deleteBtn.attr("id")
        var theId = users[theIndex]._id

        userService.deleteUser(theId)
            .then(function (status) {
                users.splice(theIndex, 1)
                renderUsers(users)
            })
    }
    function selectUser(event) {
        var selectBtn = jQuery(event.target)
        var theId = selectBtn.attr("id")
        selectedUser = users.find(user => user._id === theId)
        $usernameFld.val(selectedUser.username)
        $firstNameFld.val(selectedUser.firstname)
        $lastNameFld.val(selectedUser.lastname)
        $roleFld.val(selectedUser.role)
    }
    function updateUser() {
        selectedUser.username = $usernameFld.val()
        selectedUser.firstname = $firstNameFld.val()
        selectedUser.lastname = $lastNameFld.val()
        selectedUser.role = $roleFld.val()
        userService.updateUser(selectedUser._id, selectedUser)
            .then(function (status) {
                var index = users.findIndex(user => user._id === selectedUser._id)
                users[index] = selectedUser
                renderUsers(users)
            })

    }
    function renderUsers(users) {
        $tbody.empty()
        for(var i=0; i<users.length; i++) {
            var user = users[i]
            $tbody.append(`
                <tr class="wbdv-template wbdv-user wbdv-hidden">
                    <td class="wbdv-username">${user.username}</td>
                    <td class="wbdv-first-name">${user.firstname}</td>
                    <td class="wbdv-last-name">${user.lastname}</td>
                    <td class="wbdv-role">${user.role}</td>
                    <td class="wbdv-actions">
                        <span class="btn pull-right">
                            <i class="btn fa-2x fa fa-times wbdv-remove"></i>
                            <i class="btn fa-2x fa fa-pencil wbdv-edit"></i>
                        </span>
                    </td>
                </tr>
            `)
        }
        jQuery(".wbdv-remove").click(deleteUser)
        jQuery(".wbdv-edit").click(selectUser)
    }
    //function findAllUsers() { … } // optional - might not need this
    //function findUserById() { … } // optional - might not need this

    function init() {
        $usernameFld = $(".usernameFld")
        $firstNameFld = $(".firstNameFld")
        $lastNameFld = $(".lastNameFld")
        $roleFld = $(".roleFld")
        $createBtn = jQuery(".wbdv-create")
        $editBtn = jQuery(".wbdv-edit")
        $removeBtn = jQuery(".wbdv-remove")
        $updateBtn = $(".wbdv-update")
        $tbody = jQuery("tbody")

        $updateBtn.click(updateUser)
        $createBtn.click(() => {
                createUser({
                    username: $usernameFld.val(),
                    firstname: $firstNameFld.val(),
                    lastname: $lastNameFld.val(),
                    role: $roleFld.val()
                })
                $usernameFld.val("")
                $roleFld.val()
            }
        )

        userService.findAllUsers()
            .then(function (actualUsersFromServer) {
                users = actualUsersFromServer
                renderUsers(users)
            })
    }
    jQuery(init)


