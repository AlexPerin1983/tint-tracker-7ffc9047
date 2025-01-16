interface UserData {
  Status: string;
  Email: string;
  Nome: string;
  WhatsApp: string;
}

export async function fetchAndParseCSV(): Promise<UserData[]> {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQwhnJky06XcBDobLssvdU1yLAY1FC1EA04LUAUtdEMGIf0texkbcuOZu3wVRcaogOR5dS1lkd6cPD4/pub?output=csv";
  
  try {
    const response = await fetch(url);
    const csvText = await response.text();
    
    // Parse CSV
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    return lines.slice(1).map(line => {
      const values = line.split(',').map(value => value.trim());
      const user: Partial<UserData> = {};
      
      headers.forEach((header, index) => {
        user[header as keyof UserData] = values[index];
      });
      
      return user as UserData;
    });
  } catch (error) {
    console.error('Error fetching or parsing CSV:', error);
    throw new Error('Não foi possível verificar as credenciais. Tente novamente mais tarde.');
  }
}

export async function validateUser(email: string): Promise<{ isValid: boolean; userData?: UserData }> {
  const users = await fetchAndParseCSV();
  const user = users.find(u => u.Email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    return { isValid: false };
  }
  
  return {
    isValid: user.Status.toLowerCase() === 'autorizado',
    userData: user
  };
}

export async function logoutUser(email: string): Promise<void> {
  try {
    const users = await fetchAndParseCSV();
    const user = users.find(u => u.Email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Por enquanto apenas validamos se o usuário existe
    // Em uma implementação real, aqui faríamos a atualização do status na planilha
    return;
  } catch (error) {
    console.error('Error logging out user:', error);
    throw new Error('Não foi possível realizar o logout. Tente novamente mais tarde.');
  }
}