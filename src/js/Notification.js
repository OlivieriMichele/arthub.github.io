$(document).ready(function() {

    // Get the user ID from the HTML using jQuery
    const userID = 1;// $('#userID').text();
    
    // console.log('User ID is :', userID);
    // console.log(userID);
    
    
    $('#notificationBtn').on('click', function() {
        // Toggle visibility of the notification dropdown
        $('#notificationDropdown').toggle();
    
        // Check if the dropdown is visible and load notifications if needed
        if ($('#notificationDropdown').is(':visible')) {
            loadNotifications(userID);
        }
    });
    
    // Function to load notifications for a specific user using AJAX
    function loadNotifications(userID) {
        // Make an AJAX request to fetch notifications for the specified user from the server
        $.ajax({
            url: '../models/getNotifications.php',
            type: 'GET',
            data: { userID: userID }, // Pass the user ID as a parameter
            dataType: 'json',
            success: function(data) {
                // Handle the received data and update the notification dropdown
                updateNotificationDropdown(data);
            },
            error: function(error) {
                console.log('Error fetching notifications: ', error);
            }
        });
    }
    
    
    // Function to update the notification dropdown content
    function updateNotificationDropdown(notifications) {
        const dropdownContent = $('#notificationDropdown');
    
        dropdownContent.empty();
    
        if (notifications.length > 0) {
            notifications.forEach(function (notification) {
                let notificationItem = $('<div class="notification-item"></div>');
    
                let senderInfo = $('<span class="notification-sender">' + notification.FromUserName + ': ' + '</span>');
                notificationItem.append(senderInfo);
    
                notificationItem.append(notification.NotificationText);
    
                let removeButton = $('<button class="remove-notification"></button>');
                
                let imageElement = $('<img src="../icon/close.svg" alt="Button Image"/>');
                removeButton.append(imageElement);
    
                removeButton.on('click', function () {
                    removeNotification(notification.NotificationID);
                });
    
                notificationItem.append(removeButton);
                dropdownContent.append(notificationItem);
            });
        } else {
            dropdownContent.append('<div class="notification-item">No New Notification.</div>');
        }
    
        $('#notificationDropdown').show();
    
    }
    
    
    // Function to handle the remove button click
    function removeNotification(notificationID) {
    // Implement the logic to remove the notification from the database
    $.ajax({
        type: 'POST',
        url: '../models/remove_notification.php',
        data: { notificationID: notificationID },
        success: function(response) {
            displayToast('Notification removed successfully')
            console.log(notificationID + 'Notification removed successfully' + response)
        },
        error: function(error) {
            console.error('Error removing notification', error)
        }
    });
    }
    
    function displayToast(msg) {
    let toastBox = document.getElementById('toastBox')
    
    let toast = document.createElement('div')
    toast.classList.add('toast')
    
    let svgImage = document.createElement('img')
    svgImage.src = '../icon/check.svg'
    
    let message = document.createElement('p')
    message.innerHTML = msg
    
    
    toast.appendChild(svgImage)
    toast.appendChild(message)
    toastBox.appendChild(toast)
    
    setTimeout(() => {
        toast.remove()
    }, 5000)
    }
    
    
});