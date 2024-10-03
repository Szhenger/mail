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
* `load_mailbox` function: This function is triggered when one of the mailbox buttons (Inbox, Sent, or Archive) is clicked. It shows the `emails-view`, hides the `compose-view`, and updates the content of the `emails-view` to reflect the selected mailbox. Currently, the function simply displays the name of the mailbox but does not yet fetch or display actual emails.

#### API Integration:

Although the current implementation focuses on the user interface, the actual email management—such as sending and receiving emails—will be handled via an API. The API has been implemented and will be used in the JavaScript code to:
* Retrieve emails from the inbox, sent mailbox, and archive.
* Compose and send new emails.
* Mark emails as read, archive them, or move them between folders.
This API enables the client to behave like a fully functional email application, supporting the full email lifecycle, including reading and sending messages. The necessary task ahead involves using the API within the JavaScript code to fetch emails and interact with the backend, ensuring the client functions like a traditional email system.

## Specification

TODO

