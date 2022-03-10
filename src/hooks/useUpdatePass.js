import { useMutation } from 'react-query';
import { fetchWrapper } from 'services/restApi';
import { toast } from 'react-toastify';
import ErrorService from 'services/formatError/ErrorService';

export const useUpdatePass = () => {
  return useMutation(
    (body) => {
      return fetchWrapper('POST', `/userAuth/updatepassword`, body);
    },
    {
      onSuccess: (data) => {
        if (data.status) {
          toast.success('your password has been updated');
        }
      },
      onError: (err) => {
        toast.error(ErrorService.uniformError(err));
      },
    }
  );
};
