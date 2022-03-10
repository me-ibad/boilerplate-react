import { useMutation } from 'react-query';
import { fetchWrapper } from 'services/restApi';
import { toast } from 'react-toastify';
import ErrorService from 'services/formatError/ErrorService';
import { storeLocalData } from '../services/auth/localStorageData';
export const useLoginEmailAccount = () => {
  return useMutation(
    (body) => {
      return fetchWrapper('POST', `userAuth/loginByEmail`, body);
    },
    {
      onSuccess: (data) => {
        if (data.status) {
          storeLocalData(data.data);
          toast.success('User successfully  Login');
        }
      },
      onError: (err) => {
        toast.error(ErrorService.uniformError(err));
      },
    }
  );
};
