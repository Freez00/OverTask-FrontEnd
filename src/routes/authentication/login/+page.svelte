<script>
    import { goto } from "$app/navigation";

    let email = '';
  let password = '';

  async function handleSubmission() {
      const resource = {
        Email: email,
        Password: password
      };
      const response = await fetch('https://localhost:7221/authenticate/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resource)
      });
      
      const data = await response.json();

      if(response.ok)
      {
        console.log('Login successful');
        document.cookie = `token=${data.token};path=/;Secure;SameSite=Strict;`;
        console.log("data" + data);
        console.log("data.token" + data.token);
        await goto('/')
        location.reload();
      }
      else
      {
        console.error('Login failed', data.message);
      }
  }

</script>
<h1>Login</h1>
<form on:submit|preventDefault={handleSubmission}>
 
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

  <button type="submit">Login</button>
</form>
