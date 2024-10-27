export const registerUser = async (username: string, email: string, password: string): Promise<void> => {
    try {
      const response = await fetch('http://localhost:6969/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (response.ok) {
        console.log('Bruker registrert');
      } else {
        const data = await response.json();
        console.error('Registrering feilet:', data.message);
      }
    } catch (error) {
      console.error('Nettverksfeil:', error);
    }
  };
  