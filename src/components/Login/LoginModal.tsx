import React, { useContext } from 'react';
import Modal from '@material-ui/core/Modal';
import Login from './Login';
import { AuthContext } from '../../firebase/authContext';
import { firebaseSignOut } from '../../firebase/authFunctions';

export default function SimpleModal() {
  // contexto de login
  const loginContext = useContext(AuthContext)
  
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  if(loginContext){
    return (
      <button type="button" onClick={() => firebaseSignOut()}>
         Logout
     </button>
    )
  }

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Login
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Login/>
      </Modal>
    </div>
  );
}
