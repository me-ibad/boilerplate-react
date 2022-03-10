import { useMutation } from 'react-query';
import { fetchWrapper } from 'services/restApi';
import { toast } from 'react-toastify';
import ErrorService from 'services/formatError/ErrorService';
export const useCreateEmailAccount = () => {
  return useMutation(
    (body) => {
      return fetchWrapper('POST', `userAuth/registerByEmail`, body);
    },
    {
      onSuccess: (data) => {
        if (data.status) {
          toast.success('Account Created.Now Please SignIn');
        }
      },
      onError: (err) => {
        toast.error(ErrorService.uniformError(err));
      },
    }
  );
};
