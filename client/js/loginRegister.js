$(document).ready(() => {
    $('#loginRegisterButton').bind('click', (event) => {
        if ($('.content-overlay')[0] === undefined) {
            $('.content-gameframe').before(`<div class="content-overlay" style="display: flex; justify-content: center; align-items: center; flex-direction: column;"></div>`);
            $('.content-overlay').html(`
                <form class="content-overlay-form">
                    <input class="content-overlay-form-input" id="usernameFormInput" "type="username" name="username" placeholder="Username">
                    <input class="content-overlay-form-input" id="passwordFormInput" type="password" name="password" placeholder="Password">
                    <button class="content-overlay-form-submit" type="submit">Log-in / Register</button>
                </form>
                <span class="content-overlay-serverresponse">
                    
                </span>
            `);
            $('.content-overlay-form').submit((event) => {
                event.preventDefault();
                let username = $('#usernameFormInput').val()
                let password = $('#passwordFormInput').val()
                $.post('/speedrun/account/login', { username: username, password: password }, (logindata) => {
                    let loginresponse = JSON.parse(logindata);
                    if (loginresponse.status === 'success') {
                        $('.content-overlay-serverresponse').text('Successfully logged in as ' + username);
                        setTimeout(() => {
                            $('.content-overlay').remove();
                        }, 2000);
                    } else if (loginresponse.status === 'failure') {
                        $.post('/speedrun/account/register', { username: username, password: password }, (registerdata) => {
                            let registerresponse = JSON.parse(registerdata);
                            if(registerresponse.status === 'success') {
                                $('.content-overlay-serverresponse').html('Created new acccount with username ' + username + '<br><br>Please log-in using your new account.');
                            } else if(registerresponse.status === 'failure') {
                                $('.content-overlay-serverresponse').text('Incorrect username or password.');
                            }
                        })
                    }
                })
            })

        } else if ($('.content-overlay')[0] !== undefined) {
            $('.content-overlay').remove();
        }
    })
})