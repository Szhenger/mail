# Mail

#### Video Demo: [Mail](https://youtu.be/43K_QcsnSEs)

## Problem to Solve

Design a front-end web application for an email client that makes API calls to send and receive emails.

## Understanding

The `mail` project is a front-end email client built using Django, allowing users to send, receive, and manage emails entirely within a single-page application (SPA). The emails are stored locally in a database and are not actually sent to external email servers. The client makes use of an API to manage emails and handle various actions such as composing, sending, and viewing emails.

#### Single-Page Application Design:

Upon logging in, users are presented with the Inbox, Sent, and Archive mailboxes, along with a button to compose new emails. This project is designed as a single-page application (SPA), meaning that navigation between different views does not involve loading new routes. Instead, JavaScript dynamically controls the interface, showing and hiding different views on the same page.

For example, when the "Compose" button is clicked, the inbox view is hidden and the email composition form is displayed, all without reloading the page or making new requests. Similarly, switching between the inbox and sent mail views is handled through JavaScript, creating a smooth and fast user experience.

#### HTML Structure and JavaScript Interaction:

The views.py file is responsible for rendering the `inbox.html` template, which is displayed when users first log in. This template includes buttons for navigating between the inbox, sent mailbox, and archive, as well as the form for composing new emails. The template is divided into two main sections:
* `emails-view`: Displays the content of the selected mailbox (inbox, sent, or archive).
* `compose-view`: Displays the form for composing a new email.
These sections are toggled by the buttons at the top of the page. For example, clicking the "Compose" button hides the inbox view and shows the email composition form, and vice versa.

#### JavaScript for Dynamic Content:

The `inbox.js` file, located at `mail/static/mail/inbox.js`, handles the dynamic behavior of the application. When the DOM content is loaded, event listeners are attached to the buttons to control the switching of views.
* `compose_email` function: This function is triggered when the "Compose" button is clicked. It hides the `emails-view`, shows the `compose-view`, and clears the email form to allow the user to start a new email from scratch.
* `load_mailbox` function: This function is triggered when one of the mailbox buttons (`Inbox`, `Sent`, or `Archive`) is clicked. It shows the `emails-view`, hides the `compose-view`, and updates the content of the `emails-view` to reflect the selected mailbox. Currently, the function simply displays the name of the mailbox but does not yet fetch or display actual emails.

#### API Integration:

Although the current implementation focuses on the user interface, the actual email management—such as sending and receiving emails—will be handled via an API. The API has been implemented and will be used in the JavaScript code to:
* Retrieve emails from the inbox, sent mailbox, and archive.
* Compose and send new emails.
* Mark emails as read, archive them, or move them between folders.
This API enables the client to behave like a fully functional email application, supporting the full email lifecycle, including reading and sending messages. The necessary task ahead involves using the API within the JavaScript code to fetch emails and interact with the backend, ensuring the client functions like a traditional email system.

## Specification

#### Send Mail:

When the email composition form is submitted, JavaScript should send the email via a POST request to `/emails`.
The `POST` request should include values for the recipients, subject, and body of the email.
After the email is sent, the user’s `Sent` mailbox should be loaded, showing the newly sent email.

#### Mailbox:

When the `Inbox`, `Sent` mailbox, or `Archive` is visited, a `GET` request should be made to `/emails/<mailbox>` to retrieve the latest emails for the selected mailbox.
* Upon visiting a mailbox, the name of the mailbox should appear at the top of the page (this feature is already implemented).
* Each email in the mailbox should be displayed as a separate box (e.g., a `<div>` with a border) that includes the sender, subject line, and timestamp.
* Emails that are unread should be visually differentiated with a white background, while emails that have been read should have a gray background.

#### View Email:

When an email is clicked, a detailed view of the email should be displayed. This can be achieved by making a `GET` request to `/emails/<email_id>`.
* The detailed view should show the sender, recipients, subject, timestamp, and body of the email.
* The view should be shown in a new section (e.g., another <div>) in inbox.html, and the correct views should be displayed or hidden when navigation buttons are clicked.
* Once an email is clicked, it should be marked as read by sending a PUT request to /emails/<email_id>, updating its "read" status.

#### Archive and Unarchive:

Emails in the `Inbox` should have an "Archive" button that allows them to be moved to the `Archive` mailbox.
* Archived emails should have an "Unarchive" button that allows them to be moved back to the Inbox.
* Emails in the Sent mailbox should not have these options.
* Archiving and unarchiving can be managed by sending a `PUT` request to `/emails/<email_id>` to update the "archived" status of the email.
* After an email is archived or unarchived, the user’s Inbox should be reloaded.

#### Reply:

A "Reply" button should be available when viewing an email. When clicked, the email composition form should be displayed, pre-filled with:
* The recipient field set to the sender of the original email.
* The subject field pre-filled with the original subject, prefixed with "Re: " (unless it already begins with "Re:").
* The body of the email should include a line like "On Jan 1 2020, 12:00 AM foo@example.com wrote:" followed by the original email content.

These core features should be implemented to ensure a functional and interactive email client using the provided API and JavaScript.

## Credit and Disclaimer

This problem originally came from [CS50's Web Programming with Python and JavaScript](https://cs50.harvard.edu/web/2020/projects/3/mail/) with the API written by the CS50 Team, and any solutions here are explicitly for educational purposes only. 
