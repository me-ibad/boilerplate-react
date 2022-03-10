import { useMutation } from 'react-query';
import { fetchWrapper } from 'services/restApi';
import { toast } from 'react-toastify';
import ErrorService from 'services/formatError/ErrorService';

export const useCheckEmail_UserNameAccount = () => {
  return useMutation(
    (body) => {
      return fetchWrapper('POST', `userAuth/checkemail`, body);
    },
    {
      onSuccess: (data) => {},
      onError: (err) => {
        toast.error(ErrorService.uniformError(err));
      },
    }
  );
};
