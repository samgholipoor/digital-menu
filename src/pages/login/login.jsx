import { useUser, validateLogin } from '@/services/auth';
import { useQuery, generateUrl } from '@/utils/url';
import { useCallback, useState, useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Box from '@/components/common/Box';
import { Form, FormButtons } from '@/components/common/form/Form';
import Input from '@/components/common/form/Input';
import { actionButton } from '@/components/common/ActionButtons';

export default function Login() {
  const user = useUser();
  const navigate = useNavigate();
  const [initialUser] = useState(user);
  const { redirect = '/admin', email = undefined } = useQuery();

  const [requestOtpFormData, setRequestOtpFormData] = useState({
    email,
  });

  const requestOtpAction = useCallback(
    (formattedFormData) => validateLogin(formattedFormData.email, formattedFormData.password).then(() => {
      navigate(generateUrl('/login', {
        redirect,
        email: formattedFormData.email,
      }));
    }),
    [],
  );

  const requestOtpActionButtons = useMemo(() => [
    actionButton({ title: 'Login', type: 'primary', icon: 'send_black_24dp' }),
  ], []);

  return initialUser === user ? (
    <div className="h-full min-h-screen flex justify-center bg-base-300">
      <Box className="container my-auto max-w-xs">
        <div className="text-center my-1 p-3">
          <h1 className="text-2xl font-semibold text-gray-700"> Login </h1>
        </div>
        <Form
          value={requestOtpFormData}
          onChange={setRequestOtpFormData}
          action={requestOtpAction}
        >
          <div className="w-full p-3 pb-0 flex flex-col gap-y-4 mb-4">
            <Input 
              name="email" 
              type="email" 
              placeholder='Email' 
              validator={(v) => !!v} 
              className="text-center" 
              dir="ltr" 
            />
            <Input 
              name="password" 
              type="password" 
              placeholder='Password' 
              validator={(v) => !!v} 
              className="text-center" 
              dir="ltr" 
            />
          </div>
          <FormButtons
            className="p-3"
            growButtons
            buttons={requestOtpActionButtons}
          />
        </Form>
      </Box>
    </div>
  ) : (
    <Navigate to={redirect} />
  );
}

Login.routerConfig = {
  type: 'login',
  path: '/login',
};
