import api from '@/services/api';
import {
  useMemo,
  useState,
  useCallback,
} from 'react';
import { Form, FormButtons } from '@/components/common/form/Form';
import Input from '@/components/common/form/Input';
import File from '@/components/common/form/File';
import { actionButton } from '@/components/common/ActionButtons';
import Box from '@/components/common/Box';
import { useParams } from 'react-router-dom';

export default function CategoryCreate({
  onClose,
  onReloadRequest,
}) {
  const { store_id } = useParams();
  const [formData, setFormData] = useState({});

  const formAction = useCallback((formData) => {
    return api.addCategory(store_id , formData)
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
        <div className='flex '>
          <div className="md:w-1/2 p-4">
            <Input name="category_name" label='Category Name' />
          </div>
          <div className="md:w-1/2 p-4">
            <Input name="category_description" label='Category Description' />
          </div>
        </div>
        <div className="p-4">
          <File name="category_image" label='Category Image' />
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
