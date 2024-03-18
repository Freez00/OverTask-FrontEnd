<script>
    import { error } from "@sveltejs/kit";
    import {goto} from '$app/navigation';


  let userName = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
    let errorMessage = '';

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  async function handleSubmission() {
    if(passwordRegex.test(password) && emailRegex.test(email) && password === confirmPassword)
    {
      const resource = {
        UserName: userName,
        Email: email,
        Password: password
      }
      const response = await fetch('https://overtaskapi.me/authenticate/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resource)
      })
      const data = await response.json();

      if (response.ok) {
            console.log("Login successful!");
            document.cookie = `token=${data.token};path=/;Secure;SameSite=Strict;`;
            await goto('/');
            location.reload();
        } else {
            console.error("Login failed: ", data.message);
        }
    }
    else
    {
      errorMessage = 'Invalid email or password'
    }
  }

</script>
<h1>Register</h1>
<form on:submit|preventDefault={handleSubmission}>
  <label>
    User Name:
    <input type="text" bind:value={userName} required />
  </label>
  <hr>

  <label>
    Email:
    <input type="email" bind:value={email} required />
  </label>
  <hr>

  <label>
    Password:
    <input type="password" bind:value={password} required />
  </label>
  <hr>

  <label>
    Confirm Password:
    <input type="password" bind:value={confirmPassword} required />
  </label>
  <hr>
  <h3>
    {errorMessage}
  </h3>
  <button type="submit">Register</button>
</form>
