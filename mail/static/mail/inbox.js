document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Send email
  document.querySelector('#compose-form').addEventListener('submit', () => send_email(event));

  // By default, load the inbox mailbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function view_email(id) {

  // Show email view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Load details of email
  fetch(`/emails/${id}`)
  .then(response => response.json())
  .then(email => {

      // Print email
      console.log(email);

      // Writes out the details of email
      document.querySelector('#email-view').innerHTML = `
      <strong>From:</strong> ${email.sender}
      <br>
      <strong>To:</strong> ${email.recipients}
      <br>
      <strong>Subject:</strong> ${email.subject}
      <br>
      <strong>Timestamp:</strong> ${email.timestamp}
      <hr>
      <p>${email.body}</p>
      `

      // Mark email as read
      if (!email.read) {
        fetch(`/emails/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
              read: true
          })
        });
      }

      // Reply to email if not archived
      if (!email.archived) {
        const reply = document.createElement('button');
        reply.innerHTML = 'Reply'
        reply.className = 'btn btn-outline-primary';
        reply.addEventListener('click', () => {

          // Show compose view and hide other views
          document.querySelector('#emails-view').style.display = 'none';
          document.querySelector('#email-view').style.display = 'none';
          document.querySelector('#compose-view').style.display = 'block';

          // Pre-fill composition fields with recipients (orginal sender), subject (original subject), and body (original body)
          document.querySelector('#compose-recipients').value = email.sender;
          document.querySelector('#compose-subject').value = (email.subject.split(' ', 1)[0] === 'Re:') ? email.subject : 'Re: ' + email.subject;
          document.querySelector('#compose-body').value = `On ${email.timestamp}, ${email.sender} wrote: ${email.body}`;
        });
        document.querySelector('#email-view').append(reply);
        document.querySelector('#email-view').append(' ');
      }

      // Archive or Unarchive email
      const archive = document.createElement('button');
      archive.innerHTML = email.archived ? "Unarchive" : "Archive";
      archive.className = email.archived ? 'btn btn-success' : 'btn btn-danger';
      archive.addEventListener('click', () => {
        fetch(`/emails/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
              archived: !email.archived
          })
        })
        .then(() => load_mailbox('inbox'));
      });
      document.querySelector('#email-view').append(archive);
  });
}

function load_mailbox(mailbox) {

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Load all emails of the mailbox
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
      // Print emails
      console.log(emails);

      // Loop through emails and append email to view-port
      emails.forEach(email => {
        const new_email = document.createElement('div');
        new_email.innerHTML = `<strong>${email.sender}</strong> &nbsp ${email.subject} &nbsp (${email.timestamp})`;
        new_email.className = email.read ? 'list-group-item list-group-item-dark' : 'list-group-item';
        new_email.addEventListener('click', () => view_email(email.id));
        document.querySelector('#emails-view').append(new_email);
      });
  });
}

function send_email(event) {

  // Prevents the default of loading the indox
  event.preventDefault();

  // Store the compose-form fields in variables
  const recipients = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;

  // Ensure the fields are not blank
  if (recipients && subject && body) {
    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
          recipients: recipients,
          subject: subject,
          body: body
      })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);
    });
  }

  // Load the send mailbox
  load_mailbox('sent');
}
