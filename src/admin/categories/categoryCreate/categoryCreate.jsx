import api from '@/services/api';
import {
  useMemo,
  useState,
  useCallback,
} from 'react';
import { Form, FormButtons } from '@/components/common/form/Form';
import Input from '@/components/common/form/Input';
import { actionButton } from '@/components/common/ActionButtons';
import Box from '@/components/common/Box';

export default function CategoryCreate({
  onClose,
  onReloadRequest,
}) {
  const [formData, setFormData] = useState({});

  const formAction = useMemo(() => {
    // code here
  },[]);

  const handleSuccess = useCallback(() => {
    onReloadRequest();
    onClose();
  }, [onClose, onReloadRequest]);

  const actionButtons = useMemo(() => [
    actionButton({
      title: 'Cancel',
      type: 'normal',
      icon: 'close_black_24dp',
      onClick: onClose,
    }),
    actionButton({
      title: 'Submit',
      type: 'primary',
      icon: 'save_black_24dp',
    }),
  ], [handleSuccess, onClose]);

  return (
    <Box header='Create Category'>
      <Form
        value={formData}
        onChange={setFormData}
        action={formAction}
        onSuccess={handleSuccess}
      >
        <div className="md:w-1/2 p-4">
          <Input name="category_name" label='Category Name' />
        </div>
        <FormButtons
          className="p-4"
          buttons={actionButtons}
        />
      </Form>
    </Box>
  );
}

CategoryCreate.defaultProps = {
  releases: [],
  onClose: () => {},
  onReloadRequest: () => {},
};
