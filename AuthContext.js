import * as React from 'react';

const AuthContext = React.createContext({user: false});

console.log("File is run:", AuthContext);

export { AuthContext };