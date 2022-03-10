import { useMutation } from 'react-query';
import { fetchWrapper } from 'services/restApi';
import { toast } from 'react-toastify';
import ErrorService from 'services/formatError/ErrorService';

export const useApplyFotForgetPass = () => {
  return useMutation(
    (body) => {
      return fetchWrapper('POST', `/email/applyforgetpass`, body);
    },
    {
      onSuccess: (data) => {
        if (data.status) {
          toast.success('Email Has been Sent');
        }
      },
      onError: (err) => {
        toast.error(ErrorService.uniformError(err));
      },
    }
  );
};
